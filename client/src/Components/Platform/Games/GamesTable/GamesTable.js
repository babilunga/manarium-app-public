import '../../../../style/Platform/games/games_table.css';

import { Link } from 'react-router-dom';
import GameCard from './GameCardContainer';
import PrimaryButton from '../../../UI/PrimaryButton';
// *** IMAGES
import spiky_walls from '../../../../img/Home/PlayGames/spikywalls.png';
import tothemoon from '../../../../img/Home/PlayGames/tothemoon.png';
import inTheWoods from '../../../../img/Home/PlayGames/inTheWoods.png';

import game from '../../../../img/Platform/Games/games_table/game_preview.png';

import gameplay_spiky_mp4 from '../../../../media/gameplay_spiky.mp4';
import gameplay_spiky_webm from '../../../../media/gameplay_spiky.webm';

import gameplay_moon_mp4 from '../../../../media/gameplay_moon.mp4';
import gameplay_moon_webm from '../../../../media/gameplay_moon.webm';

import gameplay_woods_mp4 from '../../../../media/gameplay_woods.mp4';
import gameplay_woods_webm from '../../../../media/gameplay_woods.webm';
// *** DEMOS

const data = [
	{
		title: 'Spiky Walls',
		devs: 'Manarium',
		image: spiky_walls,
		color: '#747600',
		link: 'https://www.spikywalls.fun/',
		description:
			"Make the bird fly, but don't touch the spikes! Get points and avoid obstacles.",
		disabled: false,
		bud: 'HOT',
		gameplay: [gameplay_spiky_mp4, gameplay_spiky_webm],
	},
	{
		title: 'To The Moon',
		devs: 'Manarium',
		image: tothemoon,
		color: '#7E00E2',
		link: 'https://www.2themoon.fun/',
		description:
			'Launch your rocket as high into orbit as possible.Try to reach the Moon.',
		disabled: false,
		bud: 'HOT',
		gameplay: [gameplay_moon_mp4, gameplay_moon_webm],
	},
	{
		title: 'In The Woods',
		devs: 'Manarium',
		image: inTheWoods,
		color: '#490076',
		link: 'https://www.inthewoods.fun/',
		description:
			"Calm the monsters, don't let them get angry. Never go deep into the forest. ",
		disabled: false,
		bud: 'New',
		gameplay: [gameplay_woods_mp4, gameplay_woods_webm],
	},
];

function GamesTable(props) {
	const { getInfo } = props;

	return (
		<div className='games__table'>
			<div className='games__table__content'>
				{data.map((card, index) => {
					return (
						<GameCard
							key={index}
							title={card.title}
							devs={card.devs}
							image={card.image}
							color={card.color}
							description={card.description}
							disabled={card.disabled}
							method={getInfo(card.title)}
							link={card.link}
							bud={card.bud}
							gameplay={card.gameplay}
						/>
					);
				})}
				<SendYourGame />
			</div>
		</div>
	);
}

const SendYourGame = () => {
	return (
		<div
			className='platform_game_card'
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}>
			<div
				className='platform_game_card_face'
				style={{
					padding: 15,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}>
				<h3
					className='title font18'
					style={{
						marginBottom: '2%',
					}}>
					There is no game yet
				</h3>
				<p
					className='title'
					style={{
						opacity: 0.7,
						fontSize: 'clamp(10px, 1.1vw, 12px)',
						marginBottom: 15,
					}}>
					Apply and launch your game on Manarium gaming platform and earn ARI
					tokens for that.
				</p>
				<Link to={'/developers'}>
					<PrimaryButton
						isDisabled={false}
						title={'Apply your game'}
						classes={'card_info_button'}
					/>
				</Link>
			</div>
			<div
				style={{
					position: 'absolute',
					inset: '0',
					zIndex: '-1',
					transform: 'translateZ(0)',
				}}>
				<img className='game_card_back_img' src={game} alt='' />
				<div
					style={{
						background: `linear-gradient(180deg, rgba(227, 109, 0, 0) 0%, rgba(227, 109, 0, 1) 60%)`,
						transform: 'scale(1)',
					}}
					className='game_card_back_fade'></div>
			</div>
		</div>
	);
};

export default GamesTable;
