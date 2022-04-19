import { TokenPrice } from './mongodb.config.js';
import fetch from 'node-fetch';

const getTokenPrice = async () => {
	try {
		const response = await fetch(
			'https://api.coingecko.com/api/v3/simple/price?ids=manarium&vs_currencies=usd&include_last_updated_at=true',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const res = await response.json();

		await TokenPrice.findOneAndUpdate(
			{ name: 'ARI' },
			{
				price: String(res.manarium.usd),
				timestamp: String(res.manarium.last_updated_at),
			}
		).exec();
	} catch (error) {
		console.log('Token get price error:', error);
	}
};

export default getTokenPrice;
