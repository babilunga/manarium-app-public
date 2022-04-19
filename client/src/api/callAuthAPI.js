const callAuthAPI = async (address = '') => {
	try {
		const refSession = window.sessionStorage.getItem('_ref') || '';

		const data = { address, ref: refSession };

		const response = await fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.status;
	} catch (e) {
		console.log('Fetch request error: ', e);
	}
};

export default callAuthAPI;
