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
