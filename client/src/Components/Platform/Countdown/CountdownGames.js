import '../../../style/Platform/games/gamesCountdown.css';

import CountdownHOC from '../../UI/CountdownHOC';
import useMinimize from '../../Hooks/useMinimize';
import { ReactComponent as Cup } from '../../../img/svg/cup.svg';
import PopUpInfo from '../../UI/PopUpInfo';

function CountdownGames(props) {
	const { timeExpired, hours, minutes, seconds } = props;
	const minimize = useMinimize(1020, false);

	return (
		<div className='countdown_games'>
			<div className='countdown_games_content'>
				<PopUpInfo
					active={minimize}
					toggle={{ position: 'relative', offset: '' }}
					card={{
						text: timeExpired
							? 'Tournament day starts in 19:00 UTC'
							: `Tournament day ends in: ${
									hours + ' : ' + minutes + ' : ' + seconds
							  }`,
						position: 'bottom-left',
						offset: '20px',
					}}>
					<Cup />
				</PopUpInfo>
				{!timeExpired ? (
					<p className='title countdown_games_content_text'>
						<span className='font14 countdown_games_clock_title'>
							Tournament day ends in:
						</span>
						<span className='countdown_games_clock_face'>
							<span className='font14'>{hours}</span>
							<span className='font14'>:</span>
							<span className='font14'>{minutes}</span>
							<span className='font14'>:</span>
							<span className='font14'>{seconds}</span>
						</span>
					</p>
				) : (
					<p className='title countdown_games_content_text'>
						<span className='font14'>Tournament day starts in 19:00 UTC</span>
					</p>
				)}
			</div>
		</div>
	);
}

export default CountdownHOC(CountdownGames, '18:00:00');
