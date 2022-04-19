import { css } from '@emotion/css';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../img/animations/loading';

function LoaderScreen(props) {
	const { loading = false, timeForLoad = false } = props;
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	const [active, setActive] = useState(true);

	const spinner = useRef(null);
	function clickHandler(e) {
		e.stopPropagation();
		e.preventDefault();
	}
	useEffect(() => {
		let id;
		if (timeForLoad) {
			id = setTimeout(() => {
				setActive(false);
			}, 1500);
		} else {
			setActive(false);
		}
		spinner.current.addEventListener('click', clickHandler);
		return () => {
			clearTimeout(id);
			spinner.current.removeEventListener('click', clickHandler);
		};
	}, []);

	return (
		<div
			ref={spinner}
			className={css`
				position: fixed;
				z-index: 999;
				width: 100vw;
				height: 100vh;
				background-color: var(--bg-color);
				display: ${loading || active ? 'flex' : 'none'};
				justify-content: center;
				align-items: center;
			`}>
			<Lottie
				options={defaultOptions}
				height={'200'}
				width={'200'}
				isStopped={false}
				isPaused={false}
			/>
		</div>
	);
}

export default LoaderScreen;
