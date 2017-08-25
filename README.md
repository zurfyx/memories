# Memories

> A social platform to share your worldwide memories.

[![Build Status](https://travis-ci.org/zurfyx/memories.svg?branch=master)](https://travis-ci.org/zurfyx/memories)
[![David](https://david-dm.org/zurfyx/memories.svg)](https://david-dm.org/zurfyx/memories)
[![Code Climate](https://codeclimate.com/github/zurfyx/memories/badges/gpa.svg)](https://codeclimate.com/github/zurfyx/memories)
![Physical Web](https://img.shields.io/badge/Physical%20Web-%E2%9C%94-blue.svg)
![Liquid Galaxy](https://img.shields.io/badge/Liquid%20Galaxy-%E2%9C%94-blue.svg)

## Live

Live @ [geographical-memories.firebaseapp.com](https://geographical-memories.firebaseapp.com)

## Getting started

Want to run this project yourself?

Requirements:

- [Node 8+](https://nodejs.org/)
- Firebase project (create one [here](https://console.firebase.google.com))

Edit `src/environments/environment.prod.ts` to suit your needs. The current configuration is the one used at [https://geographical-memories.firebaseapp.com](https://geographical-memories.firebaseapp.com)

```
export const environment = {
  production: true,
  firebase: {
    // Inside a Firebase project, they will provide you with all this information at once.
    // Overview -> Add Firebase to your web app.
    apiKey: 'AIzaSyC84AqlQQSAJQxvdkJ_U6EGw6TTQpV-PBA',
    authDomain: 'geographical-memories.firebaseapp.com',
    databaseURL: 'https://geographical-memories.firebaseio.com',
    projectId: 'geographical-memories',
    storageBucket: 'geographical-memories.appspot.com',
    messagingSenderId: '1078012876993',
  },
  maps: {
    // https://developers.google.com/maps/documentation/javascript/get-api-key
    apiKey: 'AIzaSyDB8v_lXYf4FGzrv5gmJvUaZaDRfck2QbE',
  },
  urlShortener: {
    // https://developers.google.com/url-shortener/v1/getting_started
    apiKey: 'AIzaSyBNGykVSDx3ZNdGnlZU1wne2eT3uAkywiU',
  }
};
```

Install project dependencies first with `npm install`.

Build the project with `npm run build`.

Serve the built project yourself or upload the `dist/` project onto the Firebase hosting.

Either if you are serving the project yourself or uploading it onto the Firebase hosting, you do need to modify the `.firebaserc` file to match the name of your own Firebase project. That is because the database and storage rules do still have to be uploaded to Firebase (unless you are doing this process manually by copy-pasting the contents in `firebase/database.rules.json`).

To have everything uploaded inside Firebase, install Firebase Tools first.

```
npm install -g firebase-tools
```

Afterwards, run:

```
firebase deploy
```

Your own Geographical Memories version should now be live!

## Built with

Core technologies/dependencies:

- [TypeScript](https://www.typescriptlang.org)
- [Angular 4](https://angular.io)
- [Angular Material](https://material.angular.io)
- [Firebase](https://firebase.google.com) - Real time database and Storage
- [Angularfire2](https://github.com/angular/angularfire2)

## Development

Want to help with the development of Geographical Memories?

Requirements:

- [Node 8+](https://nodejs.org/)
- Firebase project to test your modifications on a non-production environment (create one [here](https://console.firebase.google.com))

Edit `src/environments/environment.ts` to suit your needs.

Install dependencies with `npm install` and run the project as development with `npm start`. Make sure to run a full set of tests with `npm test` before commiting!

We are following [https://github.com/gothinkster/angular-realworld-example-app](https://github.com/gothinkster/angular-realworld-example-app) when it comes to the application coding structure and style.

It is to note that we are also using a [CoreModule](https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot) to store our servies, to prevent what should be singletons from reinitializating themselves when splitting the `bundle.js` [into chunks](https://github.com/zurfyx/memories/blob/master/src/app/app-routing.module.ts).

## Contributions

Contributions are welcome. See [Development](#development).

## License

MIT © [Gerard Rovira Sánchez](//zurfyx.com)

<p align="center">
  <img src="https://lh5.googleusercontent.com/_uwWzNbZjbpgSICWTqjo2Yn-b3lzj2y-Um8XbhXyhRAMecshGI0PnGK6N0fU2IDFTFvdg7d3kbKq-5CQKYgtpavztSCeC33QGvs2-AHM0csx5kc-RwleCIHysG47FfrH6uvDl82Z" width="250px" alt="Google Summer of Code" />
</p>