import { useEffect, useState } from 'react';
import DATA from '../../data/getData';
import Platform from './Platform';
import { contractConnect } from '../../helpers/utilities';

import tournamentsAbi from '../../data/tournamentAbi.json';
import tokenAbi from '../../data/tokenAbi.json';
import stakingAbi from '../../data/stakingAbi.json';

const PlatformContainer = (props) => {
	const { onConnect, web3Modal } = props;
	const [contractTour, setContractTour] = useState(null);
	const [contractTok, setContractTok] = useState(null);
	const [contractStaking, setContractStaking] = useState(null);

	useEffect(() => {
		reconnect();

		const slider_checkbox = document.getElementById('sidebar_checkbox');
		if (window.screen.width < 810) {
			slider_checkbox.checked = false;
		} else if (window.screen.width < 1120) {
			slider_checkbox.checked = true;
		}

		fetchBlockChainStuff();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const reconnect = async () => {
		if (window.web3 && web3Modal.cachedProvider) {
			await onConnect();
		}
	};

	const fetchBlockChainStuff = async () => {
		try {
			await setContracts();
		} catch (e) {
			console.log(e);
		}
	};

	const setContracts = async () => {
		const contractTour = await contractConnect(
			tournamentsAbi,
			DATA.tournamentsAddress
		);
		setContractTour(contractTour);

		const contractTok = await contractConnect(tokenAbi, DATA.tokenAddress);
		setContractTok(contractTok);

		const contractStak = await contractConnect(stakingAbi, DATA.stakingAddress);
		setContractStaking(contractStak);
	};

	return (
		<Platform
			contractTour={contractTour}
			contractTok={contractTok}
			contractStaking={contractStaking}
		/>
	);
};

export default PlatformContainer;
