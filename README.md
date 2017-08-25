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

Build the project with `npm run build`.

Serve the built project yourself or upload the `dist/` project onto the Firebase hosting.

Either if you are serving the project yourself or uploading it onto the Firebase hosting, you do need to modify the `.firebaserc` file to match the name of your own Firebase project. That is because the database rules do still have to be uploaded to Firebase (unless you are doing this process manually by copy-pasting the contents in `firebase/database.rules.json`).

To have everything uploaded inside Firebase, install Firebase Tools first.

```
npm install -g firebase-tools
```

Afterwards, run:

```
firebase deploy
```

Your own Geographical Memories version should now be live!

## License

MIT © [Gerard Rovira Sánchez](//zurfyx.com)

<p align="center">
  <img src="https://lh5.googleusercontent.com/_uwWzNbZjbpgSICWTqjo2Yn-b3lzj2y-Um8XbhXyhRAMecshGI0PnGK6N0fU2IDFTFvdg7d3kbKq-5CQKYgtpavztSCeC33QGvs2-AHM0csx5kc-RwleCIHysG47FfrH6uvDl82Z" width="250px" alt="Google Summer of Code" />
</p>