import '../style/Home/home.css';
import { useState, useEffect } from 'react';
import LoaderScreen from '../Components/UI/LoaderScreen';

import Header from '../Components/Home/Header/Header';
import Hero from '../Components/Home/Hero/Hero';
import PlayGames from '../Components/Home/Games/PlayGames';
import Advantages from '../Components/Home/Advantages/Advantages';
import Investing from '../Components/Home/Investing/Investing';
import Roadmap from '../Components/Home/Roadmap/Roadmap';
import Footer from '../Components/Home/Footer/Footer';
import Partners from '../Components/Home/Partners/Partners';
import useMinimize from '../Components/Hooks/useMinimize';

function Home() {
	const [loading, setLoading] = useState(true);
	const minimize = useMinimize(880, true);

	function onScroll(navBar, lastScrollTop, screenHight) {
		let scrollTop = window.scrollY;
		if (scrollTop > 100) {
			navBar.classList.add('header_bg');
		} else {
			navBar.classList.remove('header_bg');
		}

		if (scrollTop > lastScrollTop && scrollTop > screenHight) {
			navBar.style.top = '-100%';
		} else {
			navBar.style.top = '0';
		}
		return scrollTop;
	}

	useEffect(() => {
		let lastScrollTop = 0;
		const navBar = document.getElementById('navbar');
		const screenHight = window.visualViewport.height;

		window.addEventListener('scroll', () => {
			lastScrollTop = onScroll(navBar, lastScrollTop, screenHight);
		});

		return () =>
			window.removeEventListener('scroll', () => {
				lastScrollTop = onScroll(navBar, lastScrollTop, screenHight);
			});
	}, [loading]);

	return (
		<div className='home'>
			<LoaderScreen loading={loading} timeForLoad={true} />
			<Header />
			<Hero setLoading={setLoading} />
			{!loading ? (
				<div style={{ marginTop: minimize ? 50 : 0 }}>
					<PlayGames />
					<Advantages />
					<Investing />
					<Roadmap />
					<Partners />
					<Footer />
				</div>
			) : null}
		</div>
	);
}

export default Home;
