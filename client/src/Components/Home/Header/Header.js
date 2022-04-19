import '../../../style/Home/header/header.css';

import Logo from './Logo';
import HeaderContainer from '../../UI/HeaderContainer';
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';
import PrimaryButton from '../../UI/PrimaryButton';
import { Link } from 'react-router-dom';
import LINKS from '../../../data/getData';
import BuyAriButton from '../../UI/BuyAryButton';
import useMinimize from '../../Hooks/useMinimize';

function Header() {
	const data = [
		{
			href: 'games',
			title: 'Games',
			className: 'item-dropdown',
		},
		{
			href: 'advantages',
			title: 'Advantages',
		},
		{
			href: 'investing',
			title: 'Investing',
		},
		{
			href: 'roadmap',
			title: 'Roadmap',
		},
		{
			href: '/developers',
			title: 'Developers',
			router: true,
		},
		{
			href: LINKS.whitepaper,
			target: '_blank',
			rel: 'noreferrer',
			title: 'Whitepaper',
		},
		{
			href: LINKS.audit,
			target: '_blank',
			rel: 'noreferrer',
			title: 'Audit',
		},
		// {
		// 	href: '/nft',
		// 	title: 'Nft',
		// 	router: true,
		// 	className: 'item-new',
		// },
	];

	return (
		<HeaderContainer>
			<Logo classes={'logo_home_header'} />
			<NavBarDesktop data={data} />
			<BuyAriButton />
			<NftButton />
			<PresaleButton />
			<NavBarMobile data={data} />
		</HeaderContainer>
	);
}

const NftButton = () => {
	const minimize = useMinimize(660);
	return (
		<Link className='header__button_nft' to='/nft'>
			<PrimaryButton
				isDisabled={false}
				title={minimize ? 'NFT' : 'NFT sale'}
				classes={'header__button_seed'}
			/>
		</Link>
	);
};
const PresaleButton = () => {
	const minimize = useMinimize(660);
	return (
		<Link className='header__button_link' to='/presale'>
			<PrimaryButton
				isDisabled={false}
				title={minimize ? 'Seed' : 'Seed sale'}
				classes={'header__button_seed'}
			/>
		</Link>
	);
};

export default Header;
