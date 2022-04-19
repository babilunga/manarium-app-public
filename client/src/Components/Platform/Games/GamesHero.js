import '../../../style/Platform/games/games_hero.css';

import { ReactComponent as Chest } from '../../../img/Platform/Games/games_hero/chest.svg';
import { ReactComponent as Coin } from '../../../img/Platform/Games/games_hero/coin.svg';
import { ReactComponent as Player } from '../../../img/Platform/Games/games_hero/player.svg';
import { ReactComponent as InfoSvg } from '../../../img/svg/popup.svg';
import mana_hero from '../../../img/Platform/Games/games_hero/mana_hero.png';
import PopUpInfo from '../../UI/PopUpInfo';

function GamesHero(props) {
	const { prizePool, playersOnline, tokenPrice, tokenLastUpdate } = props;

	return (
		<div className='games__hero'>
			<div className='platform_hero_content'>
				<div className='equal_col hero_col'>
					<div className='hero_info'>
						<h2 className='title font_subtitle'>Manarium Playground</h2>
						<p className='text font14'>
							Manarium is a unique blockchain gaming platform with play to earn
							games.
						</p>
					</div>

					<div className='games__hero_stats'>
						<StatsCard
							icon={<Chest />}
							title={'Total Prize Pool'}
							stats={prizePool}
						/>
						<StatsCard
							icon={<Coin />}
							title={'ARI Price'}
							stats={tokenPrice}
							popup_trigger={true}
							popup_text={`Price last updated: 
								${
									tokenLastUpdate
									//  && new Date(Number(tokenLastUpdate) * 1000).toUTCString()
								}
							`}
						/>
						<StatsCard
							icon={<Player />}
							title={'Players On-Line'}
							stats={playersOnline}
						/>
					</div>
				</div>
				<div className='equal_col hero_col hero_col_placeholder'></div>
				<div className='hero_col_abs'>
					<img
						className='hero_image'
						src={mana_hero}
						alt='Mamarium logo in front of cristals'
					/>
				</div>
			</div>
		</div>
	);
}

function StatsCard(props) {
	const { icon, title, stats, popup_trigger, popup_text } = props;
	return (
		<div className='games__hero_stats_card'>
			{popup_trigger && (
				<PopUpInfo
					toggle={{ position: 'bottom-right', offset: '10px' }}
					card={{
						text: popup_text,
						width: 250,
						position: 'left',
						offset: '10px',
					}}>
					<InfoSvg />
				</PopUpInfo>
			)}
			{icon && <span className='games__hero_stats_card_icon'>{icon}</span>}
			<div className='games__hero_stats_card_text'>
				<span className='title font12'>{title}</span>
				{stats ? (
					<span className='title font14'>{stats}</span>
				) : (
					<div className='info_block_stats_placeholder'></div>
				)}
			</div>
		</div>
	);
}

export default GamesHero;
