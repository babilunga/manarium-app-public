import '../style/Presale1/presale.css';

import { useEffect, useState } from 'react';
import { AppContext } from '../Components/App';

import Header from '../Components/Presale/Header';
import Hero from '../Components/Presale/Hero';
import Main from '../Components/Presale/Main';
import LoaderScreen from '../Components/UI/LoaderScreen';
import getData from '../data/getData';
import BackgroundLightSpot from '../Components/UI/BackgroundLightSpot';
import { contractConnect } from '../helpers/utilities';
import presaleAbi from '../data/presaleAbi.json';

function Presale(props) {
	const { onConnect, address, web3Modal } = props;
	const CONTRACT_ADDRESS = getData.seedSaleAddress;
	const MIN_BUY = 0.1;
	const MAX_BUY = 2;

	const [claimBtnDisadled, setClaimBtnDisadled] = useState(false);
	const [contractInstance, setContractInstance] = useState(null);
	const [saleFinalized, setSaleFinalized] = useState(false);
	const [claimEvent, setClaimEvent] = useState(false);

	useEffect(() => {
		reconnect();
		setContract();
	}, []);

	useEffect(() => {
		if (contractInstance) {
			fetchContractData();
		}
	}, [contractInstance]);

	const fetchContractData = async (contract = contractInstance) => {
		try {
			if (!contract) {
				return;
			}

			const finalized = contract.methods.saleFinilized().call();
			finalized.then((res) => {
				setSaleFinalized(res);
			});
		} catch (error) {
			console.log(error);
		}
	};

	async function claim() {
		try {
			setClaimBtnDisadled(true);
			const encoded = contractInstance.methods.reclaimTokens().encodeABI();
			if (window.web3) {
				window.web3.eth
					.sendTransaction({
						from: address,
						to: CONTRACT_ADDRESS,
						gas: '200000',
						data: encoded,
					})
					.on('receipt', (receipt) => {
						setClaimEvent('receipt');
					})
					.on('confirmation', function (confirmationNumber, receipt) {
						setClaimBtnDisadled(false);
						setClaimEvent('confirmation');
					})
					.on('error', (error) => {
						console.log('Transaction error:', error);
						setClaimBtnDisadled(false);
						setClaimEvent('error');
					});
			}
		} catch (e) {
			console.log(e.message ?? e);
		}
	}

	function claimDisabled() {
		try {
			if (address === '') {
				return true;
			}

			if (claimBtnDisadled) {
				return true;
			}

			if (!saleFinalized) {
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
		}
	}

	async function setContract() {
		// Dinamic Imports
		try {
			// Setting Contract Instance
			const contract = await contractConnect(presaleAbi, CONTRACT_ADDRESS);
			setContractInstance(contract);
		} catch (error) {
			console.log(error);
		}
	}

	async function reconnect() {
		try {
			if (window.web3 && web3Modal.cachedProvider) {
				await onConnect();
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='presale'>
			<LoaderScreen loading={false} timeForLoad={true} />
			<BackgroundLightSpot
				width={'80%'}
				height={'100%'}
				maxWidth={'1800px'}
				maxHeight={'800px'}
				top={'-10%'}
			/>
			<Header />
			<Hero
				address={address}
				claim={claim}
				claimDisabled={claimDisabled}
				contractInstance={contractInstance !== null && contractInstance}
				claimEvent={claimEvent}
			/>
			<Main MIN_BUY={MIN_BUY} MAX_BUY={MAX_BUY} />
		</div>
	);
}

const PresaleContainer = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => (
				<Presale
					onConnect={context.onConnect}
					web3Modal={context.web3Modal}
					address={context.address}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
};

export default PresaleContainer;
