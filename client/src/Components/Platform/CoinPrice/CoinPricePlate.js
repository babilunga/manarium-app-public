import '../../../style/Platform/header/coinPricePlate.css';
import coin from '../../../img/Platform/coin.png';
import PopUpInfo from '../../UI/PopUpInfo';
import useMinimize from '../../Hooks/useMinimize';

function CoinPricePlate(props) {
	const { tokenPrice, tokenLastUpdate } = props;
	const minimize = useMinimize(975, false);
	const minimize_small = useMinimize(475, false);
	const minimize_smaller = useMinimize(350, false);

	return (
		<div className='coin_price'>
			<PopUpInfo
				toggle={{ position: 'relative', offset: '' }}
				card={{
					text: `${
						minimize_smaller ? 'Token price: ' + tokenPrice + '$.' : ''
					} Last updated: ${
						tokenLastUpdate
						//  && new Date(Number(tokenLastUpdate) * 1000).toUTCString()
					}`,
					width: '200px',
					position: 'bottom-left',
					offset: '5px',
				}}>
				<div className='coin_price_content'>
					{!minimize_small && <img src={coin} alt='coin icon' />}
					<p className='title font14'>
						{minimize_smaller
							? Number(tokenPrice).toFixed(3)
							: minimize
							? tokenPrice
							: '1 ARI = ' + tokenPrice}
						$
					</p>
				</div>
			</PopUpInfo>
		</div>
	);
}

export default CoinPricePlate;
