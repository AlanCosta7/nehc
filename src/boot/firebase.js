import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: 'gs://' + process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
// initialize Firebase from settings
const app = initializeApp(firebaseConfig);
const $analytics = getAnalytics(app);
const $auth = getAuth(app);

const $firestore = getFirestore(app);
const $storage = getStorage(app);

let messaging = null
const isSupportedBrowser = await isSupported()

if (isSupportedBrowser) {
  messaging = getMessaging(app)
}

const $functions = getFunctions(app, 'southamerica-east1');

if (location.hostname === "localhost") {
  connectFunctionsEmulator($functions, "localhost", 5001);
  // connectAuthEmulator($auth, "http://localhost:9099");
  // connectFirestoreEmulator($firestore, 'localhost', 8085);
  // connectStorageEmulator($storage, "localhost", 9199);
}

export { $firestore, $analytics, messaging, $functions, $auth, $storage };
