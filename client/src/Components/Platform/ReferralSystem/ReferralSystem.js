import '../../../style/Platform/referral/referral.css';

import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import callStatsAPI from '../../../api/callStatsAPI';
import Header from '../Header/HeaderContainer';
import ReferralHero from './ReferralHero';
import ReferralMain from './ReferralMain';
import BackgroundLightSpot from '../../UI/BackgroundLightSpot';
import HoldToEarn from './HoldToEarn/HoldToEarn';

const ReferralSystem = (props) => {
	const { web3Account, address, onConnect, contract } = props;

	const [refString, setRefString] = useState('');
	const [referrals, setReferrals] = useState(0);
	const [earnedTournaments, setEarnedTournaments] = useState(0);
	const [earnedStacking, setEarnedStacking] = useState(0);
	const [accumulated, setAccumulated] = useState(0);

	const [dividendAvailable, setDividendAvailable] = useState(0);
	const [dividendTotal, setDividendTotal] = useState(0);

	useEffect(() => {
		if (web3Account && address) {
			getStats();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [web3Account, address, contract]);

	useEffect(() => {
		if (!address) {
			setRefString('');
			setReferrals(0);
			setEarnedTournaments(0);
			setEarnedStacking(0);
			setAccumulated(0);
			setDividendTotal(0);
			setDividendAvailable(0);
		} else if (address) {
			getRefHandle();
		}
	}, [address]);

	const getRefHandle = async () => {
		try {
			if (!address) {
				await onConnect();
				return;
			}
			const data = await getUserMongoData();
			if (!data) {
				return;
			}
			const { reflink } = data;
			const link = window.location.host;
			const refSession = link + '/games?ref=' + reflink;
			setRefString(refSession);
		} catch (error) {
			console.log(error);
		}
	};

	// ** Get user data from Monge DB
	const getUserMongoData = async () => {
		try {
			const data = await callStatsAPI(address.toLowerCase());
			if (!data) {
				console.log(`No data on ${address}`);
				return;
			}
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	// ** Get user stats from user data
	const getStats = async () => {
		try {
			const data = await getUserMongoData();
			if (!data) {
				return;
			}

			setEarnedTournaments(data.earnedTournaments);
			setEarnedStacking(data.earnedStacking);
			setAccumulated(data.accumStacking + data.accumTournaments);
			setReferrals(data.referrals);

			await getDividendStats();
		} catch (error) {
			console.log(error);
		}
	};

	const getDividendStats = async () => {
		try {
			const accounts = await web3Account.eth.getAccounts();
			const address = String(accounts[0]);

			if (contract) {
				const availableWei = await contract.methods
					.getUnpaidEarnings(address)
					.call();
				const totalWei = await contract.methods
					.getRealisedEarnings(address)
					.call();

				const available = await BigNumber(availableWei)
					.dividedBy(BigNumber(10).pow(18))
					.toFixed();
				const total = await BigNumber(totalWei)
					.dividedBy(BigNumber(10).pow(18))
					.toFixed();

				setDividendAvailable(available);
				setDividendTotal(total);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='referral'>
			<BackgroundLightSpot
				width={'100%'}
				height={'100vh'}
				maxWidth={'2500px'}
				maxHeight={'1000px'}
				top={'-45vh'}
			/>
			<Header />
			<div className='referral_content'>
				<ReferralHero
					refString={refString}
					referrals={referrals}
					games={earnedTournaments}
					stacking={earnedStacking}
					accumulated={accumulated}
				/>
				<ReferralMain games={earnedTournaments} stacking={earnedStacking} />
				<HoldToEarn
					available={dividendAvailable}
					total={dividendTotal}
					getDividendStats={getDividendStats}
					contract={contract}
					address={address}
				/>
			</div>
		</div>
	);
};

export default ReferralSystem;
