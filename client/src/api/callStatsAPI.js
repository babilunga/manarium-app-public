const callStatsAPI = async (address = '') => {
	try {
		const response = await fetch(`/api/info/${address}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const res = await response.json();
		return res;
	} catch (e) {
		console.log('There was a problem with your fetch request: ', e);
	}
};

export default callStatsAPI;
