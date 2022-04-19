import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import GamesHero from './GamesHero';
// import callMongoUpdateAPI from '../../../api/callMongoUpdateAPI';

function GamesHeroContainer(props) {
	const { getTotalRewards, getTotalPlayers } = props;
	const [prizePool, setPrizePool] = useState(null);
	const [playersOnline, setPlayersOnline] = useState(null);
	const [tokenPrice, setTokenPrice] = useState('Waiting...');
	const [tokenLastUpdate, setTokenLastUpdate] = useState('...');
	const mock_data = {
		price: 0.0025,
		last_updated_at: 'this is a mock data for preview purposes',
	};

	useEffect(() => {
		getData();
		const intervalId = getTokenPrice();

		return () => {
			clearInterval(intervalId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getData = async () => {
		try {
			// const data = await callMongoUpdateAPI();
			// set to mock for preview version
			const data = mock_data;
			const prizePoolWei = await getTotalRewards().call();
			const prizePool = numberFormating(prizePoolWei);
			const playersOnline = await getTotalPlayers().call();
			setPrizePool(prizePool);
			setPlayersOnline(playersOnline);
			if (data !== undefined) {
				setTokenPrice(data.price);
				setTokenLastUpdate(data.last_updated_at);
			} else {
				setTokenPrice('...');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const numberFormating = (num) => {
		try {
			const formated = BigNumber(num)
				.dividedBy(BigNumber(10).pow(18))
				.toFixed();
			return new Intl.NumberFormat('ru-RU').format(formated);
		} catch (error) {
			console.log(error);
		}
	};

	const getTokenPrice = async () => {
		try {
			const id = setInterval(async () => {
				// const data = await callMongoUpdateAPI();
				// set to mock for preview version
				const data = mock_data;
				if (data) {
					setTokenPrice(data.price);
					setTokenLastUpdate(data.last_updated_at);
				} else {
					setTokenPrice('...');
					setTokenLastUpdate('...');
				}
			}, 60000);
			return id;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<GamesHero
			{...props}
			prizePool={prizePool}
			playersOnline={playersOnline}
			tokenPrice={tokenPrice}
			tokenLastUpdate={tokenLastUpdate}
		/>
	);
}

export default GamesHeroContainer;
