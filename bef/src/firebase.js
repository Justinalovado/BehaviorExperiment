const { getDatabase, ref, set, get } = require("firebase/database");
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBenLljNoBmvXFQtTuUSFOHSKPR4o72l84",
  authDomain: "behavioural-experiment.firebaseapp.com",
  databaseURL:
    "https://behavioural-experiment-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "behavioural-experiment",
  storageBucket: "behavioural-experiment.appspot.com",
  messagingSenderId: "807826779185",
  appId: "1:807826779185:web:4254b9dd79a26e84fcb910",
  measurementId: "G-5XRWMN1JCB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function storeOptionList(path, optionList) {
  const db = getDatabase();
  set(ref(db, path), optionList);
};

export function getOptionList(path) {
  const db = getDatabase();
  return new Promise((resolve, reject) => {
    ref(db, path)
      .once("value")
      .then(snapshot => {
        resolve(snapshot.val());
      })
      .catch(error => {
        reject(error);
      });
  });
}
