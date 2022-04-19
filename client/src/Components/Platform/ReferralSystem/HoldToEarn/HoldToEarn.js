import '../../../../style/Platform/referral/ref_hold.css';

import { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../../img/animations/loadingButton';
import success from '../../../../audio/success.mp3';
import hold from '../../../../img/Platform/Referral/hold_to_earn.png';
import DATA from '../../../../data/getData';

import PrimaryButton from '../../../UI/PrimaryButton';
import PopUpInfo from '../../../UI/PopUpInfo';
import Modal from '../../../UI/Modal';
import ConnectOccluder from './ConnectOccluder';
import ClaimedModal from './ClaimedModal';
import ModalLayout from '../../../UI/ModalLayout';

function HoldToEarn({ available, total, getDividendStats, contract, address }) {
	const [claimEnabled, setClaimEnabled] = useState(available > 0);
	const [buttonPressed, setButtonPressed] = useState(false);
	const [modalClaimState, setModalClaimState] = useState({
		open: false,
		amount: 0,
		hash: '',
	});
	const [errorClaimState, setErrorClaimState] = useState({
		open: false,
		text: '',
	});
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	const audio = useRef(null);

	useEffect(() => {
		audio.current.volume = 0.3;
		audio.current.loop = false;
		return () => {
			audio.current.volume = 0.3;
		};
	}, []);

	useEffect(() => {
		if (available > 0) {
			setClaimEnabled(true);
		} else {
			setClaimEnabled(false);
		}
	}, [available]);

	const claim = async () => {
		try {
			if (claimEnabled) {
				setButtonPressed(true);
				setClaimEnabled(false);
				const encoded = contract.methods.claimDividend().encodeABI();
				if (window.web3) {
					const accounts = await window.web3.eth.getAccounts();
					const address = String(accounts[0]);
					setModalClaimState((prev) => ({ ...prev, amount: available }));

					window.web3.eth
						.sendTransaction({
							from: address,
							to: DATA.tokenAddress,
							gas: '200000',
							data: encoded,
						})
						.on('receipt', (receipt) => {
							getDividendStats();
							audio.current.play();
							setModalClaimState((prev) => ({
								...prev,
								hash: receipt?.transactionHash ?? '',
								open: true,
							}));
							setButtonPressed(false);
							getDividendStats();
						})
						.on('confirmation', function (confirmation_number, receipt) {
							window.web3.eth.clearSubscriptions();
							setButtonPressed(false);
						})
						.on('error', (error) => {
							// console.log('Transaction error:', error.message);
							setErrorClaimState({ open: true, text: error.message });
							setClaimEnabled(true);
							getDividendStats();
							setButtonPressed(false);
						});
				}
			}
		} catch (e) {
			console.log(e.message ?? e);
		}
	};

	return (
		<div className='ref_hold'>
			<Modal
				position={'center'}
				fullscreen={true}
				blured={true}
				open={modalClaimState.open}>
				<ClaimedModal
					setState={setModalClaimState}
					number={modalClaimState.amount}
					hash={modalClaimState.hash}
				/>
			</Modal>
			<Modal
				position={'top'}
				fullscreen={false}
				open={errorClaimState.open}
				timeout={3000}
				setState={() =>
					setErrorClaimState((prev) => ({ ...prev, open: false }))
				}>
				<ModalLayout text={errorClaimState.text} type={'warning'} />
			</Modal>
			<audio ref={audio} volume=''>
				<source src={success} />
			</audio>
			<div className='ref_hold_content'>
				<div className='equal_col ref_hold_equal_col'>
					<img className='ref_hold_image' src={hold} alt='hold to earn' />
					<div className=''>
						<h3 className='title font32'>Hold to Earn</h3>
						<p className='text font14'>
							More ARI token on your wallet - more USDT you will have. 0.5% of
							each transaction is distributed among the ARI holders. Claim any
							time.
						</p>
					</div>
				</div>
				<div className='equal_col ref_hold_equal_col'>
					<div className='ref_hold_claim_field'>
						<div className='equal_col ref_hold_claim_field_col'>
							<div className='title font14'>Available</div>
							<PopUpInfo
								toggle={{ position: 'relative', offset: '' }}
								card={{
									text: `${available} USDT`,
									position: 'top',
									offset: '5px',
								}}>
								<p className='font24 title' style={{ cursor: 'default' }}>
									{Number(available).toFixed(4)} USDT
								</p>
							</PopUpInfo>
							<PrimaryButton
								isDisabled={
									!(address !== '' && address !== undefined) || !claimEnabled
								}
								title={
									buttonPressed ? (
										<Lottie
											options={defaultOptions}
											height={'25%'}
											width={'25%'}
											isStopped={false}
											isPaused={false}
										/>
									) : (
										'Claim'
									)
								}
								classes={'ref_hold_claim_button'}
								onClickFunction={claim}
							/>
						</div>
						<div className='equal_col ref_hold_claim_field_col'>
							<div className='title font14'>Total Earned</div>
							<PopUpInfo
								toggle={{ position: 'relative', offset: '' }}
								card={{
									text: `${total} USDT`,
									position: 'top',
									offset: '5px',
								}}>
								<p
									className='font24'
									style={{ color: '#34FFB6', cursor: 'default' }}>
									{Number(total).toFixed(4)} USDT
								</p>
							</PopUpInfo>
						</div>
					</div>
					<ConnectOccluder />
				</div>
			</div>
		</div>
	);
}

export default HoldToEarn;
