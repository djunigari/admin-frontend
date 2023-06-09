import { getApp, getApps, initializeApp } from "firebase/app";
import {
	browserSessionPersistence,
	getAuth,
	setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
	// databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);

// const storage = getStorage(app);
const functions = getFunctions(app, "asia-northeast1");

// if (typeof document !== "undefined") {
// if (process.env.NODE_ENV === "development")
// 	self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

// const appCheck = initializeAppCheck(app, {
// 	provider: new ReCaptchaV3Provider(
// 		process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY as string
// 	),
// 	isTokenAutoRefreshEnabled: true,
// });

// getToken(appCheck)
// 	.then(() => {
// 		console.log("AppCheck:Success");
// 	})
// 	.catch((error) => {
// 		console.log("AppCheck:" + error.message);
// 	});
// }

export { app, firestore, auth, functions };
