import '../style/main.css';

// ** React
import React from 'react';
import { useState, useEffect } from 'react';

// ** Crypto
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';

// ** Navigation
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

// **Pages
import Home from '../Pages/Home';
import Presale from '../Pages/Presale';
import Platform from '../Pages/Platform/PlatformHOC';
import Developers from '../Pages/Developers/Developers';

// **Helpers
import { getChainData, addNetwork } from '../helpers/utilities';
import callAuthAPI from '../api/callAuthAPI';
import NftSale from '../Pages/NftSale/NftSale';

export const AppContext = React.createContext();

function App() {
	let web3Modal;
	const [web3Account, setWeb3Account] = useState(null);
	const [address, setAddress] = useState('');
	const [connected, setConnected] = useState(false);
	const [chainId, setChainId] = useState(56);

	web3Modal = new Web3Modal({
		network: getNetwork(),
		cacheProvider: true,
		providerOptions: getProviderOptions(),
	});

	// ** on mount
	useEffect(() => {
		// ** Adding ref string to session storage
		const ref = new URL(window.location.href).search.slice(1);
		if (ref.length !== 0) {
			const name = ref.slice(0, 3);
			const value = ref.slice(4);
			window.sessionStorage.setItem(`_${name}`, value);
		}

		return () => {
			web3Modal.clearCachedProvider();
			window.sessionStorage.removeItem('_was_connected');
		};
	}, []);

	function getNetwork() {
		try {
			const chainData = getChainData(chainId);
			if (!chainData) {
				return 'testnet';
			}
			const network = chainData.network;
			return network;
		} catch (error) {
			console.log(error);
		}
	}

	function getProviderOptions() {
		try {
			const providerOptions = {
				walletconnect: {
					package: WalletConnectProvider,
					options: {
						infuraId: '0273b4aa39fd49d781c10caa9c0d64dc',
						rpc: {
							56: 'https://bsc-dataseed1.binance.org',
							97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
						},
					},
				},
				torus: {
					package: Torus,
				},
			};
			return providerOptions;
		} catch (error) {
			console.log(error);
		}
	}

	async function onConnect() {
		if (!window.sessionStorage.getItem('_was_connected')) {
			window.sessionStorage.setItem('_was_connected', 'true');
		}
		try {
			await networkControl();

			const provider = await web3Modal.connect();
			await subscribeProvider(provider);

			const web3 = initWeb3(provider);
			window.web3 = web3;
			const accounts = await web3.eth.getAccounts();
			const address = accounts[0];
			const chainId = await web3.eth.chainId();

			// 200 - user exist, 201 - user created
			await callAuthAPI(address);

			setWeb3Account(web3);
			setConnected(true);
			setAddress(address);
			setChainId(chainId);
		} catch (error) {
			console.log('On connect error:', error);
		}
	}

	async function networkControl() {
		try {
			if (window.web3 && window.web3.currentProvider) {
				const chainId = await window.web3.currentProvider.chainId;
				if (chainId !== '0x38') {
					await addNetwork(56);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	const subscribeProvider = async (provider) => {
		try {
			if (!provider.on) {
				return;
			}

			provider.on('disconnect', (error) => {
				if (error) {
					console.log('disconnect:', error);
					return;
				}
				onDisconnect();
			});
			provider.on('accountsChanged', async (accounts) => {
				setAddress(accounts[0]);
			});

			provider.on('chainChanged', async (chainId) => {
				if (chainId !== '0x38') {
					onDisconnect();
				}
			});
		} catch (error) {
			console.log('chainChanged:', error);
		}
	};

	const initWeb3 = (provider) => {
		try {
			const web3 = new Web3(provider);

			web3.eth.extend({
				methods: [
					{
						name: 'chainId',
						call: 'eth_chainId',
						outputFormatter: web3.utils.hexToNumber,
					},
				],
			});

			return web3;
		} catch (error) {
			console.log(error);
		}
	};

	const onDisconnect = async () => {
		if (window.sessionStorage.getItem('_was_connected')) {
			window.sessionStorage.removeItem('_was_connected');
		}
		try {
			if (
				window.web3 &&
				window.web3.currentProvider &&
				window.web3.currentProvider.close
			) {
				window.web3.currentProvider.close();
			}

			await web3Modal.clearCachedProvider();
			resetState();

			// ** reload page
			document.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const resetState = () => {
		setWeb3Account(null);
		setAddress('');
		setConnected(false);
		setChainId(56);
	};

	return (
		<AppContext.Provider
			value={{
				onConnect,
				networkControl,
				web3Account,
				web3Modal,
				onDisconnect,
				address,
				connected,
			}}>
			<Router>
				<ScrollToTop />
				<div className='App'>
					<Switch>
						<Route exact path={['/', '']}>
							<Home />
						</Route>
						<Route path={['/games', '/referral', '/staking']}>
							<Platform />
						</Route>
						<Route path={'/presale'}>
							<Presale />
						</Route>
						<Route path={'/developers'}>
							<Developers />
						</Route>
						<Route path={'/nft'}>
							<NftSale />
						</Route>
					</Switch>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
