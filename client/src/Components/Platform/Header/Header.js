import '../../../style/Platform/header/header.css';

import CountdownGames from '../Countdown/CountdownGames';
import WalletButton from '../../UI/WalletButton';
import CoinPricePlate from '../CoinPrice/CoinPricePlate';
import BuyAriButton from '../../UI/BuyAryButton';
import Logo from '../../Home/Header/Logo';
import PrimaryButton from '../../UI/PrimaryButton';
import { Link } from 'react-router-dom';
import useMinimize from '../../Hooks/useMinimize';

function Header(props) {
	const { headerState, tokenPrice, tokenLastUpdate } = props;
	const minimizeNft = useMinimize(470);
	return (
		<div className='platform__header'>
			<Logo classes={'platform_header_logo'} />
			{headerState === '/games' ? (
				<CountdownGames />
			) : headerState === '/referral' || headerState === '/staking' ? (
				<CoinPricePlate
					tokenPrice={tokenPrice}
					tokenLastUpdate={tokenLastUpdate}
				/>
			) : null}
			<BuyAriButton />
			<Link className='header__button_nft' to='/nft'>
				<PrimaryButton
					classes={'header__button_seed'}
					title={minimizeNft ? 'NFT' : 'NFT Sale'}
				/>
			</Link>
			<WalletButton
				classesConnect={'header_button'}
				classesAccount={'header_button_wallet'}
			/>
		</div>
	);
}

export default Header;
