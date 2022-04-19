import '../../../../style/Platform/games/game_card.css';

import { useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import SecondaryButton from '../../../UI/SecondaryButton';
import { ReactComponent as Random } from '../../../../img/svg/rand.svg';
import PopUpInfo from '../../../UI/PopUpInfo';
import { walletFormating } from '../../../../helpers/utilities';
import { AppContext } from '../../../App';

function GameCard(props) {
	const {
		bud,
		budColor,
		title,
		devs,
		color,
		image,
		link,
		disabled,
		description,
		gameInfo,
		prevWinners,
		winnersPlaceholder,
		numberFormating,
		gameplay,
		address,
	} = props;

	const [cardInfoState, setCardInfoState] = useState('about'); // about / winners
	const [cardActive, setCardActive] = useState(false);
	const video = useRef(null);
	let id = useRef(false);

	useEffect(() => () => clearTimeout(id.current), []);

	return (
		<div
			className='platform_game_card'
			onMouseEnter={() => {
				clearTimeout(id.current);
				setCardActive(true);
				const playPromise = video.current.play();
				playPromise.catch((e) => console.log(e.message));
			}}
			onMouseLeave={() => {
				setCardActive(false);
				setCardInfoState('about');
				video.current.pause();
				id.current = setTimeout(() => {
					video.current.load();
				}, 1000);
			}}>
			<div
				className={`platform_game_card_bud ${
					cardActive && 'platform_game_card_bud_close'
				} font14 title`}
				style={{
					backgroundColor: budColor,
				}}>
				{bud || 'hello'}
			</div>

			{/* FACE */}
			<div className='platform_game_card_face'>
				<div
					className={`gameplay ${cardActive ? 'gameplay-active' : ''}`}
					style={{
						position: 'absolute',
						top: 0,
						left: '50%',
						width: '110%',
						height: 'auto',
						zIndex: -1,
					}}>
					<video
						ref={video}
						width='100%'
						height='auto'
						muted
						loop
						autoPlay
						playsInline
						preload='auto'>
						{gameplay[1] && <source src={gameplay[1]} type='video/webm' />}
						{gameplay[0] && <source src={gameplay[0]} type='video/mp4' />}
					</video>
				</div>
				<CSSTransition
					in={cardActive}
					unmountOnExit
					timeout={300}
					classNames={'subtitle'}>
					<h3 className='platform_game_card_subtitle title'>{title}</h3>
				</CSSTransition>

				<CSSTransition
					in={!cardActive}
					unmountOnExit
					timeout={200}
					classNames={'title_text'}>
					<div className='platform_game_card_text'>
						<h3 className='platform_game_card_title title font32'>{title}</h3>
						<p className='platform_game_card_title font14 title'>by {devs}</p>
					</div>
				</CSSTransition>
				<div
					className='game_card_bg_image'
					style={{
						background: `linear-gradient(0deg, ${color} 20%, rgba(0, 0, 0, 0) 65%)`,
					}}>
					<img src={image} alt='' />
				</div>
				<CSSTransition
					in={cardActive}
					unmountOnExit
					timeout={200}
					classNames={'info_menu'}>
					<div className='platform_game_card_info'>
						<div id='game_card_info_about_label'>
							<svg
								style={{ top: 3, left: cardInfoState === 'about' ? -12 : 90 }}
								width='144'
								height='38'
								viewBox='0 0 122 38'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M0 19C0 8.50659 8.50659 0 19 0H83C93.4934 0 102 8.50659 102 19C102 19 102 38 122 38H-20C0 38 0 19 0 19Z'
									fill='#00A3FF'
								/>
							</svg>
							<span
								onClick={() => setCardInfoState('about')}
								className='title font14'>
								About
							</span>
						</div>
						<div id='game_card_info_winners_label'>
							<span
								onClick={() => setCardInfoState('winners')}
								className='title font14'>
								Winners
							</span>
						</div>
						<CSSTransition
							in={cardInfoState === 'about'}
							unmountOnExit
							timeout={200}
							classNames={'about_menu'}>
							<div className={`card_info`}>
								<p
									className='title'
									style={{
										opacity: 0.8,
										fontSize: 'clamp(10px, 1.1vw, 12px)',
									}}>
									{description}
								</p>
								<div className='platform_game_card_stats'>
									{gameInfo.pool && (
										<div
											className='platform_game_card_stats_row'
											style={{ marginTop: 0 }}>
											<div>
												<span className='title font14'>Prize pool</span>
											</div>
											<div>
												<span
													className='title font14 fw700'
													style={{ lineHeight: 1 }}>
													{numberFormating(gameInfo.pool)}
												</span>{' '}
												<span>
													<svg
														width='20'
														height='14'
														viewBox='0 0 30 24'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'>
														<path
															d='M21.7781 10.9999C19.7781 10.5999 15.6114 13.4999 13.7781 14.9999C11.9448 13.4999 7.77811 10.5998 5.77811 10.9998C4.77811 16 9.27811 22.5 9.27811 22.5C-4.72189 13 1.27811 0 1.27811 0C7.27811 1 13.7781 9 13.7781 9C13.7781 9 20.2781 1 26.2781 0C26.2781 0 29.2781 4 27.7781 10C27.7781 10 28.7781 10 29.7781 9C29.7781 9 28.7781 17.5 19.2781 24C19.2781 24 20.7781 22.5 23.2781 15.5C23.2781 15.5 22.7781 16 21.2781 16.5C21.2781 16.5 22.2781 13.5 21.7781 10.9999Z'
															fill='white'
														/>
													</svg>
												</span>
											</div>
										</div>
									)}
									{gameInfo.countPlayers && (
										<div className='platform_game_card_stats_row'>
											<div>
												<span className='title font14'>Now playing</span>
											</div>
											<div>
												<span
													className='title font14 fw700'
													style={{ lineHeight: 1 }}>
													{gameInfo.countPlayers}
												</span>
											</div>
										</div>
									)}
								</div>
								{link ? (
									<a
										className='card_info_link'
										href={link}
										target='_blank'
										rel='noreferrer'>
										<SecondaryButton
											classes={'card_info_button'}
											isDisabled={disabled}>
											<span className='title font14'>Play</span>
											<span>
												<svg
													width='20'
													height='14'
													viewBox='0 0 30 24'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'>
													<path
														d='M21.7781 10.9999C19.7781 10.5999 15.6114 13.4999 13.7781 14.9999C11.9448 13.4999 7.77811 10.5998 5.77811 10.9998C4.77811 16 9.27811 22.5 9.27811 22.5C-4.72189 13 1.27811 0 1.27811 0C7.27811 1 13.7781 9 13.7781 9C13.7781 9 20.2781 1 26.2781 0C26.2781 0 29.2781 4 27.7781 10C27.7781 10 28.7781 10 29.7781 9C29.7781 9 28.7781 17.5 19.2781 24C19.2781 24 20.7781 22.5 23.2781 15.5C23.2781 15.5 22.7781 16 21.2781 16.5C21.2781 16.5 22.2781 13.5 21.7781 10.9999Z'
														fill='#00A3FF'
													/>
												</svg>
											</span>
										</SecondaryButton>
									</a>
								) : (
									<p classes={'card_info_link'}>
										<SecondaryButton
											classes={'card_info_button'}
											isDisabled={disabled}>
											<span className='title font14'>Play</span>
											<span>
												<svg
													width='30'
													height='24'
													viewBox='0 0 30 24'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'>
													<path
														d='M21.7781 10.9999C19.7781 10.5999 15.6114 13.4999 13.7781 14.9999C11.9448 13.4999 7.77811 10.5998 5.77811 10.9998C4.77811 16 9.27811 22.5 9.27811 22.5C-4.72189 13 1.27811 0 1.27811 0C7.27811 1 13.7781 9 13.7781 9C13.7781 9 20.2781 1 26.2781 0C26.2781 0 29.2781 4 27.7781 10C27.7781 10 28.7781 10 29.7781 9C29.7781 9 28.7781 17.5 19.2781 24C19.2781 24 20.7781 22.5 23.2781 15.5C23.2781 15.5 22.7781 16 21.2781 16.5C21.2781 16.5 22.2781 13.5 21.7781 10.9999Z'
														fill='#00A3FF'
													/>
												</svg>
											</span>
										</SecondaryButton>
									</p>
								)}
							</div>
						</CSSTransition>
						<CSSTransition
							in={cardInfoState === 'winners'}
							unmountOnExit
							timeout={100}
							classNames={'winners_menu'}>
							<div className={`card_info card_info_winners`}>
								<p
									className='title font12'
									style={{
										textAlign: 'center',
										marginBottom: 0,
										opacity: 0.75,
									}}>
									Previous day winners
								</p>
								{prevWinners
									.filter((i) => i[1] === address)
									.map((item, index) => {
										const rand =
											prevWinners.indexOf(
												prevWinners.filter((i) => i[1] === address)[0]
											) + 1;
										return (
											<PopUpInfo
												active={true}
												toggle={{ position: 'relative', width: '100%' }}
												card={{
													text: `Your score ${
														rand >= 11 ? '. Random reward' : ''
													}`,
													position: 'bottom',
													offset: '0',
												}}>
												<div
													key={index}
													className={`card_info_winners_row card_info_winners_row_self`}>
													<PopUpInfo
														active={false}
														toggle={{ position: 'relative', offset: '' }}
														card={{
															text: '',
															position: 'right',
															offset: '0px',
														}}>
														<div className='winners_place' id={`winners_self`}>
															<span className='font14 title'>
																{rand >= 11 ? <Random /> : rand}
															</span>
														</div>
													</PopUpInfo>
													<span className='font12 text'>
														{walletFormating({ wallet: item[1], start: 5 })}
													</span>
													<span className='font14 title winners_score'>
														{item[0]}
													</span>
												</div>
											</PopUpInfo>
										);
									})}
								{prevWinners.map((item, index) => {
									const rand = index + 1 > 10;
									return (
										<div key={index} className='card_info_winners_row'>
											<PopUpInfo
												active={rand}
												toggle={{ position: 'relative', offset: '' }}
												card={{
													text: 'Random reward',
													position: 'top-left',
													offset: '5px',
												}}>
												<div
													className='winners_place'
													id={`winners_place_${index + 1}`}>
													<span className='font14 title'>
														{rand ? <Random /> : index + 1}
													</span>
												</div>
											</PopUpInfo>
											<span className='font12 text'>
												{walletFormating({ wallet: item[1], start: 5 })}
											</span>
											<span className='font14 title winners_score'>
												{item[0]}
											</span>
										</div>
									);
								})}
								{prevWinners.length === 0 && (
									<p
										className='title font14 fw500'
										style={{
											textAlign: 'center',
											marginTop: 20,
											marginBottom: 'auto',
											opacity: 0.5,
										}}>
										List is empty for now...
									</p>
								)}
								{winnersPlaceholder && (
									<div>
										<div className='card_info_winners_row row_placeholder'></div>
										<div className='card_info_winners_row row_placeholder'></div>
									</div>
								)}
							</div>
						</CSSTransition>
					</div>
				</CSSTransition>
			</div>
		</div>
	);
}

const GameCardComponent = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => <GameCard address={context.address} {...props} />}
		</AppContext.Consumer>
	);
};

export default GameCardComponent;
