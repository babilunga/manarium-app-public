import logo_image from '../../../img/Home/Header/logo.svg';
import logo_image_white from '../../../img/Home/Header/logo_white.svg';
import logo_small_image from '../../../img/Home/Header/logo_small.svg';
import logo_small_image_white from '../../../img/Home/Header/logo_small_white.svg';
import { Link } from 'react-router-dom';
import useMinimize from '../../Hooks/useMinimize';

function Logo({ classes = '', white = false }) {
	const logoState = useMinimize(570);

	return (
		<Link
			className={`logo ${classes}`}
			to='/'
			onClick={() => {
				if (window.location.pathname === '/') {
					window.location.reload();
				}
			}}>
			{logoState ? (
				<img
					src={white ? logo_small_image_white : logo_small_image}
					alt='main logo small'
				/>
			) : (
				<img
					src={white ? logo_image_white : logo_image}
					alt='main logo white'
				/>
			)}
		</Link>
	);
}

export default Logo;
