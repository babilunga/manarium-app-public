import Web3 from 'web3';

export async function getChainData(chainId) {
	try {
		const { default: supportedChains } = await import('./chains');
		const chainData = supportedChains.filter(
			(chain) => chain.chain_id === chainId
		)[0];
		if (!chainData) {
			console.log(`ChainId: ${chainId}, missing or not supported`);
			return false;
		}
		return chainData;
	} catch (error) {
		console.log(error);
	}
}

export async function addNetwork(id) {
	const provider = window.ethereum;
	if (provider) {
		try {
			let networkData;
			switch (id) {
				case 97:
					networkData = [
						{
							chainId: '0x61',
							chainName: 'BSC TESTNET',
							rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
							nativeCurrency: {
								name: 'BINANCE COIN',
								symbol: 'BNB',
								decimals: 18,
							},
							blockExplorerUrls: ['https://testnet.bscscan.com/'],
						},
					];
					break;
				case 56:
					networkData = [
						{
							chainId: '0x38',
							chainName: 'Smart Chain',
							rpcUrls: ['https://bsc-dataseed.binance.org/'],
							nativeCurrency: {
								name: 'BINANCE COIN',
								symbol: 'BNB',
								decimals: 18,
							},
							blockExplorerUrls: ['https://bscscan.com/'],
						},
					];
					break;
				default:
					break;
			}

			await provider.request({
				method: 'wallet_addEthereumChain',
				params: networkData,
			});
		} catch (e) {
			console.log(e);
		}
	} else {
		console.log(
			"Can't setup the BSC network on metamask because window.ethereum is undefined"
		);
	}
}

export function appearanceObserve() {
	try {
		const options = {
			root: null,
			threshold: 0.6,
		};

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				} else {
					entry.target.classList.add('on_appearence');
					observer.unobserve(entry.target);
				}
			});
		}, options);
		return observer;
	} catch (error) {
		console.log(error);
	}
}

export function imagesObserve() {
	const options = {
		rootMargin: '100px',
	};

	const preloadImage = (img) => {
		const src = img.getAttribute('data-src');
		if (!src) return;
		img.src = src;
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			} else {
				preloadImage(entry.target);
				observer.unobserve(entry.target);
			}
		});
	}, options);
	return observer;
}

export async function contractConnect(abiJson, smartContract) {
	try {
		let abi = Object.values(abiJson);

		const LINK = 'https://bsc-dataseed.binance.org/';
		const web3Account = new Web3(LINK);
		return new web3Account.eth.Contract(abi, smartContract);
	} catch (error) {
		console.log(error);
	}
}

export async function fetchFirebase(gameName) {
	try {
		const { default: firebase } = await import('firebase/compat/app');
		await import('firebase/compat/auth');
		await import('firebase/compat/firestore');

		const SCORE_COLLECTION_NAME = gameName + '_prev';
		firebase.initializeApp({
			projectId: 'playground-bsc',
		});

		const respond = await firebase
			.firestore()
			.collection(SCORE_COLLECTION_NAME)
			.orderBy('score', 'desc')
			.get();

		const wallets = [];
		respond.forEach(function (doc) {
			const data = doc.data();
			const item = [Number(data.score), data.wallet];
			wallets.push(item);
		});

		// wallets = [ [10, 0x00...], [5, 0x123...], [100, 0x666...], ... ];

		return wallets;
	} catch (e) {
		console.log(e.message);
	}
}

export function walletFormating({ wallet, start, end }) {
	const first = wallet.slice(0, start ?? 2);
	const second = wallet.slice(-1 * (end ?? 4));

	return first.concat('...', second);
}
