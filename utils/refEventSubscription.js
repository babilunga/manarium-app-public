// import web3Init from './web3Init.js';
// import Moralis from 'moralis/node.js';
// import config from 'config';
import { User, Operation } from './mongodb.config.js';
import BigNumber from 'bignumber.js';

const PRIZE_PERCENT_TOURNAMENT = 0.03;
// const PRIZE_PERCENT_STAKE = 0.05;
const MAX_ACCUMULATE = 40;
const FROM_ADDRESS = '0x739F3d09fF6AD00610e1D5B34B21eA8Bf4F6C125';

const refEventSubscription = async () => {
	try {
		// ** Commentd for dev version
		// Moralis.initialize(config.get('moralisAppId')); // mock data
		// Moralis.serverURL = config.get('moralisServerUrl'); // mock data
		// const web3Kit = await web3Init();
		// const queryTour = new Moralis.Query('TournamentJoined');
		// const subscriptionTour = await queryTour.subscribe();
		// subscriptionTour.on('create', (object) => {
		// 	const { attributes } = object;
		// 	// TODO: Comment when run server localy!!!!!!!
		// 	refEventHandler(attributes, web3Kit);
		// });
	} catch (e) {
		console.log('Moralis subscription error:', e);
	}
};

const refEventHandler = async (userData, web3Kit) => {
	try {
		// ** userData => { _id, player, game, timestamp, ... }
		const pendOpsCount = await Operation.count({ status: 'pending' });
		const prepOpsCount = await Operation.count({ status: 'prepared' });

		await prepareOperation();
		if (pendOpsCount > 0 || prepOpsCount > 0) {
			return;
		} else {
			executeOperations(web3Kit);
		}

		async function prepareOperation() {
			// ** It means that event came from tournamentJoined()
			if (userData.title !== undefined) {
				const address = userData?.player?.toLowerCase() ?? '';
				const player = await User.findOne({ address }).exec();

				if (player === null || !player.referral) {
					console.log(
						'Player: <' + address + '> is not registered or have no referral.'
					);
					return;
				}

				const prizeValue = BigNumber(userData.entry)
					.dividedBy(BigNumber(10).pow(18))
					.multipliedBy(BigNumber(PRIZE_PERCENT_TOURNAMENT))
					.toNumber();

				// if some of opearations prepared,
				// make new operation 'frozen'
				await new Operation({
					value: Number(prizeValue), // $ari coins
					reason: 'tournament', // tournament | staking
					status: pendOpsCount > 0 || prepOpsCount > 0 ? 'frozen' : 'prepared', // frozen | prepared | pending | fulfilled
					recipient: String(player.referral),
				}).save({ j: true });
			}
			// ** Code below means event came from staking
			// else {
			// 	return;
			// 	// ** Temporary code ==========================================================
			// 	// const address = '0x1e18d8fc9b60d91c5d123c63e3dabcc6c1a9fafb';
			// 	// const invoker = await User.findOne({ address }).exec();

			// 	// if (invoker === null) {
			// 	//   console.log(`(i) Player: "${address ? address : 'null'}" is not registered.`);
			// 	//   return;
			// 	// }
			// 	// if (!invoker.referral) {
			// 	//   console.log(`(i) Player: "${address ? address : 'null'}" have no referral.`);
			// 	//   return;
			// 	// }

			// 	// // const prizeValue = BigNumber(userData.<income>)
			// 	// const prizeValue = BigNumber('500000000000000000000')
			// 	//   .dividedBy(BigNumber(10).pow(18))
			// 	//   .multipliedBy(BigNumber(PRIZE_PERCENT_STAKE))
			// 	//   .toNumber();

			// 	// await new Operation({
			// 	//   value: Number(prizeValue), // $ari coins
			// 	//   reason: 'staking', // tournament | staking
			// 	//   status: pendOpsCount > 0 || prepOpsCount > 0 ? 'frozen' : 'prepared', // frozen | prepared | pending | fulfilled
			// 	//   recipient: String(invoker.referral),
			// 	// }).save({ j: true });
			// 	// ** Temporary code ==========================================================

			// 	/* =========== Pseudocode ============================
			// 	const address = userData.address.toLowerCase()
			// 	const invoker = await User.findOne({ address }).exec()
			// 	if (!player) return
			// 	if (!player.referral) return
			// 	const prizeValue = BigNumber(... userData.<income?> ...)...
			// 	new Operation({
			// 		value: ...,
			// 		reason: 'staking', !!!
			// 		status: ...,
			// 		recipient: ...,
			// 	}).save({ j: true })
			// 	=====================================================
			// 	*/
			// }
			return;
		}
	} catch (error) {
		console.log('Tournament event handler error: ', error.message);
	}
};

const executeOperations = async (web3Kit) => {
	try {
		const operations = Operation.find({
			status: { $in: ['frozen', 'prepared'] },
		}).cursor();

		for (
			let doc = await operations.next();
			doc != null;
			doc = await operations.next()
		) {
			const { _id, recipient, value, reason } = doc;
			await Operation.updateOne({ _id }, { status: 'pending' });
			const res = await singleOperation(recipient, value, reason, web3Kit);
			if (res === false) {
				return;
			}
		}
	} catch (error) {
		console.log('Execute Operations function error: ', error.message);
	}
};

const singleOperation = async (recipient, value, reason, web3Kit) => {
	try {
		const { web3, contract } = web3Kit;
		const recipientDoc = await User.findOne({ address: recipient });

		if (recipientDoc === null) {
			return true;
		}

		let { earnedTournaments, earnedStacking, accumTournaments, accumStacking } =
			recipientDoc;

		accumTournaments += reason === 'tournament' ? Number(value) : 0;
		accumStacking += reason === 'staking' ? Number(value) : 0;

		const sum = accumTournaments + accumStacking;

		const balanceWei = await contract.methods.balanceOf(FROM_ADDRESS).call();
		const balance = Number(await web3.utils.fromWei(balanceWei));

		if (balance < MAX_ACCUMULATE) {
			console.log(
				`No funds on the balance for payment. Balance is: ${balance}`
			);
			return false;
		}

		if (Number(sum) >= MAX_ACCUMULATE) {
			let isTransError = false;
			const valueSend = BigNumber(sum)
				.multipliedBy(BigNumber(10).pow(18))
				.toFixed();
			await contract.methods
				.transfer(recipient, valueSend)
				.send({ from: FROM_ADDRESS, gas: '200000' })
				.on('receipt', async (receipt) => {
					if (receipt) {
						earnedTournaments += accumTournaments;
						earnedStacking += accumStacking;
						accumTournaments = 0;
						accumStacking = 0;
					}
				})
				.on('error', async (err, req) => {
					console.log(
						'(e) Transaction sending error:',
						err.message,
						err.code ?? '',
						req
					);
				});
			if (isTransError) {
				return true;
			}
		}
		await writePrizeInMongo(
			recipient,
			earnedTournaments,
			accumTournaments,
			earnedStacking,
			accumStacking
		);
	} catch (error) {
		console.log('(e) Single Operation function error: ', error.message);
	}
};

const writePrizeInMongo = async (address, earnT, accumT, earnS, accumS) => {
	try {
		const res = await User.updateOne(
			{ address },
			{
				earnedTournaments: Number(earnT),
				accumTournaments: Number(accumT),
				earnedStacking: Number(earnS),
				accumStacking: Number(accumS),
			}
		);
		const isOkay = res.acknowledged;

		if (isOkay) {
			const fulfilled = await Operation.updateOne(
				{ recipient: address, status: 'pending' },
				{ status: 'fulfilled' }
			);
		} else {
			console.log('\n(e) Something went wrong, adding prize');
			return;
		}
	} catch (error) {
		console.log('(e) Function writePrizeInMongo(){...} error: ', error.message);
	}
};

export default refEventSubscription;
