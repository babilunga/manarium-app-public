import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { fetchFirebase } from '../../../../helpers/utilities';
import GameCard from './GameCard';

function GameCardContainer(props) {
	const { method, bud } = props;
	const [gameInfo, setGamesInfo] = useState({});
	const [prevWinners, setPresWinners] = useState([]);
	const [winnersPlaceholder, setWinnersPlaceholder] = useState(true);
	const [budColor, setBudColor] = useState(true);

	useEffect(() => {
		const res = getGameInfo();
		if (res) {
			res.then((info) => {
				setGamesInfo(info);
			});
		}
		let color = '';
		switch (bud) {
			case 'New':
				color = 'rgba(0, 163, 255, 1)';
				break;
			case 'HOT':
				color = 'rgba(212, 7, 117, 1)';
				break;
			default:
				color = 'rgba(94, 119, 155, 1)';
				break;
		}
		setBudColor(color);
	}, []);

	useEffect(() => {
		if (gameInfo && gameInfo.title) {
			getWinners(gameInfo.title);
		}
	}, [gameInfo]);

	const getWinners = async (title) => {
		try {
			let winnersArray;
			if (prevWinners.length === 0) {
				winnersArray = await fetchFirebase(title);
				const sortedArray = winnersArray.sort((a, b) => {
					return b[0] - a[0];
				});
				setPresWinners(sortedArray);
				setWinnersPlaceholder(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getGameInfo = async () => {
		try {
			const info = await method.call();
			return info;
		} catch (e) {
			console.log(e.message ?? e);
			return false;
		}
	};

	const numberFormating = (num) => {
		const formated = BigNumber(num).dividedBy(BigNumber(10).pow(18)).toFixed();
		return new Intl.NumberFormat('de-DE').format(formated);
	};

	return (
		<GameCard
			{...props}
			budColor={budColor}
			gameInfo={gameInfo}
			prevWinners={prevWinners}
			winnersPlaceholder={winnersPlaceholder}
			numberFormating={numberFormating}
		/>
	);
}

export default GameCardContainer;
