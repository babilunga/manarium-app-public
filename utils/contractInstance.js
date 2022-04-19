import config from 'config';
import Web3 from 'web3';

const initContract = () => {
	try {
		const LINK =
			'https://speedy-nodes-nyc.moralis.io/5e85b8af2d28a9d14f0951f4/bsc/mainnet';
		const ABI = config.get('tournamentsABI');
		const CONTRACT_ADDRESS = config.get('tournamentAddress');

		let web3 = new Web3(LINK);
		return new web3.eth.Contract(
			JSON.parse(JSON.stringify(ABI)),
			CONTRACT_ADDRESS
		);
	} catch (error) {
		console.log(error);
	}
};

export default initContract;
