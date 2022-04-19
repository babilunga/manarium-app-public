import mongoose from 'mongoose';
import config from 'config';
const { Schema } = mongoose;

// ** connect to monge data base
export const connectMongoDb = async () => {
	try {
		mongoose.connect(config.get('mongoURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: true,
		});
	} catch (e) {
		console.log('Database connection error', e.message);
		process.exit(1);
	}
};

const toLower = (str) => str.toLowerCase();

// ** new user's schema
const NewUser = new Schema({
	address: { type: String, default: '', required: true, set: toLower },
	referral: { type: String, default: '', set: toLower },
	earnedTournaments: { type: Number, default: 0 },
	earnedStacking: { type: Number, default: 0 },
	accumTournaments: { type: Number, default: 0 },
	accumStacking: { type: Number, default: 0 },
});

// ** new operation's schema
const NewOperation = new Schema({
	value: { type: Number, default: 0, required: true },
	reason: { type: String, required: true }, // tournament || stacking
	status: { type: String, default: 'frozen', required: true }, // frozen | pending | fulfilled
	recipient: { type: String, default: '', required: true },
	time: { type: String, default: String(Date.now()), required: true },
});

// ** new token price's schema
const NewTokenPrice = new Schema({
	price: { type: String, default: '...', required: true },
	name: { type: String, default: 'ARI', required: true },
	timestamp: { type: String, default: String(Date.now()), required: true },
});

// ** new refresh token's schema
const NewRefreshToken = new Schema({
	refreshToken: { type: String, required: true },
	timestamp: { type: String, default: String(Date.now()) },
});

export const User = mongoose.model('users', NewUser);
export const Operation = mongoose.model('operations', NewOperation);
export const TokenPrice = mongoose.model('token_price', NewTokenPrice);
export const RefreshToken = mongoose.model('refresh_token', NewRefreshToken);
