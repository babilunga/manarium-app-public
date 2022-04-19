import { AppContext } from '../../App';
import ReferralSystem from './ReferralSystem';

function ReferralSystemHOC(props) {
	return (
		<AppContext.Consumer>
			{(context) => (
				<ReferralSystem
					web3Account={context.web3Account}
					address={context.address}
					onConnect={context.onConnect}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
}

export default ReferralSystemHOC;
