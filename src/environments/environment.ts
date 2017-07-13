// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCaifJa_qkP7zSaRiVtyZc7O9U7d-UEES8',
    authDomain: 'geographical-memories-dev.firebaseapp.com',
    databaseURL: 'https://geographical-memories-dev.firebaseio.com',
    projectId: 'geographical-memories-dev',
    storageBucket: 'geographical-memories-dev.appspot.com',
    messagingSenderId: '388931646367',
  },
  maps: {
    apiKey: 'AIzaSyDPQLa3pdoBVIfPj8Hj5mO7wQhW-z8b5jU',
  },
  urlShortener: {
    apiKey: 'AIzaSyDiF9IhtPET7-f0F698WfbH30ZehuV4hZU',
  }
};
