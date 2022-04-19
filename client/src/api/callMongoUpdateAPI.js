const callMongoUpdateAPI = async () => {
	try {
		const response = await fetch('/api/mongoWatch', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const res = await response.json();
		return res;
	} catch (e) {
		console.log('There was a problem with the fetch request: ', e);
	}
};

export default callMongoUpdateAPI;
