import Contract from 'web3-eth-contract';
import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import config from 'config';

const web3Init = async () => {
	try {
		const FROM_ADDRESS = '0x739F3d09fF6AD00610e1D5B34B21eA8Bf4F6C125';
		const CONTRACT_ADDRESS = config.get('tokenAddress');
		const BSC_URL =
			'https://speedy-nodes-nyc.moralis.io/5e85b8af2d28a9d14f0951f4/bsc/mainnet';

		// Create a provider
		const provider = new HDWalletProvider({
			mnemonic: {
				phrase: config.get('MNEMONIC_PHRASE'),
			},
			pollingInterval: 9000,
			providerOrUrl: BSC_URL,
		});

		// ** Set the created provider
		const web3 = new Web3(provider);
		await web3.setProvider(provider);

		const contract = new Contract(
			JSON.parse(JSON.stringify(config.get('tokenABI'))),
			CONTRACT_ADDRESS,
			{
				from: FROM_ADDRESS,
			}
		);
		contract.setProvider(provider);

		return { web3, contract };
	} catch (e) {
		console.log('Web3 initialization error', e);
	}
};

export default web3Init;
