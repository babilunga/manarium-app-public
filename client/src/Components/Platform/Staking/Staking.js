import '../../../style/Platform/staking/staking.css';

import BackgroundLightSpot from '../../UI/BackgroundLightSpot';
import HeaderContainer from '../Header/HeaderContainer';
import DATA from '../../../data/getData';

function Staking() {
	function addAriToken() {
		if (window.ethereum) {
			window.ethereum.request({
				method: 'wallet_watchAsset',
				params: {
					type: 'ERC20',
					options: {
						address: DATA.tokenAddress,
						symbol: 'ARI',
						decimals: 18,
						image: '',
					},
				},
			});
		}
	}

	return (
		<div className='platform_staking'>
			<BackgroundLightSpot
				width={'120%'}
				height={'70vh'}
				maxWidth={'1800px'}
				maxHeight={'800px'}
				top={'-30vh'}
			/>
			<HeaderContainer />
		</div>
	);
}

export default Staking;
