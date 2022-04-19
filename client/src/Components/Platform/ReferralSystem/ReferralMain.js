import '../../../style/Platform/referral/referralMain.css';

import staking from '../../../img/Platform/Referral/staking.png';
import total from '../../../img/Platform/Referral/total.png';
import games from '../../../img/Platform/Referral/games.png';

function ReferralMain(props) {
	const { games, stacking } = props;

	return (
		<div className='referral_main'>
			<div className='referral_main_content'>
				<MainCard color={'green'} text={'From games'} title={'3%'} />
				<MainCard color={'blue'} text={'From staking'} title={'Soon'} />
				<MainCard
					color={'red'}
					text={'Total earned'}
					title={`${games + stacking} ARI`}
				/>
			</div>
		</div>
	);
}

function MainCard(props) {
	const { color, title, text } = props;
	return (
		<div className='ref_main_card'>
			<div className={`ref_main_card_back ref_main_card_${color}`}>
				<div className='ref_main_card_rays'></div>
				<span className='title font48 ref_card_back_text_big'>{title}</span>
				<span className='title font18 ref_card_back_text'>{text}</span>
			</div>

			<div className={`ref_main_card_front `}>
				{color === 'green' ? (
					<img src={games} alt='' />
				) : color === 'blue' ? (
					<img src={staking} alt='' />
				) : (
					<img src={total} alt='' />
				)}
			</div>
		</div>
	);
}

export default ReferralMain;
