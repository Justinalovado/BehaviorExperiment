const { getDatabase, ref, set } = require("firebase/database");
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

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}
writeUserData(1, "John", "john@naver.com", "https://example.com/john.jpg");
