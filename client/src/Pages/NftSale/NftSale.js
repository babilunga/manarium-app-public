import '../../style/Nft/nft_sale.css';

import Logo from '../../Components/Home/Header/Logo';
import HeaderContainer from '../../Components/UI/HeaderContainer';
import WalletButtonContainer from '../../Components/UI/WalletButton';
import NftFaq from '../../Components/Nft/NftFaq';
import NftHero from '../../Components/Nft/NftHero/NftHero';
import NftMain from '../../Components/Nft/NftMain';
import NftFooter from '../../Components/Nft/NftFooter';
import LoaderScreen from '../../Components/UI/LoaderScreen';

function NftSale() {
	return (
		<div className='nft_sale'>
			<LoaderScreen timeForLoad={true} />
			<HeaderContainer classes={'nft_header'}>
				<Logo white={true} />
				<WalletButtonContainer
					classesConnect={'header_button nft_header_button'}
					classesAccount={'header_button_wallet nft_header_button_wallet'}
					titleClasses={'baloo_font'}
				/>
			</HeaderContainer>
			<NftHero />
			<NftMain />
			<NftFaq />
			<NftFooter />
		</div>
	);
}

export default NftSale;
