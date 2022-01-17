import Constants from "expo-constants";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
};

// initialize firebase
initializeApp(firebaseConfig);

// initialize firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// initialize auth
const auth = getAuth();

export { app, db, auth };
