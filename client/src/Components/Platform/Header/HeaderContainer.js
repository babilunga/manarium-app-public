import Header from './Header';
import { AppContext } from '../../App';
import { useEffect, useState } from 'react';
// import callMongoUpdateAPI from '../../../api/callMongoUpdateAPI';

function HeaderC() {
	const [headerState, setHeaderState] = useState('');
	const [tokenPrice, setTokenPrice] = useState('');
	const [tokenLastUpdate, setTokenLastUpdate] = useState('');
	const mock_data = {
		price: 0.0025,
		last_updated_at: 'this is a mock data for preview purposes',
	};

	useEffect(() => {
		let intervalId = 0;
		getData();
		setHeaderState(window.location.pathname);
		if (window.location.pathname === '/referral') {
			intervalId = getTokenPrice();
		}

		return () => {
			setHeaderState('');
			clearInterval(intervalId);
		};
	}, []);

	async function getData() {
		try {
			// const data = await callMongoUpdateAPI();
			// set to mock data for preview version
			const data = mock_data;
			if (data) {
				setTokenPrice(data.price);
				setTokenLastUpdate(data.last_updated_at);
			} else {
				setTokenPrice('...');
				setTokenLastUpdate('...');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function getTokenPrice() {
		try {
			const id = setInterval(async () => {
				// const data = await callMongoUpdateAPI();
				// set to mock data for preview version
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
	}

	return (
		<Header
			headerState={headerState}
			tokenPrice={tokenPrice}
			tokenLastUpdate={tokenLastUpdate}
		/>
	);
}

const HeaderContainer = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => (
				<HeaderC
					onConnect={context.onConnect}
					onDisconnect={context.onDisconnect}
					address={context.address}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
};

export default HeaderContainer;
