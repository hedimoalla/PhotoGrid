const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const Flickr = require("flickr-sdk");
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

/* firebase setup */
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://photgrid-681ed.firebaseio.com",
});
let db = firebase.database();
let r2 = db.ref("photos/");
r2.once('value', (snapshot) => {
  console.log(snapshot.val());
});

/* flicker setup */
let flickr = new Flickr("ef428994db11236b700e784f548e0f09");

/* express setup */
app.use(cors());

/* /getItem/:id */
app.get("/getItem/:id", (req, res) => {
  let id = req.params.id;
  // setup up the express response promise
  let response = new Promise((resolve, reject) => {
    let ref = db.ref("photos/" + id);

    // check the cache
    ref.once("value", (snapshot) => {
      let val = snapshot.val();
      if (val) {
        // ezpz, it existed in the cache:
        resolve(val);
      } else {
        // no cache
        let obj = {
          api_key: "ef428994db11236b700e784f548e0f09",
          photo_id: id,
        };
        flickr.photos.getInfo(obj).then((image) => {
          if (image && image.text) {
            let info = JSON.parse(image.text).photo;
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
  res.json({
    description: "aaa",
    license: "0",
  });
});

//if (req.params.id already exists in some cache)
//serve out that cache
//else
//make a new request flicker
// });

app.get("/galleries/:galleryId/:pageNumber?", (req, res) => {
  let id = req.params.galleryId;
  let page = req.params.pageNumber || 1;
  let obj = {
    gallery_id: id,
    page: page,
    per_page: 9,
  };
  return flickr.galleries.getPhotos(obj).then((result) => {
    // tslint:disable-next-line: no-console
    console.log(result);
    res.json(result.body);
  },
    (error) => {
      res.json(error);
    });
});

// tslint:disable-next-line: no-empty
app.listen(port, () => { });

exports.app = functions.https.onRequest(app);
