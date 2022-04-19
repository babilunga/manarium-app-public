import wallet from '../../../../img/Platform/Referral/wallet.png';
import { AppContext } from '../../../App';
import PrimaryButton from '../../../UI/PrimaryButton';

function ConnectOccluder({ onConnect, web3Account, address }) {
	if (address) {
		return null;
	}
	const occluder_container = {
		position: 'absolute',
		top: 0,
		right: 0,
		width: '100%',
		height: '100%',
		borderRadius: 32,
		background: 'rgba(15, 15, 24, 0.81)',
		zIndex: 3,
	};
	const occluder_content = {
		display: 'flex',
		flexDirection: 'column',
		justifiContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	};
	return (
		<div style={occluder_container}>
			<div style={occluder_content}>
				<img
					src={wallet}
					alt='wallet to connect'
					style={{ transform: 'translateY(15px)' }}
				/>
				<p
					className='title font12'
					style={{ width: 200, textAlign: 'center', marginBottom: 20 }}>
					Please connect wallet to have acces to this feature
				</p>
				<PrimaryButton
					title='Connect wallet'
					onClickFunction={onConnect}
					classes='ref_hold_claim_connect_button'
				/>
			</div>
		</div>
	);
}

const ConnectOccluderContainer = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => (
				<ConnectOccluder
					onConnect={context.onConnect}
					web3Account={context.web3Account}
					address={context.address}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
};

export default ConnectOccluderContainer;
