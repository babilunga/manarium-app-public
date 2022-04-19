import dotenv from 'dotenv';
import express from 'express';
import { User, TokenPrice, RefreshToken } from '../utils/mongodb.config.js';
import firebaseConfig from '../utils/firebase.config.js';
import jwt from 'jsonwebtoken';
import Web3 from 'web3';
import security from '../utils/security.js';
import initContract from '../utils/contractInstance.js';

dotenv.config();
const router = express.Router();

router.post('/auth', async (req, res) => {
	try {
		const { address, ref } = req.body;
		const userExists = await User.findOne({ address }).exec();

		// ** is user exists in
		if (!userExists) {
			let referral = '';
			if (ref) {
				const userReferral = await User.findOne({ _id: ref }).exec();
				if (userReferral) {
					referral = String(userReferral.address);
				}
			}

			new User({
				address,
				referral,
				earnedTournaments: 0,
				earnedStacking: 0,
			})
				.save()
				.then(() => {
					res.sendStatus(201);
				})
				.catch((e) => {
					res.sendStatus(400);
				});
		} else {
			res.sendStatus(200);
		}
	} catch (e) {
		console.log('Auth API error:', e.message);
	}
});

router.get('/info/:id', async (req, res) => {
	try {
		let earnedTournaments = 0;
		let earnedStacking = 0;
		let accumTournaments = 0;
		let accumStacking = 0;
		let friends = [];
		let reflink = '';

		const user = await User.findOne({ address: req.params.id }).exec();

		if (user) {
			reflink = user._id;
			earnedTournaments = user.earnedTournaments;
			earnedStacking = user.earnedStacking;
			accumTournaments = user.accumTournaments;
			accumStacking = user.accumStacking;

			friends = await User.find({ referral: req.params.id }).exec();
		}
		res.send({
			reflink,
			earnedTournaments,
			earnedStacking,
			accumTournaments,
			accumStacking,
			referrals: friends.length,
		});
	} catch (e) {
		console.log('Get info error:', e.message);
	}
});

router.get('/mongoWatch', async (req, res) => {
	try {
		const data = await TokenPrice.findOne({ name: 'ARI' }).exec();
		res.send({
			price: data.price,
			last_updated_at: data.timestamp,
		});
	} catch (e) {
		console.log('Get info error:', e.message);
	}
});

router.get('/getUTCTime', async (req, res) => {
	try {
		res.send({
			utc_datetime: new Date(new Date().toUTCString()),
		});
	} catch (e) {
		console.log('Get UTC time error:', e.message);
	}
});

router.post('/data1', async (req, res) => {
	try {
		if (Object.keys(req.body.data).length === 0) {
			res.sendStatus(403);
			return;
		}

		const passEncoded = req.body.data;
		const passString = security.decryptWithPrivate(passEncoded);
		const [pass, timestamp] = passString.split('_');
		const timeNow = Number(new Date(new Date().toUTCString()).getTime());
		const timeFromData = Number(timestamp) * 1000;

		// if (timeNow - timeFromData > 30000) {
		// 	res.sendStatus(401);
		// 	return;
		// }
		if (pass !== process.env.PASSPHRASE) {
			res.sendStatus(401);
			return;
		}

		const user = { pass };
		const token = security.generateAccessToken(user);
		const refresh_t = security.generateRefreshToken(user);

		await new RefreshToken({ refreshToken: refresh_t }).save({ j: true });

		const dataToEncrypt = JSON.stringify([token, refresh_t]);
		const encrypt = security.encryptWithPrivate(dataToEncrypt);

		res.json({ res: Buffer.from(encrypt).toString('base64') });
	} catch (error) {
		console.log(error);
	}
});

router.post('/data2', async (req, res) => {
	try {
		const tokenEncoded = req.body.data;
		const token = security.decryptWithPrivate(tokenEncoded);

		if (!token || token == null) {
			res.sendStatus(401);
			return;
		}

		const dbToken = await RefreshToken.findOne({ refreshToken: token });
		if (dbToken === null) {
			res.sendStatus(401);
			return;
		}

		let newAccessToken = '';
		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) {
				res.sendStatus(403);
				return;
			}
			if (user.pass !== process.env.PASSPHRASE) {
				res.sendStatus(401);
				return;
			}
			newAccessToken = security.generateAccessToken({ pass: user.pass });
		});

		const dataToEncrypt = JSON.stringify([newAccessToken]);
		const encrypt = security.encryptWithPrivate(dataToEncrypt);

		res.json({ res: Buffer.from(encrypt).toString('base64') });
	} catch (error) {
		console.log(error);
	}
});

router.post('/data3', security.authenticateToken, async (req, res) => {
	try {
		if (Object.keys(req.user).length === 0) {
			res.sendStatus(403);
			return;
		}
		if (req.user && req.user.pass !== process.env.PASSPHRASE) {
			res.sendStatus(401);
			return;
		}

		const dataEncoded = req.body.data;
		const dataJSON = security.decryptWithPrivate(dataEncoded);
		const data = JSON.parse(dataJSON);
		const [score, utc, title, version, _ip, session, wallet] = data;

		const ip = req.ip || req.socket.remoteAddress || '';
		const user_agent = JSON.stringify(req.headers['user-agent']) || '';

		const curentScore = await firebaseConfig.getCurrentScore(title, wallet);

		if (Number(score) <= Number(curentScore)) {
			res.sendStatus(200);
			return;
		}
		if (security.isTechnicalTime(utc)) {
			res.sendStatus(200);
			return;
		}
		if (
			!Web3.utils.isAddress(wallet) ||
			!session ||
			Number(session) <= 0 ||
			!utc
		) {
			res.sendStatus(401);
			return;
		}
		if (await firebaseConfig.isBlacklisted(wallet)) {
			res.sendStatus(401);
			return;
		}

		const contract = initContract();
		const gameInfo = await contract.methods.getTournamentInfo(title).call();
		const entered = await contract.methods.playerEntred(title, wallet).call();

		if (gameInfo.version !== String(version)) {
			res.sendStatus(401);
			return;
		}
		if (!entered) {
			res.sendStatus(401);
			return;
		}

		const highScoreAttempts = await firebaseConfig.getHighScoreAttempts(
			title,
			wallet,
			score
		);
		const sendData = {
			score: Number(score),
			timeUTC: utc,
			gameVersion: version,
			ip,
			user_agent,
			sessionTime: session,
			wallet,
			highScoreAttempts,
		};

		firebaseConfig.setFirebaseData(title, wallet, sendData);
		RefreshToken.deleteOne({ refreshToken: req.user.ref }, (err) => {
			if (err) {
				res.sendStatus(401);
				return;
			}
		});

		res.sendStatus(202);
	} catch (error) {
		console.log(error.message);
	}
});

router.get('/getIp', (req, res) => {
	const ip = req.ip || req.socket.remoteAddress;
	res.send({ ip });
});

export default router;
