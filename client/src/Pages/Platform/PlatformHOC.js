import { AppContext } from '../../Components/App';
import PlatformContainer from './PlatformContainer';

const PlatformHOC = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => (
				<PlatformContainer
					web3Modal={context.web3Modal}
					onConnect={context.onConnect}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
};

export default PlatformHOC;
