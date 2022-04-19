/* eslint-disable react-hooks/exhaustive-deps */
import '../../style/Nft/nft_main.css';

import NftCountdown from './NftCountdown';
import PrimaryButton from '../UI/PrimaryButton';
import minerCard_gif from '../../img/Nft/miner_card2.gif';
import Lottie from 'react-lottie';

import saleAbi from '../../data/nftSaleAbi.json';
import tokenAbi from '../../data/tokenAbi.json';

import { useEffect, useState } from 'react';
import { AppContext } from '../App';
import Modal from '../UI/Modal';
import ModalLayout from '../UI/ModalLayout';
import ModalMintNft from './ModalMintNft';
import DATA from '../../data/getData';
import animData from '../../img/animations/loadingButton';
import { contractConnect } from '../../helpers/utilities';

function NftMain(props) {
	const { address, onConnect, web3Modal } = props;

	const animOptions = {
		loop: true,
		autoplay: true,
		animationData: animData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	// const NFT_ADDR = DATA.nftAddress;
	// const [nftContract, setNftContract] = useState(null);

	const TOKEN_ADDR = DATA.tokenAddress;
	const [tokenC, setTokenContract] = useState(null);

	const SALE_ADDR = DATA.nftSaleAddress;
	const [nftSaleC, setNftSaleContract] = useState(null);

	const [allowance, setAllowance] = useState(0);
	const [tokensPerMint, setTokensPerMint] = useState(0);
	const [mintedAmount, setMintedAmount] = useState(0);

	const [isPaused, setPaused] = useState(true);
	const [isFinished, setIsFinished] = useState(false);
	const [isWlEnabled, setWlEnabled] = useState(true);
	const [isWhitelisted, setWhitelisted] = useState(false);
	const [mintByTokens, setMintByTokens] = useState(true);
	const [mintNfts, setMintNfts] = useState(0);

	const [isMintBtnPressed, setMintBtnPressed] = useState(false);
	const [mintAvailable, setMintAvailable] = useState(false);

	const [isApproveBtnPressed, setApproveBtnPressed] = useState(false);

	const [modalApprove, setModalApprove] = useState(false);
	const [modalError, setModalError] = useState({
		open: false,
		reason: '',
	});
	const [modalMintState, setModalMintState] = useState({
		open: false,
		hash: '',
	});

	useEffect(() => {
		reconnect();
		setContract();
	}, []);
	useEffect(() => {
		saleFinishedHandle();
	}, [isPaused, mintedAmount]);
	useEffect(() => {
		fetchTokenData();
	}, [tokenC, address]);

	useEffect(() => {
		fetchNftSaleData();
	}, [nftSaleC, address]);

	async function setContract() {
		try {
			// const nftAbi = await import('../../data/nftAbi.json');
			// const contractNft = await contractConnect(nftAbi, NFT_ADDR);
			// setNftContract(contractNft);

			const contractNftSale = await contractConnect(saleAbi, SALE_ADDR);
			setNftSaleContract(contractNftSale);

			const contractToken = await contractConnect(tokenAbi, TOKEN_ADDR);
			setTokenContract(contractToken);
		} catch (e) {
			console.log(e.message);
		}
	}

	async function fetchTokenData() {
		try {
			if (!tokenC) return;
			if (address === '' || address === undefined) return;

			tokenC.methods
				.allowance(address, SALE_ADDR)
				.call()
				.then(setAllowance)
				.catch(console.log);
		} catch (error) {
			console.log(error.message);
		}
	}

	async function fetchNftSaleData() {
		try {
			if (!nftSaleC) return;
			nftSaleC.methods
				.mintedAmount()
				.call()
				.then(setMintNfts)
				.catch(console.log);

			nftSaleC.methods.paused().call().then(setPaused).catch(console.log);
			nftSaleC.methods
				.mintedAmount()
				.call()
				.then(setMintedAmount)
				.catch(console.log);
			nftSaleC.methods
				.mintByTokensEnabled()
				.call()
				.then(setMintByTokens)
				.catch(console.log);
			nftSaleC.methods
				.tokensPerMint()
				.call()
				.then(setTokensPerMint)
				.catch(console.log);
			nftSaleC.methods
				.whiteListEnabled()
				.call()
				.then(setWlEnabled)
				.catch(console.log);

			if (!address) return;

			nftSaleC.methods
				.isWhitelisted(address)
				.call()
				.then(setWhitelisted)
				.catch(console.log);
			nftSaleC.methods
				.mintAvailable(address)
				.call()
				.then(setMintAvailable)
				.catch(console.log);
		} catch (error) {
			console.log(error.message);
		}
	}

	async function approve() {
		try {
			if (!tokenC) return;
			if (!address) return;

			setApproveBtnPressed(true);
			const amount =
				'115792089237316195423570985008687907853269984665640564039457584007913129639935';
			const encoded = tokenC.methods.approve(SALE_ADDR, amount).encodeABI();
			if (window.web3) {
				window.web3.eth
					.sendTransaction({
						from: address,
						to: TOKEN_ADDR,
						gas: '200000',
						data: encoded,
					})
					.on('receipt', async (receipt) => {
						console.log('Transaction receipt:', receipt);
						await fetchTokenData();
						setModalApprove(true);
						setApproveBtnPressed(false);
					})
					.on('confirmation', function (confNum, receipt) {
						setApproveBtnPressed(false);
					})
					.on('error', (error) => {
						console.log('Transaction error:', error);
						setModalError((prev) => ({ reason: error.message, open: true }));
						setApproveBtnPressed(false);
					});
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	async function mint() {
		try {
			if (!nftSaleC) return;
			if (!address) return;
			const balance = Number(await tokenC.methods.balanceOf(address).call());
			const tokensNeed = Number(tokensPerMint);
			if (balance < tokensNeed) {
				setModalError((prev) => ({
					reason: 'not enough balance to approve',
					open: true,
				}));
				return;
			}

			setMintBtnPressed(true);
			const encoded = nftSaleC.methods.presaleMint().encodeABI();
			if (window.web3) {
				window.web3.eth
					.sendTransaction({
						from: address,
						to: SALE_ADDR,
						gas: '500000',
						data: encoded,
					})
					.on('receipt', async (receipt) => {
						console.log('Transaction receipt:', receipt);
						await fetchTokenData();
						await fetchNftSaleData();
						setModalMintState({
							open: true,
							hash: receipt?.transactionHash,
						});
						setMintBtnPressed(false);
					})
					.on('confirmation', function (confNum, receipt) {
						setMintBtnPressed(false);
					})
					.on('error', (error) => {
						console.log('Transaction error:', error);
						setModalError((prev) => ({ reason: error.message, open: true }));
						setMintBtnPressed(false);
					});
			}
		} catch (error) {
			console.log(error.message);
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

	const showApproveButton =
		mintByTokens &&
		allowance &&
		tokensPerMint &&
		Number(allowance) < Number(tokensPerMint);

	function saleFinishedHandle() {
		try {
			if (Number(mintedAmount) > 0 && isPaused) {
				setIsFinished(true);
			} else {
				setIsFinished(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div className='nft_main'>
			<Modal
				position={'top'}
				fullscreen={false}
				open={modalApprove}
				timeout={4000}
				setState={setModalApprove}>
				<ModalLayout text='Approved successfuly' />
			</Modal>
			<Modal
				position={'top'}
				fullscreen={false}
				open={modalMintState.open}
				timeout={8000}
				setState={() =>
					setModalMintState((prev) => ({ ...prev, open: false }))
				}>
				<ModalMintNft hash={modalMintState.hash} />
			</Modal>
			<Modal
				position={'top'}
				fullscreen={false}
				open={modalError.open}
				timeout={4000}
				setState={() => setModalError((prev) => ({ ...prev, open: false }))}>
				<ModalLayout text={`Error caused by: ${modalError.reason}`} />
			</Modal>
			<div className='nft_main_content'>
				{isFinished ? (
					<p
						className='font32 title baloo_font'
						style={{
							marginBottom: 100,
							marginTop: 45,
							textAlign: 'center',
							padding: '0px 20px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						NFT sale has ended
					</p>
				) : isPaused ? (
					<NftCountdown />
				) : (
					<p
						className='font32 title baloo_font'
						style={{
							marginBottom: 100,
							marginTop: 45,
							textAlign: 'center',
							padding: '0px 20px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						Sale started
					</p>
				)}
				<div className='nft_main_card'>
					<img src={minerCard_gif} alt='' />
					{!isPaused && mintNfts && (
						<p className='textcenter baloo_font nft_main_minted title font24'>
							NFT minted:{' '}
							<span className='baloo_font title font24'>
								{Number(mintNfts) + 35}/333
							</span>
						</p>
					)}
				</div>
				{!address ? (
					<PrimaryButton
						onClickFunction={onConnect}
						classes={'nft_main_approve_btn'}
						titleClasses={'baloo_font'}
						title={'Connect'}
					/>
				) : showApproveButton ? (
					<PrimaryButton
						isDisabled={isApproveBtnPressed}
						onClickFunction={approve}
						classes={'nft_main_approve_btn'}
						titleClasses={'baloo_font'}
						title={
							isApproveBtnPressed ? (
								<Lottie
									options={animOptions}
									height={'45%'}
									width={'45%'}
									isStopped={false}
									isPaused={false}
								/>
							) : (
								'Approve'
							)
						}
					/>
				) : (
					<PrimaryButton
						isDisabled={!mintAvailable || isMintBtnPressed}
						onClickFunction={address ? mint : onConnect}
						classes={'nft_main_approve_btn'}
						titleClasses={'baloo_font'}
						title={
							isMintBtnPressed ? (
								<Lottie
									options={animOptions}
									height={'45%'}
									width={'45%'}
									isStopped={false}
									isPaused={false}
								/>
							) : (
								'Mint'
							)
						}
					/>
				)}
				{isWlEnabled ? (
					<p className='textcenter baloo_font nft_main_whitelisted title font14'>
						{isFinished || !address
							? ''
							: isWhitelisted
							? 'You are Whitelisted'
							: 'You are not Whitelisted'}
					</p>
				) : (
					<p className='textcenter baloo_font nft_main_whitelisted title font14'>
						{!address
							? 'Connect your wallet to approve or mint'
							: !isPaused
							? 'Whitelist turned off'
							: ''}
					</p>
				)}
			</div>
		</div>
	);
}

const NftMainContainer = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => (
				<NftMain
					address={context.address}
					onConnect={context.onConnect}
					web3Account={context.web3Account}
					web3Modal={context.web3Modal}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
};

export default NftMainContainer;
