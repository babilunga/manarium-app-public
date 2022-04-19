import '../../style/Presale1/hero.css';

import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import BigNumber from 'bignumber.js';

function Hero(props) {
	const { address, claim, claimDisabled, contractInstance, claimEvent } = props;

	// in UTC
	const unlockTime = [
		new Date(`January 27, 2022 17:00:00`).getTime(),
		new Date(`February 27, 2022 17:00:00`).getTime(),
		new Date(`March 27, 2022 17:00:00`).getTime(),
		new Date(`April 27, 2022 17:00:00`).getTime(),
		new Date(`May 27, 2022 17:00:00`).getTime(),
		new Date(`June 27, 2022 17:00:00`).getTime(),
		new Date(`July 27, 2022 17:00:00`).getTime(),
		new Date(`August 27, 2022 17:00:00`).getTime(),
	];

	const [claimed, setClaimed] = useState();
	const [totalTokenAmount, setTotalTokenAmount] = useState();
	const [available, setAvailable] = useState();
	const [loadingProgress, setLoadingProgress] = useState(1.8);
	const [canClaim, setCanClaim] = useState(false);

	useEffect(() => {
		const intervalId = setInterval(() => {
			calcUnlockLoading();
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (address) {
			claimButtonStateSet();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingProgress, totalTokenAmount, claimed, contractInstance]);

	// ** IF User Disconected The Wallet
	useEffect(() => {
		if (address === '') {
			setClaimed('');
			setAvailable('');
			setTotalTokenAmount('');
		}
		claimButtonStateSet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	useEffect(() => {
		switch (claimEvent) {
			case 'receipt':
				claimButtonStateSet();
				break;
			case 'confirmation':
				claimButtonStateSet();
				break;
			case 'error':
				claimButtonStateSet();
				break;

			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [claimEvent]);

	async function getInfo() {
		try {
			const data = await fetchTokens();
			if (!data) {
				return 0;
			}
			const { tokenAmount, claimedTokens } = data;

			setTotalTokenAmount(tokenAmount);
			setClaimed(claimedTokens);

			const shouldClaim = await howMuchCanClaim(tokenAmount);
			const availableForClaim = shouldClaim - claimedTokens;
			setAvailable(availableForClaim);

			return availableForClaim;
		} catch (error) {
			console.log('get info:', error);
		}
	}

	const claimButtonStateSet = async () => {
		if (address) {
			const availableForClaim = await getInfo();
			setCanClaim(availableForClaim > 0);
		}
	};

	// Ok
	async function fetchTokens() {
		try {
			if (contractInstance) {
				const tokenAmount = await contractInstance.methods
					.beneficiaryTokenAmount(address)
					.call();
				const claimedTokens = await contractInstance.methods
					.beneficiaryClaimed(address)
					.call();

				return {
					tokenAmount: await BigNumber(tokenAmount)
						.dividedBy(BigNumber(10).pow(18))
						.toNumber(),
					claimedTokens: await BigNumber(claimedTokens)
						.dividedBy(BigNumber(10).pow(18))
						.toNumber(),
				};
			}
		} catch (error) {
			console.log('fetch tokens:', error);
		}
	}

	// Ok
	const calcUnlockLoading = async () => {
		try {
			let loading = 1.8;

			const localTime = new Date().getTime();
			const localOffset = new Date().getTimezoneOffset() * 60 * 1000;
			const utcNow = localTime + localOffset;

			unlockTime.forEach((timestamp) => {
				if (utcNow >= timestamp) {
					loading += 1.025;
				}
			});

			if (loadingProgress !== loading) {
				setLoadingProgress(loading);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Ok
	const getNextUnlockDate = () => {
		try {
			const unlockCurrent = unlockTime.filter((timestamp) => {
				const lTime = new Date().getTime();
				const lOffset = new Date().getTimezoneOffset() * 60 * 1000;
				const utcNow = lTime + lOffset;
				return timestamp > utcNow;
			});

			if (unlockCurrent.length === 0) {
				return 'Vesting period finished';
			}

			return unlockCurrent[0];
		} catch (error) {
			console.log(error);
		}
	};

	const claimButtonHandle = async () => {
		try {
			if (!canClaim) {
				return;
			}
			setCanClaim(false);

			claim();
		} catch (error) {
			console.log(error);
		}
	};

	// Ok
	const howMuchCanClaim = async (amount) => {
		try {
			if (amount) {
				const nextUnlockDate = getNextUnlockDate();
				const index = unlockTime.indexOf(nextUnlockDate);
				const multiplier = await BigNumber(0.1025)
					.multipliedBy(index)
					.plus(0.18)
					.toNumber();
				const shouldClaim = await BigNumber(amount)
					.multipliedBy(multiplier)
					.toNumber();

				return shouldClaim;
			}
			return 0;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='presale_hero'>
			<div className='presale_hero_card'>
				<div className='presale_hero_card_row'>
					<div className='hero_card_row_block'>
						<div>
							<h2 className='font24 title'>Withdrawn</h2>
							<p className='font18 text'>
								{address && claimed !== undefined ? claimed : ''}
								{address && ' / '}
								{address && totalTokenAmount !== undefined
									? totalTokenAmount + ' ARI'
									: ''}
							</p>
						</div>
						<svg
							width='126'
							height='126'
							viewBox='0 0 126 126'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M66.1607 118.158C81.3021 118.158 92.5086 109.972 99.8883 99.0302C107.253 88.1098 110.867 74.3724 110.867 63.0001C110.867 51.0532 107.012 37.3119 99.5242 26.5332C92.0242 15.7365 80.8199 7.84216 66.1607 7.84216L55.7091 7.84221C30.3219 7.84221 10.0526 32.7264 10.0526 63.0001C10.0526 93.2738 30.3219 118.158 55.7091 118.158H66.1607Z'
								fill='#00A3FF'
								stroke='#1E2329'
								strokeWidth='2'
							/>
							<path
								d='M69.0111 118.158C94.3984 118.158 114.668 93.2738 114.668 63.0001C114.668 32.7263 94.3984 7.84216 69.0111 7.84216C43.6239 7.84216 23.3546 32.7263 23.3546 63.0001C23.3546 93.2738 43.6239 118.158 69.0111 118.158Z'
								fill='#00A3FF'
								stroke='#1E2329'
								strokeWidth='2'
							/>
							<path
								opacity='0.3'
								d='M40.2186 103.369C32.3351 95.1323 27.117 83.7805 25.4906 71.3283C23.8642 58.8761 25.9346 46.129 31.3344 35.3495C36.7342 24.5701 45.114 16.4557 54.9864 12.4467C64.8589 8.43769 75.5853 8.7934 85.2616 13.4507C63.425 12.4467 53.3419 20.2042 42.7281 29.9335C32.1144 39.6628 19.9059 82.1469 40.2186 103.369Z'
								fill='white'
							/>
							<path
								opacity='0.15'
								d='M97.6915 22.8127C105.575 31.049 110.793 42.4007 112.42 54.8529C114.046 67.3052 111.976 80.0523 106.576 90.8318C101.176 101.611 92.7962 109.726 82.9237 113.735C73.0513 117.744 62.3249 117.388 52.6485 112.731C74.4852 113.735 84.5683 105.977 95.182 96.2478C105.796 86.5185 118.004 44.0344 97.6915 22.8127Z'
								fill='#1E2329'
							/>
							<path
								d='M105.066 62.9999C105.066 87.2935 88.7573 106.656 69.011 106.656C49.2647 106.656 32.9556 87.2935 32.9556 62.9999C32.9556 38.7063 49.2647 19.3434 69.011 19.3434C88.7573 19.3434 105.066 38.7063 105.066 62.9999Z'
								fill='white'
								stroke='#1E2329'
								strokeWidth='2'
							/>
							<path
								d='M81.7628 64.9293C78.421 64.117 71.459 70.0061 68.3958 73.0522C65.3325 70.0061 58.3705 64.1168 55.0288 64.9291C53.3579 75.0832 60.8768 88.2829 60.8768 88.2829C37.4846 68.991 47.5098 42.5914 47.5098 42.5914C57.5351 44.6222 68.3958 60.868 68.3958 60.868C68.3958 60.868 79.2565 44.6222 89.2817 42.5914C89.2817 42.5914 94.2943 50.7144 91.788 62.8988C91.788 62.8988 93.4589 62.8988 95.1298 60.868C95.1298 60.868 91.788 81.4655 77.5856 91.329C77.5856 91.329 83.1693 79.1446 84.2691 74.0678C84.2691 74.0678 83.4337 75.0832 80.9273 76.0985C80.9273 76.0985 82.5982 70.0063 81.7628 64.9293Z'
								fill='#00A3FF'
							/>
						</svg>
					</div>
					<div className='hero_card_row_block'>
						<div>
							<h2 className='font24 title'>Available to Withdraw</h2>
							<p className='font18 text'>
								{address && available ? available + ' ARI' : ''}
							</p>
						</div>

						<button
							className={`presale_card_button font14`}
							onClick={claimButtonHandle}
							disabled={claimDisabled() || !canClaim}>
							Claim
						</button>
						{unlockTime.length > 0 && (
							<p
								className={`font12 presale_card_next_unlock ${
									address ? 'title' : 'text'
								}`}>
								Next unlock:{' '}
								{`${new Date(getNextUnlockDate()).toLocaleString()} UTC`}
							</p>
						)}
					</div>
				</div>
				<div className='presale_hero_card_row'>
					<div className='presale_hero_card_bg'></div>
					<div className='presale_hero_vesting'>
						<div className='presale_hero_vasting_row'>
							<p className='font14 title'>Vesting Start</p>
							<p className='font14 title'>Vesting End</p>
						</div>
						<div className='presale_hero_vasting_row'>
							{loadingProgress ? (
								<div
									className={`presale_vesting_loading ${css`
										&::after {
											content: '';
											position: absolute;
											top: 0;
											left: -6px;
											width: 14px;
											height: 14px;
											border-radius: 200px;
											background-color: rgb(60, 184, 255);
											transform-origin: left;
											animation: calc(
													${loadingProgress / (2 + loadingProgress * 0.05)}s
												)
												linear 1s infinite running loading_vesting_bar;
										}
									`}`}
									style={{
										width: `calc(${loadingProgress * 10}% + (14px))`,
									}}></div>
							) : null}
							<div className='presale_vesting_line'></div>
							<div className='presale_vesting_circles'>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
						<div className='presale_hero_vasting_row'>
							<ul className='presale_vesting_numbers'>
								<li className='title font14 fw500'>0%</li>
								<li className='title font14 fw500'>18%</li>
								<li className='title font14 fw500'>28.25%</li>
								<li className='title font14 fw500'>38.5%</li>
								<li className='title font14 fw500'>48.75%</li>
								<li className='title font14 fw500'>59%</li>
								<li className='title font14 fw500'>69.25%</li>
								<li className='title font14 fw500'>79.5%</li>
								<li className='title font14 fw500'>89.75%</li>
								<li className='title font14 fw500'>100%</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
