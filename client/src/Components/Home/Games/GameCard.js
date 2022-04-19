import '../../../style/Home/play_games/game_card.css';

import React, { useState, useEffect } from 'react';

import PrimaryButton from '../../UI/PrimaryButton';
import BigNumber from 'bignumber.js';

const GameCard = (props) => {
	const {
		title,
		description,
		image,
		mainColor,
		method,
		btn_title,
		link,
		btn_disabled,
	} = props;
	const [info, setInfo] = useState(null);

	const getGameInfo = async () => {
		try {
			const res = await method.call();
			setInfo(res);
		} catch (e) {
			console.log(e.message ?? e);
			return false;
		}
	};

	const numberFormating = (num) => {
		const formated = BigNumber(num).dividedBy(BigNumber(10).pow(18)).toFixed();
		return new Intl.NumberFormat('ru-RU').format(formated);
	};

	useEffect(() => {
		let isSubscribed = true;

		getGameInfo();

		return () => {
			isSubscribed = false;
		};
	}, [method]);

	return (
		<div id='games' className='game_card'>
			<div className='game_card_info'>
				<h3 className='title font24'>{title}</h3>
				<p className='title font14 game_card_info_desc'>{description}</p>
				<div className='game_card_stats'>
					<div className='game_card_stats_row'>
						<p style={{ lineHeight: 1.5 }}>
							<span className='title font18'>Prize pool</span>
						</p>
						{info ? (
							<p>
								<span className='title font18 fw700' style={{ lineHeight: 1 }}>
									{numberFormating(info.pool)}
								</span>{' '}
								<span>
									<svg
										width='30'
										height='24'
										viewBox='0 0 30 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M21.7781 10.9999C19.7781 10.5999 15.6114 13.4999 13.7781 14.9999C11.9448 13.4999 7.77811 10.5998 5.77811 10.9998C4.77811 16 9.27811 22.5 9.27811 22.5C-4.72189 13 1.27811 0 1.27811 0C7.27811 1 13.7781 9 13.7781 9C13.7781 9 20.2781 1 26.2781 0C26.2781 0 29.2781 4 27.7781 10C27.7781 10 28.7781 10 29.7781 9C29.7781 9 28.7781 17.5 19.2781 24C19.2781 24 20.7781 22.5 23.2781 15.5C23.2781 15.5 22.7781 16 21.2781 16.5C21.2781 16.5 22.2781 13.5 21.7781 10.9999Z'
											fill='white'
										/>
									</svg>
								</span>
							</p>
						) : (
							<p className='title font18 fw700'>TBA</p>
						)}
					</div>
				</div>
				{link ? (
					<a href={link} target='_blank' rel='noreferrer'>
						<PrimaryButton
							isDisabled={btn_disabled}
							title={btn_title}
							classes={'game_card_button'}
						/>
					</a>
				) : (
					<PrimaryButton
						isDisabled={btn_disabled}
						title={btn_title}
						classes={'game_card_button'}
					/>
				)}
			</div>
			<div className='game_card_back'>
				<img
					className='game_card_back_img'
					src={image}
					alt='game carg poster'
				/>
				<div
					style={{
						background: `linear-gradient(180deg, rgba(${mainColor}, 0) 0%, rgba(${mainColor}, 1) 60%)`,
						transform: 'scale(1)',
					}}
					className='game_card_back_fade'></div>
			</div>
		</div>
	);
};

export default GameCard;
