import DropDownMenu from './DropDownMenu';
import spikywalls from '../../../img/Home/Header/spikywalls.png';
import tothemoon from '../../../img/Home/Header/tothemoon.png';
import inthewoods from '../../../img/Home/Header/inthewoods.png';
import { Link as LinkScroll } from 'react-scroll';
import { Link as LinkRouter } from 'react-router-dom';

function NavBarDesktop(props) {
	const { data } = props;
	const dropdown_data = [
		{
			title: 'Spiky Walls',
			text: "Make the bird fly, but don't touch the spikes!",
			imageSrc: spikywalls,
			imageAlt: 'Spiky walls game logo miniature',
			link: 'https://www.spikywalls.fun/',
		},
		{
			title: 'To The Moon',
			text: 'Launch your rocket as high into orbit as possible.',
			imageSrc: tothemoon,
			imageAlt: 'To The Moon game logo miniature',
			link: 'https://www.2themoon.fun/',
		},
		{
			title: 'In The Woods',
			text: "Calm the monsters, don't let them get angry and eat you.",
			imageSrc: inthewoods,
			imageAlt: 'In The Woods game logo miniature',
			link: 'https://www.inthewoods.fun/',
		},
	];

	return (
		<div className='header__navbar'>
			<ul className='header__navbar-desktop'>
				{data.map((item, index) => {
					return (
						<li key={index} className={`menu-item ${item.className}`}>
							{item.router ? (
								<LinkRouter to={item.href} className='title'>
									{item.title}
								</LinkRouter>
							) : item.target ? (
								<a
									href={item.href}
									className='title'
									target={item.target || ''}
									rel={item.rel || ''}>
									{item.title}
								</a>
							) : !item.target ? (
								<LinkScroll
									to={item.href}
									smooth={true}
									duration={1700}
									className={`title`}
									target={item.target || ''}
									rel={item.rel || ''}>
									{item.title}
								</LinkScroll>
							) : (
								false
							)}
						</li>
					);
				})}
				<DropDownMenu data={dropdown_data} />
			</ul>
		</div>
	);
}

export default NavBarDesktop;
