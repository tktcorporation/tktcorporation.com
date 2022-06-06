import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import 'firebase/analytics';
import { Analytics, getAnalytics } from "firebase/analytics";
const FIREBASE_APIKEY = "AIzaSyDCMz60fSZWmUamvWoiCm3qnMwWnqo0Ld8";

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: "tktcorporation-home.firebaseapp.com",
  databaseURL: "https://tktcorporation-home.firebaseio.com",
  projectId: "tktcorporation-home",
  storageBucket: "tktcorporation-home.appspot.com",
  messagingSenderId: "30824290023",
  appId: "1:30824290023:web:45dde016c25c8560a83442",
  measurementId: "G-JLL4WBFC4D"
};

let firebaseApp: FirebaseApp;
let analytics: Analytics;

if (typeof window !== "undefined" && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  analytics = getAnalytics()
}
export { firebaseApp, analytics };
