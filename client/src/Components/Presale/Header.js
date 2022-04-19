import '../../style/Presale1/header.css';

import { css } from '@emotion/css';
import Logo from '../Home/Header/Logo';
import PrimaryButton from '../UI/PrimaryButton';
import { walletFormating } from '../../helpers/utilities';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import useMinimize from '../Hooks/useMinimize';

function Header(props) {
	const { onConnect, onDisconnect, address } = props;
	const minimize = useMinimize(660);

	return (
		<div className='presale_header'>
			<Logo />
			<div>
				<Link className='' to='/nft'>
					<PrimaryButton
						classes={'header__button_seed'}
						title={minimize ? 'NFT' : 'NFT Sale'}
					/>
				</Link>
				{!address ? (
					<PrimaryButton
						title={minimize ? 'Connect' : 'Connect wallet'}
						link=''
						onClickFunction={onConnect}
						classes='presale_header_button'
					/>
				) : (
					<button
						className={`title font16 presale_header_wallet_logout ${css`
							position: relative;
							color: grey;
							border-style: none;
							margin-left: auto;
							margin-right: 0;
							width: 150px;
							height: 32px;
							border-radius: 200vw;
							padding: 0;
							display: flex;
							justify-content: center;
							align-items: center;
							cursor: pointer;
							&:hover ~ p {
								display: block;
							}
						`}`}
						onClick={onDisconnect}>
						{walletFormating({ wallet: address })}
					</button>
				)}
			</div>
		</div>
	);
}

const PresaleHeaderContainer = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => (
				<Header
					onConnect={context.onConnect}
					onDisconnect={context.onDisconnect}
					address={context.address}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
};

export default PresaleHeaderContainer;
