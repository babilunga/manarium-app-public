import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const { privateEncrypt, privateDecrypt, constants } = await import('crypto');
dotenv.config();

const authenticateToken = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'] || false;
		const refHeader = req.headers['refresh'] || false;

		if (!authHeader || !refHeader) {
			res.sendStatus(401);
			return;
		}

		const acess_token = authHeader.split(' ')[1];
		const refresh_token = refHeader.split(' ')[1];

		if (acess_token == null || refresh_token == null) {
			res.sendStatus(401);
			return;
		}

		let obj = {};
		jwt.verify(acess_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
				return;
			}
			obj.pass = user.pass;
		});
		jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) {
				return;
			}
			obj.ref = refresh_token;
		});
		req.user = obj;
		next();
	} catch (error) {
		console.log(error);
	}
};

const generateAccessToken = (user) => {
	try {
		return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '200s',
		});
	} catch (error) {
		console.log(error);
	}
};

const generateRefreshToken = (user) => {
	try {
		return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '200s',
		});
	} catch (error) {
		console.log(error);
	}
};

const privateKey =
	'-----BEGIN ENCRYPTED PRIVATE KEY-----\n' +
	'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\n' +
	'-----END ENCRYPTED PRIVATE KEY-----\n';

const decryptWithPrivate = (encrypted) => {
	try {
		const decrypt = privateDecrypt(
			{
				key: privateKey,
				padding: constants.RSA_PKCS1_PADDING,
				passphrase: process.env.PASSPHRASE_RSA,
			},
			Buffer.from(encrypted, 'base64')
		);

		return decrypt.toString();
	} catch (error) {
		console.log('Decode error:', error.message);
	}
};

const encryptWithPrivate = (decrypted) => {
	try {
		return privateEncrypt(
			{
				key: privateKey,
				padding: constants.RSA_PKCS1_PADDING,
				passphrase: process.env.PASSPHRASE_RSA,
			},
			Buffer.from(decrypted)
		);
	} catch (error) {
		console.log(error);
	}
};

const isTechnicalTime = (utc) => {
	try {
		const [date, time] = utc.split(' ');
		const [year, month, day] = date.split('-');

		const dateNow = new Date(utc.replace(' ', 'T')).getTime();
		const COUNTDOWN_TIME = '18:00:00';
		const STAMP_TIME = '19:00:00';

		const countdownDate = new Date(
			`${monthFormatter(Number(month) - 1)} ${day}, ${year} ${COUNTDOWN_TIME}`
		).getTime();
		const stamp10min = new Date(
			`${monthFormatter(Number(month) - 1)} ${day}, ${year} ${STAMP_TIME}`
		).getTime();

		if (dateNow > countdownDate && dateNow < stamp10min) {
			return true;
		} else if (dateNow > stamp10min) {
			return false;
		} else if (dateNow < countdownDate) {
			return false;
		}

		function monthFormatter(num) {
			let month = '';
			switch (num) {
				case 0:
					month = 'January';
					break;
				case 1:
					month = 'February';
					break;
				case 2:
					month = 'March';
					break;
				case 3:
					month = 'April';
					break;
				case 4:
					month = 'May';
					break;
				case 5:
					month = 'June';
					break;
				case 6:
					month = 'July';
					break;
				case 7:
					month = 'August';
					break;
				case 8:
					month = 'September';
					break;
				case 9:
					month = 'October';
					break;
				case 10:
					month = 'November';
					break;
				case 11:
					month = 'December';
					break;
				default:
					month = 'none';
					break;
			}
			return month;
		}
	} catch (error) {
		console.log(error);
	}
};

export default {
	authenticateToken,
	generateAccessToken,
	generateRefreshToken,
	decryptWithPrivate,
	encryptWithPrivate,
	isTechnicalTime,
};
