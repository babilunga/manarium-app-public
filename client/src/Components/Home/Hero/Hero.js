import '../../../style/Home/hero/hero.css';

import { useEffect, useState, useRef } from 'react';
import Particles from 'react-tsparticles';
import options from './particlesOptions';
import { Link } from 'react-router-dom';
import LINKS from '../../../data/getData';
import Lottie from 'react-lottie';
import animationData from '../../../img/animations/crystal_animation';

import { appearanceObserve } from '../../../helpers/utilities';

import PrimaryButton from '../../UI/PrimaryButton';
import SecondaryButton from '../../UI/SecondaryButton';
import PopUpInfo from '../../UI/PopUpInfo';
import Modal from '../../UI/Modal';
import ModalLayout from '../../UI/ModalLayout';
import useMinimize from '../../Hooks/useMinimize';

function Hero(props) {
	const { setLoading } = props;
	const crystal = useRef(null);
	const [loading, setLoad] = useState(true);
	const [modal, setModal] = useState(false);
	const minimize = useMinimize(350, false);
	const show_copy = useMinimize(810, false);

	// ** Intersection Observers
	useEffect(() => {
		const sections = document.querySelectorAll('.appear_opacity');

		const options = {
			root: null,
			threshold: 0.6,
		};
		if (!loading) {
			const sections1 = document.querySelectorAll('.appear');
			const observer1 = appearanceObserve();
			sections1.forEach((section) => {
				observer1.observe(section);
			});

			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					} else {
						entry.target.classList.add('on_appearence_opacity');
						observer.unobserve(entry.target);
					}
				});
			}, options);

			sections.forEach((section) => {
				observer.observe(section);
			});
		}
	}, [loading]);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	function clickHandler(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	// ** Check Crystal Image Loading
	useEffect(() => {
		setLoad(false);
		setLoading(false);
		crystal.current.addEventListener('click', clickHandler);
		return () => crystal.current.removeEventListener('click', clickHandler);
	}, []);

	return (
		<div id='home' className='hero'>
			<Modal
				position={'top'}
				fullscreen={false}
				open={modal}
				timeout={2500}
				setState={setModal}>
				<ModalLayout text='Contract address copied' />
			</Modal>
			<div className='container content'>
				<div className='hero_content'>
					<div className='hero_main'>
						<h1 className='title font_title fw700 appear_opacity on_invisible_opacity'>
							Launch. Play. Earn.
						</h1>
						<p className='title font14 appear_opacity on_invisible_opacity'>
							Manarium is a unique blockchain gaming platform with play to earn
							games.
						</p>
						<div className='hero_controls appear on_invisible'>
							<Link to='/games' className='hero_button_link'>
								<PrimaryButton
									title={'Launch App'}
									classes={'hero_button'}
									isDisabled={false}
								/>
							</Link>
							<a
								className='hero_button_link'
								href={LINKS.telegram}
								target='_blank'
								rel='noreferrer'>
								<SecondaryButton classes={'hero_button'}>
									<p className='title font14'>
										<svg
											width='20'
											height='17'
											viewBox='0 0 20 17'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M18.9945 0.500065L18.9933 0.500089C18.7393 0.504708 18.3698 0.574464 17.3821 0.942175C16.4033 1.30653 14.8698 1.9421 12.3112 3.03377L12.3109 3.03389C10.5232 3.79531 6.94846 5.37545 1.57931 7.77481L1.57183 7.77815L1.56424 7.78125C1.14665 7.95167 0.860027 8.10804 0.681605 8.24387C0.532124 8.35767 0.503855 8.4219 0.500416 8.42921C0.49835 8.44996 0.501056 8.45337 0.510557 8.46532L0.5117 8.46676C0.53807 8.50002 0.605761 8.55892 0.759964 8.63559C0.999499 8.75467 1.31293 8.85605 1.71176 8.98506C1.84885 9.0294 1.99603 9.07701 2.15377 9.12972M18.9945 0.500065L2.15377 9.12972M18.9945 0.500065C19.0297 0.499342 19.109 0.504112 19.196 0.525558C19.2801 0.546329 19.3388 0.574689 19.3718 0.599928M18.9945 0.500065L19.3718 0.599928M2.15377 9.12972C2.15361 9.12967 2.15345 9.12962 2.15329 9.12956L1.99534 9.6039L2.1538 9.12973L2.15377 9.12972ZM19.3718 0.599928C19.4214 0.646983 19.4551 0.712992 19.4633 0.78712L19.4648 0.801041L19.4672 0.814853C19.487 0.933226 19.5125 1.22295 19.4932 1.42835L19.4931 1.4291C19.2192 4.39179 18.0231 11.6186 17.4119 14.9654L17.4119 14.9657C17.1611 16.3435 16.7268 16.4817 16.5992 16.4935L16.5977 16.4936C16.2155 16.5303 15.856 16.4071 15.4334 16.1525C15.2209 16.0244 15.0044 15.8706 14.7663 15.6971C14.7283 15.6694 14.6897 15.6412 14.6505 15.6125C14.4494 15.4655 14.2335 15.3077 14.0083 15.1564C13.202 14.6137 12.5709 14.1735 11.9431 13.7349L11.8627 13.6787C11.2615 13.2586 10.6562 12.8356 9.89976 12.3239L9.89939 12.3237C9.47168 12.0349 9.28643 11.8203 9.2141 11.6783C9.15911 11.5703 9.16062 11.4923 9.2069 11.3841C9.26708 11.2433 9.39857 11.0724 9.62188 10.8394C9.71814 10.739 9.82225 10.6362 9.93589 10.5239C9.9498 10.5101 9.96386 10.4963 9.97806 10.4822C10.1061 10.3557 10.2435 10.2189 10.3799 10.0739L10.3803 10.0735C10.4384 10.0116 10.731 9.73251 11.152 9.33117C11.6402 8.86567 12.301 8.23565 12.9684 7.58908C13.5809 6.99572 14.1914 6.39542 14.6559 5.91701C14.8874 5.67849 15.0875 5.46527 15.2347 5.29603C15.3077 5.21207 15.3735 5.13231 15.425 5.06187C15.4507 5.02683 15.4776 4.98766 15.5012 4.94698C15.5201 4.91437 15.5579 4.84614 15.5779 4.75964L15.578 4.75966L15.5797 4.7513C15.5976 4.66766 15.6047 4.54905 15.5869 4.42622C15.5695 4.30617 15.5167 4.10279 15.341 3.94321C15.1658 3.78406 14.9628 3.74902 14.821 3.74779C14.6893 3.74664 14.5696 3.77451 14.5128 3.78772L14.5096 3.78847L14.5094 3.7885L14.6227 4.27551L19.3718 0.599928Z'
												fill='#00A3FF'
												stroke='#00A3FF'
											/>
										</svg>
										Join Telegram
									</p>
								</SecondaryButton>
							</a>
						</div>
						<div className='hero_controls_wide appear on_invisible'>
							<div className='hero_button_link_wide'>
								<button className='hero_button_wide'>
									<p className='hero_button_wide_text title font20'>Contract</p>
									<PopUpInfo
										active={!show_copy}
										toggle={{ position: 'relative', offset: '' }}
										card={{
											text: 'Copy contract',
											position: 'top',
											offset: '5px',
										}}>
										<p
											id='hero_contract_button'
											className='hero_button_wide_text title font14 fw500'
											onClick={() => {
												navigator.clipboard.writeText(
													'0xc80A0A55CAF6a7bfB4Ee22f9380C4077312c4a35'
												);
												setModal(true);
											}}>
											{minimize
												? '0xc80A0A55CA......77312c4a35'
												: '0xc80A0A55CAF6a7bfB4Ee22f9380C4077312c4a35'}
											<svg
												className='hero_button_wide_text_copybtn'
												width='20'
												height='20'
												fill='#ffffff'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 30 30'>
												<path d='M 11 2 C 9.895 2 9 2.895 9 4 L 9 20 C 9 21.105 9.895 22 11 22 L 24 22 C 25.105 22 26 21.105 26 20 L 26 8.5 C 26 8.235 25.895031 7.9809687 25.707031 7.7929688 L 20.207031 2.2929688 C 20.019031 2.1049687 19.765 2 19.5 2 L 11 2 z M 19 3.9042969 L 24.095703 9 L 20 9 C 19.448 9 19 8.552 19 8 L 19 3.9042969 z M 6 7 C 4.895 7 4 7.895 4 9 L 4 25 C 4 26.105 4.895 27 6 27 L 19 27 C 20.105 27 21 26.105 21 25 L 21 24 L 11 24 C 8.794 24 7 22.206 7 20 L 7 7 L 6 7 z'></path>
											</svg>
										</p>
									</PopUpInfo>
								</button>
							</div>
						</div>
					</div>
					<div
						ref={crystal}
						className='hero_mana appear_opacity on_invisible_opacity'>
						<Lottie
							options={defaultOptions}
							height={'100%'}
							width={'100%'}
							isStopped={false}
							isPaused={false}
						/>
					</div>
					<Particles
						width={window.visualViewport.width > 810 ? '70%' : '100%'}
						height={'100%'}
						options={options}
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
							zIndex: -2,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Hero;
