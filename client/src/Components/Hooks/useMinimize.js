import { useEffect, useState } from 'react';

function useMinimize(milestone = 0, initialState = false) {
	const [minimize, setMinimize] = useState(initialState);

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	function handleResize() {
		if (window.innerWidth <= milestone) {
			setMinimize(true);
		} else {
			setMinimize(false);
		}
	}

	return minimize;
}

export default useMinimize;
