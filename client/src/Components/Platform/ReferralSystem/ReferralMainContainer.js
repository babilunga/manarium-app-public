// import { useEffect, useState } from 'react';
// import DATA from '../../data/getData';
import ReferralMain from './ReferralMain';

function ReferralMainContainer(props) {
	// const { dividendAvailable, tokenContract, getDividendStats } = props;

	// const { dividendAvailable, tokenContract, getDividendStats } = props;
	// const [claimBtnDisadled, setClaimBtnDisadled] = useState(
	// 	dividendAvailable <= 0
	// );
	// useEffect(() => {
	// 	if (dividendAvailable > 0) {
	// 		setClaimBtnDisadled(false);
	// 	}
	// }, [dividendAvailable]);

	// const claim = async () => {
	// 	try {
	// 		if (!claimBtnDisadled) {
	// 			setClaimBtnDisadled(true);
	// 			const encoded = tokenContract.methods.claimDividend().encodeABI();
	// 			if (window.web3) {
	// 				const accounts = await window.web3.eth.getAccounts();
	// 				const address = String(accounts[0]);

	// 				window.web3.eth
	// 					.sendTransaction({
	// 						from: address,
	// 						to: DATA.tokenAddress,
	// 						gas: '200000',
	// 						data: encoded,
	// 					})
	// 					.on('receipt', (receipt) => {
	// 						setClaimBtnDisadled(true);
	// 						getDividendStats();
	// 					})
	// 					.on('confirmation', function (confirmationNumber, receipt) {
	// 						setClaimBtnDisadled(false);
	// 					})
	// 					.on('error', (error) => {
	// 						console.log('Transaction error:', error);
	// 						setClaimBtnDisadled(false);
	// 						getDividendStats();
	// 					});
	// 			}
	// 		}
	// 	} catch (e) {
	// 		console.log(e.message ?? e);
	// 	}
	// };

	return <ReferralMain {...props} />;
}

export default ReferralMainContainer;
