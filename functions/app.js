const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const Flickr = require("flickr-sdk");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const FLICKR_API_KEY = "INSERT YOUR FLICKR API KEY HERE";

/* express setup */
app.use(cors({ origin: true }));

/* firebase setup */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://photgrid-681ed.firebaseio.com",
});
let db = admin.database();

/* flicker setup */
let flickr = new Flickr(FLICKR_API_KEY);

/* /getItem/:id */
app.get("/getItem/:id/", (req, res) => {
  let id = req.params.id;
  // setup up the express response promise
  let response = new Promise((resolve, reject) => {
    let ref = db.ref("photo/" + id);

    // check the cache
    ref.once("value", (snapshot) => {
      let val = snapshot.val();
      if (val) {
        // it existed in the cache:
        // console.log("retrieving cached photo " + id);
        resolve(val);
      } else {
        // no cache, make a raw flickr request
        let obj = {
          api_key: FLICKR_API_KEY,
          photo_id: id,
        };
        flickr.photos.getInfo(obj)
          .then((image) => {
            if (image && image.text) {
              // the image exists, store in firebase for future use
              let info = JSON.parse(image.text).photo;
              db.ref("photo/" + id).set(info);
              // console.log("retrieving flickr photo " + id);
              resolve(info);
            }
          });
      }
    });
  });
  response.then((item) => {
    res.json(item);
  });
  return response;
});

app.get("/galleries/:galleryId/:pageNumber?", (req, res) => {
  let id = req.params.galleryId;
  let page = req.params.pageNumber || 1;
  let obj = {
    gallery_id: id,
    page: page,
    per_page: 9,
  };
  return flickr.galleries.getPhotos(obj).then((result) => {
    res.json(result.body);
  },
    (error) => {
      res.json(error);
    });
});

// tslint:disable-next-line: no-empty
app.listen(port, () => { });

exports.app = functions.https.onRequest(app);
