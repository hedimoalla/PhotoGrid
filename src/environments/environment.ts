// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiMiddleware: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyC_GOceMVUTUEvc9nLzt7p7Z3-0eb1ARCM',
    authDomain: 'photgrid-681ed.firebaseapp.com',
    databaseURL: 'https://photgrid-681ed.firebaseio.com',
    projectId: 'photgrid-681ed',
    storageBucket: 'photgrid-681ed.appspot.com',
    messagingSenderId: '108610089618'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
