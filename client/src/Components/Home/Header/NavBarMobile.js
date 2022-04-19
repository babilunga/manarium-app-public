import '../../../style/Home/header/navBarMobile.css';

import LINKS from '../../../data/getData';
import { Link as LinkScroll } from 'react-scroll';
import { Link as LinkRouter } from 'react-router-dom';
import { ReactComponent as Games } from '../../../img/Home/Header/mobile/games.svg';
import { ReactComponent as Advantages } from '../../../img/Home/Header/mobile/advantages.svg';
import { ReactComponent as Invest } from '../../../img/Home/Header/mobile/invest.svg';
import { ReactComponent as Roadmap } from '../../../img/Home/Header/mobile/roadmap.svg';
import { ReactComponent as Developers } from '../../../img/Home/Header/mobile/developers.svg';
import { ReactComponent as Whitepaper } from '../../../img/Home/Header/mobile/whitepaper.svg';
import { ReactComponent as Audit } from '../../../img/Home/Header/mobile/audit.svg';

import React, { useEffect, useState } from 'react';

function BurgerMenu(props) {
	const { data } = props;
	const icons = [
		<Games />,
		<Advantages />,
		<Invest />,
		<Roadmap />,
		<Developers />,
		<Whitepaper />,
		<Audit />,
	];
	const [burgerToggle, setBurgerToggle] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => setBurgerToggle(false));
		return () =>
			window.removeEventListener('scroll', () => setBurgerToggle(false));
	});

	const handleChange = () => {
		setBurgerToggle((prev) => !prev);
	};

	return (
		<div className='nav__navbar-burger'>
			<button
				name='burgerToggle'
				onClick={handleChange}
				className={`burger__btn`}>
				<span className={`${burgerToggle ? 'crossed' : ''}`}></span>
				<span className={`${burgerToggle ? 'crossed' : ''}`}></span>
				<span className={`${burgerToggle ? 'crossed' : ''}`}></span>
			</button>

			<ul className={`burger__box ${burgerToggle ? 'active' : ''}`}>
				{data.map((item, index) => {
					return (
						<li
							key={index}
							className={index === data.length - 1 ? item.className : ''}
							style={{ display: 'flex' }}>
							{icons[index]}
							{item.router ? (
								<LinkRouter to={item.href} className='title burger__item'>
									{item.title}
								</LinkRouter>
							) : item.target ? (
								<a
									href={item.href}
									className={`title burger__item`}
									target={item.target || ''}
									rel={item.rel || ''}
									name='burgerToggle'
									value={false}
									onClick={handleChange}>
									{item.title}
								</a>
							) : (
								<LinkScroll
									to={item.href}
									smooth={true}
									duration={1500}
									className='text burger__item'
									name='burgerToggle'
									value={false}
									onClick={handleChange}
									target={item.target || ''}
									rel={item.rel || ''}>
									{item.title}
								</LinkScroll>
							)}
						</li>
					);
				})}
				<li>
					<a
						className='burger__media'
						href={LINKS.telegram}
						target='_blank'
						rel='noreferrer'
						id='telegram-link'>
						<svg
							width='24'
							height='25'
							viewBox='0 0 24 25'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M7.12435e-10 12.9981C7.12446e-10 19.5341 5.464 24.9981 12 24.9981C18.536 24.9981 24 19.5341 24 12.9981C24 6.46208 18.536 0.99808 12 0.99808C5.52555 0.982972 -7.03795e-05 6.53462 7.12435e-10 12.9981ZM16.906 8.22208C17.006 8.22008 17.227 8.24508 17.371 8.36208C17.4667 8.44518 17.5277 8.56116 17.542 8.68708C17.558 8.78008 17.578 8.99308 17.562 9.15908C17.382 11.0571 16.6 15.6611 16.202 17.7861C16.034 18.6861 15.703 18.9871 15.382 19.0161C14.686 19.0811 14.157 18.5561 13.482 18.1141C12.426 17.4211 11.829 16.9901 10.804 16.3141C9.619 15.5341 10.387 15.1041 11.062 14.4041C11.239 14.2201 14.309 11.4271 14.369 11.1741C14.376 11.1421 14.383 11.0241 14.313 10.9621C14.243 10.9001 14.139 10.9211 14.064 10.9381C13.958 10.9621 12.271 12.0781 9.003 14.2831C8.523 14.6131 8.09 14.7731 7.701 14.7631C7.273 14.7551 6.449 14.5221 5.836 14.3231C5.084 14.0781 4.487 13.9491 4.539 13.5341C4.566 13.3181 4.864 13.0971 5.432 12.8711C8.93 11.3471 11.262 10.3421 12.43 9.85708C15.762 8.47108 16.455 8.23008 16.906 8.22208Z'
								fill='white'
							/>
						</svg>
					</a>
					<a
						className='burger__media'
						href={LINKS.medium}
						target='_blank'
						rel='noreferrer'
						id='instagram-link'>
						<svg
							width='24'
							height='14'
							viewBox='0 0 24 14'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M13.54 6.99993C13.5453 8.80168 12.8354 10.5319 11.566 11.8106C10.2967 13.0893 8.57177 13.812 6.77003 13.8199C4.96829 13.812 3.24335 13.0893 1.97402 11.8106C0.704678 10.5319 -0.00528713 8.80168 2.96483e-05 6.99993C-0.00528713 5.19818 0.704678 3.46798 1.97402 2.18926C3.24335 0.91055 4.96829 0.187873 6.77003 0.179932C8.57177 0.187873 10.2967 0.91055 11.566 2.18926C12.8354 3.46798 13.5453 5.19818 13.54 6.99993ZM20.96 6.99993C20.96 10.5399 19.45 13.4199 17.58 13.4199C15.71 13.4199 14.19 10.5399 14.19 6.99993C14.19 3.45993 15.71 0.579932 17.58 0.579932C19.45 0.579932 20.96 3.45993 20.96 6.99993ZM24 6.99993C24 10.1699 23.47 12.7499 22.81 12.7499C22.15 12.7499 21.62 10.1699 21.62 6.99993C21.62 3.82993 22.15 1.24993 22.81 1.24993C23.47 1.24993 24 3.82993 24 6.99993Z'
								fill='white'
							/>
						</svg>
					</a>
					<a
						className='burger__media'
						href={LINKS.twitter}
						target='_blank'
						rel='noreferrer'
						id='twitter-link'>
						<svg
							width='24'
							height='20'
							viewBox='0 0 24 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M23.953 2.56813C23.0545 2.96374 22.1026 3.22487 21.128 3.34313C22.1541 2.72638 22.9224 1.75918 23.291 0.620134C22.34 1.17513 21.286 1.57913 20.164 1.80413C19.4238 1.01256 18.4429 0.487555 17.3736 0.310635C16.3044 0.133716 15.2067 0.314784 14.2509 0.825725C13.2952 1.33666 12.5349 2.14888 12.0881 3.13626C11.6412 4.12363 11.533 5.2309 11.78 6.28613C7.69 6.09313 4.067 4.12813 1.64 1.16013C1.19879 1.90995 0.968664 2.76516 0.974 3.63513C0.974 5.34513 1.844 6.84813 3.162 7.73113C2.38086 7.70627 1.61697 7.49507 0.934 7.11513V7.17513C0.933557 8.31152 1.32627 9.41307 2.04551 10.2929C2.76474 11.1727 3.76621 11.7766 4.88 12.0021C4.1583 12.1955 3.40241 12.2246 2.668 12.0871C2.98412 13.0651 3.59766 13.9201 4.42301 14.5326C5.24837 15.1452 6.24435 15.4848 7.272 15.5041C5.53153 16.8701 3.38248 17.6114 1.17 17.6091C0.78 17.6091 0.391 17.5861 0 17.5421C2.25571 18.9865 4.87851 19.7531 7.557 19.7511C16.61 19.7511 21.555 12.2551 21.555 5.76613C21.555 5.55613 21.555 5.34613 21.54 5.13613C22.506 4.441 23.3392 3.57795 24 2.58813L23.953 2.56813Z'
								fill='white'
							/>
						</svg>
					</a>
				</li>
			</ul>
			<button
				className={`exit-btn ${!burgerToggle ? 'disabled' : ''}`}
				name='burgerToggle'
				onClick={handleChange}></button>
		</div>
	);
}

export default BurgerMenu;
