import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { applicationDefault } from 'firebase-admin/app';
import firebase from 'firebase/compat/app';

async function dbInstance() {
	try {
		const firebaseConfig = {
			credential: applicationDefault(),
			apiKey: 'AIzaSyBqZaJ2fN-YUyVbmTo2ccO5T0fhhi2_wUg',
			authDomain: 'playground-bsc.firebaseapp.com',
			projectId: 'playground-bsc',
			storageBucket: 'playground-bsc.appspot.com',
			messagingSenderId: '1875581566',
			appId: '1:1875581566:web:5eff99123853ca981f562f',
			measurementId: 'G-9BQNWD8ES4',
		};
		firebase.initializeApp(firebaseConfig);
		await firebase
			.auth()
			.signInWithEmailAndPassword(
				'info.manarium@gmail.com',
				'R^+q_Z56w=7&v?YD'
			);

		return firebase.firestore();
	} catch (error) {
		console.log(error);
	}
}

async function isBlacklisted(wallet) {
	try {
		const db = await dbInstance();
		const blacklistedRef = await db.collection('blacklist').doc(wallet).get();
		const doc = blacklistedRef.data();
		return doc !== undefined && doc.ban === true;
	} catch (error) {
		console.log(error);
	}
}

async function setFirebaseData(col, doc, data) {
	try {
		const db = await dbInstance();
		db.collection(col).doc(doc).set(data);
	} catch (error) {
		console.log(error);
	}
}

async function getHighScoreAttempts(col, doc, newScore) {
	try {
		const db = await dbInstance();
		const document = await db.collection(col).doc(doc).get();
		const player = document.data();
		if (player === undefined) {
			return 1;
		}

		let score = await getCurrentScore(col, doc);
		let attempts;

		if (player.highScoreAttempts !== undefined) {
			attempts = Number(player.highScoreAttempts);
		} else {
			attempts = 0;
		}

		if (Number(newScore) > Number(score)) {
			return attempts + 1;
		} else {
			return attempts;
		}
	} catch (error) {
		console.log(error);
	}
}

async function getCurrentScore(col, doc) {
	try {
		const db = await dbInstance();
		const document = await db.collection(col).doc(doc).get();
		const player = document.data();

		if (player === undefined) {
			return 0;
		}

		if (player.score === undefined) {
			return 0;
		}

		return Number(player.score);
	} catch (error) {
		console.log(error);
	}
}

export default {
	dbInstance,
	isBlacklisted,
	setFirebaseData,
	getHighScoreAttempts,
	getCurrentScore,
};
