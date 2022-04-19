import '../../style/Developers/developers.css';

import { AppContext } from '../../Components/App';
import DevelopersHeader from './DevelopersHeader';
import Footer from '../../Components/Home/Footer/Footer';
import DevelopersContent from './DevelopersContent';
import BackgroundLightSpot from '../../Components/UI/BackgroundLightSpot';

function Developers(props) {
	const { onConnect, onDisconnect, address } = props;

	return (
		<div className='devs'>
			<BackgroundLightSpot
				width={'120%'}
				height={'150%'}
				maxWidth={'1800px'}
				maxHeight={'1000px'}
				top={'64px'}
			/>
			{/* <div className='devs_bg'></div> */}
			<DevelopersHeader
				address={address}
				onConnect={onConnect}
				onDisconnect={onDisconnect}
			/>
			<DevelopersContent />
			<Footer />
		</div>
	);
}

const DevelopersContainer = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => (
				<Developers
					onConnect={context.onConnect}
					onDisconnect={context.onDisconnect}
					address={context.address}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
};

export default DevelopersContainer;
