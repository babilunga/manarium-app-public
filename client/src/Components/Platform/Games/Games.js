import '../../../style/Platform/games/games.css';

import BackgroundLightSpot from '../../UI/BackgroundLightSpot';
import HeaderContainer from '../Header/HeaderContainer';
import GamesHero from './GamesHeroContainer';
import GamesTable from './GamesTable/GamesTable';

function Games(props) {
	const { contract } = props;

	return (
		<div className='platform_games'>
			<BackgroundLightSpot
				width={'120%'}
				height={'70vh'}
				maxWidth={'1800px'}
				maxHeight={'800px'}
				top={'-30vh'}
			/>
			<HeaderContainer />
			<GamesHero
				getTotalRewards={contract.methods.getTotalRewards}
				getTotalPlayers={contract.methods.getTotalPlayers}
			/>
			<GamesTable getInfo={contract.methods.getTournamentInfo} />
		</div>
	);
}

export default Games;
