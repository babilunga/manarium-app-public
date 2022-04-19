import '../../../style/Home/play_games/play_games.css';

import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import abi from '../../../data/tournamentAbi.json';

import { Link } from 'react-router-dom';

import SecondaryButton from '../../UI/SecondaryButton';

import {
	imagesObserve,
	appearanceObserve,
	contractConnect,
} from '../../../helpers/utilities';

import spikywalls from '../../../img/Home/PlayGames/spikywalls.png';
import tothemoon from '../../../img/Home/PlayGames/tothemoon.png';
import inTheWoods from '../../../img/Home/PlayGames/inTheWoods.png';
import DATA from '../../../data/getData';

import Carousel, {
	autoplayPlugin,
	slidesToShowPlugin,
} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const CONTRACT_ADDRESS = DATA.tournamentsAddress;

function PlayGames() {
	const [methods, setMethods] = useState(null);
	const slidersInterval = 2500;
	const slidersSpeed = 1000;

	const NUMBER_OF_SLIDES = window.screen.width > 640 ? 2 : 1;

	useEffect(() => {
		// Observers
		const images = document.querySelectorAll('[data-src]');
		const imgObserver = imagesObserve();
		images.forEach((image) => {
			imgObserver.observe(image);
		});

		const sections = document.querySelectorAll('.appear');
		const observer = appearanceObserve();
		sections.forEach((section) => {
			observer.observe(section);
		});

		// Gallery and set contract
		setContract();
	}, []);

	const setContract = async () => {
		try {
			const contract = await contractConnect(abi, CONTRACT_ADDRESS);
			setMethods(contract.methods);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='play_games container content'>
			<div className='play_games_content'>
				<div className='play_games_info appear on_invisible_left'>
					<h2 className='title font_subtitle'>Play Games</h2>
					<p className='text font14'>
						Manarium is a platform designed to create opportunities for mini
						game developers. It is the place where gamers can have fun and earn
						tokens and investors can get early access to game projects.
					</p>
					<Link to='/games'>
						<SecondaryButton classes={'play_games_playnow'} isDisabled={false}>
							<p className='title font14'>
								<svg
									width='24'
									height='17'
									viewBox='0 0 24 17'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M15.2947 9.28364C15.6504 9.28364 15.9387 8.99475 15.9387 8.63838C15.9387 8.28201 15.6504 7.99311 15.2947 7.99311C14.939 7.99311 14.6507 8.28201 14.6507 8.63838C14.6507 8.99475 14.939 9.28364 15.2947 9.28364Z'
										fill='#00A3FF'
									/>
									<path
										d='M8.99173 9.28364C9.34742 9.28364 9.63576 8.99475 9.63576 8.63838C9.63576 8.28201 9.34742 7.99311 8.99173 7.99311C8.63604 7.99311 8.3477 8.28201 8.3477 8.63838C8.3477 8.99475 8.63604 9.28364 8.99173 9.28364Z'
										fill='#00A3FF'
									/>
									<path
										d='M7.56412 4.69391V5.36607C7.56412 5.40602 7.5483 5.44434 7.52013 5.47261C7.49196 5.50089 7.45375 5.51682 7.41388 5.5169H6.77849V6.15349C6.77849 6.1935 6.76263 6.23186 6.7344 6.26015C6.70617 6.28843 6.66788 6.30432 6.62795 6.30432H5.95777C5.91784 6.30432 5.87955 6.28843 5.85132 6.26015C5.82309 6.23186 5.80722 6.1935 5.80722 6.15349V5.5169H5.17144C5.15168 5.5169 5.13211 5.513 5.11385 5.50541C5.09559 5.49783 5.079 5.48672 5.06503 5.47271C5.05106 5.45871 5.03998 5.44208 5.03243 5.42378C5.02487 5.40548 5.02099 5.38587 5.021 5.36607V4.69391C5.02099 4.6741 5.02487 4.65449 5.03243 4.63619C5.03998 4.61789 5.05106 4.60127 5.06503 4.58726C5.079 4.57325 5.09559 4.56214 5.11385 4.55456C5.13211 4.54698 5.15168 4.54308 5.17144 4.54308H5.80693V3.90648C5.80693 3.86648 5.82279 3.82811 5.85102 3.79983C5.87925 3.77154 5.91754 3.75565 5.95747 3.75565H6.62765C6.66758 3.75565 6.70587 3.77154 6.7341 3.79983C6.76234 3.82811 6.7782 3.86648 6.7782 3.90648V4.54308H7.41388C7.45375 4.54316 7.49196 4.55908 7.52013 4.58736C7.5483 4.61564 7.56412 4.65395 7.56412 4.69391Z'
										fill='#00A3FF'
									/>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M20.5308 2.31944C20.8926 2.47358 21.1775 2.76412 21.3201 3.1306C21.9072 4.63927 23.4679 8.74824 23.8043 10.6397C24.219 12.9671 24.0539 14.8555 22.5316 15.7969C22.0253 16.1114 21.3786 16.077 20.9039 15.7172C20.0252 15.0498 19.0611 14.0154 18.0171 12.8513C17.4947 12.219 16.8098 11.8456 15.8338 11.8456H8.1442C7.21377 11.8456 6.4833 12.2193 5.96187 12.8513C5.91563 12.9027 5.8695 12.9541 5.82349 13.0053L5.82181 13.0072C4.85858 14.0795 3.9441 15.0975 3.12946 15.7172C2.89774 15.8936 2.61816 15.9957 2.32747 16.0099C2.03679 16.0241 1.74861 15.9499 1.50083 15.7969C0.246477 15.0218 -0.310407 12.6139 0.173095 10.6442C0.510744 9.26867 1.93311 5.17231 2.55678 3.39663C2.74152 2.87064 3.17092 2.47047 3.70756 2.31944C3.70756 2.31944 3.73483 1.41982 4.11649 1.1472C4.11649 1.1472 6.43371 0.0022116 7.52013 0.00221263C7.74227 0.00221263 8.62549 0.657117 8.81257 0.738285C8.99965 0.819452 9.20135 0.861332 9.40522 0.861338H14.8657C15.0696 0.861346 15.2713 0.819472 15.4584 0.738304C15.6455 0.657136 16.3569 0.0260592 16.7027 0.00221263C17.4931 -0.052299 19.9554 0.915863 20.228 1.20173C20.4227 1.40588 20.5308 2.31944 20.5308 2.31944ZM18.2422 4.2359C18.6559 4.2359 18.9913 3.89986 18.9913 3.48534C18.9913 3.07081 18.6559 2.73477 18.2422 2.73477C17.8285 2.73477 17.4931 3.07081 17.4931 3.48534C17.4931 3.89986 17.8285 4.2359 18.2422 4.2359ZM17.4518 5.02782C17.4518 5.44234 17.1164 5.77838 16.7027 5.77838C16.2889 5.77838 15.9535 5.44234 15.9535 5.02782C15.9535 4.61329 16.2889 4.27725 16.7027 4.27725C17.1164 4.27725 17.4518 4.61329 17.4518 5.02782ZM18.2422 7.32076C18.6559 7.32076 18.9913 6.98472 18.9913 6.57019C18.9913 6.15567 18.6559 5.81963 18.2422 5.81963C17.8285 5.81963 17.4931 6.15567 17.4931 6.57019C17.4931 6.98472 17.8285 7.32076 18.2422 7.32076ZM20.5308 5.02782C20.5308 5.44234 20.1954 5.77838 19.7816 5.77838C19.3679 5.77838 19.0325 5.44234 19.0325 5.02782C19.0325 4.61329 19.3679 4.27725 19.7816 4.27725C20.1954 4.27725 20.5308 4.61329 20.5308 5.02782ZM16.2518 9.59736C16.7804 9.06774 16.7804 8.20906 16.2518 7.67944C15.7232 7.14982 14.8662 7.14982 14.3375 7.67944C13.8089 8.20906 13.8089 9.06774 14.3375 9.59736C14.8662 10.127 15.7232 10.127 16.2518 9.59736ZM15.9387 8.63838C15.9387 8.99475 15.6504 9.28364 15.2947 9.28364C14.939 9.28364 14.6507 8.99475 14.6507 8.63838C14.6507 8.28201 14.939 7.99311 15.2947 7.99311C15.6504 7.99311 15.9387 8.28201 15.9387 8.63838ZM9.94887 7.67944C10.4775 8.20906 10.4775 9.06774 9.94887 9.59736C9.42026 10.127 8.56321 10.127 8.0346 9.59736C7.50599 9.06774 7.50599 8.20906 8.0346 7.67944C8.56321 7.14982 9.42026 7.14982 9.94887 7.67944ZM8.99173 9.28364C9.34742 9.28364 9.63576 8.99475 9.63576 8.63838C9.63576 8.28201 9.34742 7.99311 8.99173 7.99311C8.63604 7.99311 8.3477 8.28201 8.3477 8.63838C8.3477 8.99475 8.63604 9.28364 8.99173 9.28364ZM6.25109 6.93295C7.30009 6.93295 8.15048 6.08094 8.15048 5.02994C8.15048 3.97893 7.30009 3.12692 6.25109 3.12692C5.20209 3.12692 4.35171 3.97893 4.35171 5.02994C4.35171 6.08094 5.20209 6.93295 6.25109 6.93295ZM7.56412 4.69391V5.36607C7.56412 5.40602 7.5483 5.44434 7.52013 5.47261C7.49196 5.50089 7.45375 5.51682 7.41388 5.5169H6.77849V6.15349C6.77849 6.1935 6.76263 6.23186 6.7344 6.26015C6.70617 6.28843 6.66788 6.30432 6.62795 6.30432H5.95777C5.91784 6.30432 5.87955 6.28843 5.85132 6.26015C5.82309 6.23186 5.80722 6.1935 5.80722 6.15349V5.5169H5.17144C5.15168 5.5169 5.13211 5.513 5.11385 5.50541C5.09559 5.49783 5.079 5.48672 5.06503 5.47271C5.05106 5.45871 5.03998 5.44208 5.03243 5.42378C5.02487 5.40548 5.02099 5.38587 5.021 5.36607V4.69391C5.02099 4.6741 5.02487 4.65449 5.03243 4.63619C5.03998 4.61789 5.05106 4.60127 5.06503 4.58726C5.079 4.57325 5.09559 4.56214 5.11385 4.55456C5.13211 4.54698 5.15168 4.54308 5.17144 4.54308H5.80693V3.90648C5.80693 3.86648 5.82279 3.82811 5.85102 3.79983C5.87925 3.77154 5.91754 3.75565 5.95747 3.75565H6.62765C6.66758 3.75565 6.70587 3.77154 6.7341 3.79983C6.76234 3.82811 6.7782 3.86648 6.7782 3.90648V4.54308H7.41388C7.45375 4.54316 7.49196 4.55908 7.52013 4.58736C7.5483 4.61564 7.56412 4.65395 7.56412 4.69391Z'
										fill='#00A3FF'
									/>
								</svg>
								Play now
							</p>
						</SecondaryButton>
					</Link>
				</div>
				<div
					className='play_games_gallery appear on_invisible_right'
					id='gallery'>
					<div className='play_games_gallery_container'>
						{methods && (
							<Carousel
								plugins={[
									'infinite',
									'centered',
									{
										resolve: slidesToShowPlugin,
										options: {
											numberOfSlides: NUMBER_OF_SLIDES,
										},
									},
									{
										resolve: autoplayPlugin,
										options: {
											interval: slidersInterval,
										},
									},
								]}
								animationSpeed={slidersSpeed}>
								<GameCard
									title={'To The Moon'}
									description={
										'Launch your rocket as high into orbit as possible. Blast off for the stratosphere and try to reach the Moon.'
									}
									image={tothemoon}
									mainColor={'127, 0, 227'}
									method={methods.getTournamentInfo('To The Moon')}
									link={'https://www.2themoon.fun/'}
									btn_title={'Play'}
									btn_disabled={false}
								/>
								<GameCard
									title={'Spiky Walls'}
									description={
										"Make the bird fly, but don't touch the spikes! Feed the bird to get points and avoid obstacles. How far can you make it?"
									}
									image={spikywalls}
									mainColor={'0, 138, 64'}
									method={methods.getTournamentInfo('Spiky Walls')}
									link={'https://www.spikywalls.fun/'}
									btn_title={'Play'}
									btn_disabled={false}
								/>
								<GameCard
									title={'In The Woods'}
									description={
										"Calm the monsters, don't let them get angry and eat you. And remember, don't go deep into the forest ... "
									}
									image={inTheWoods}
									mainColor={'111, 54, 233'}
									method={methods.getTournamentInfo('In The Woods')}
									link={'https://www.inthewoods.fun/'}
									btn_title={'Play'}
									btn_disabled={false}
								/>
							</Carousel>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlayGames;
