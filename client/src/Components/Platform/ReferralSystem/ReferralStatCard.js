import '../../../style/Platform/referral/referral_stat_card.css';

function ReferralStatCard(props) {
	const { title, children, icon, bg } = props;
	return (
		<div className='ref_hero_stat_card'>
			<h4 className='title font12 ref_hero_stat_card_title'>{title}</h4>
			<div className={`ref_hero_stat_card_info ${bg && 'hero_subcard'}`}>
				{icon}
				{children}
			</div>
		</div>
	);
}

export default ReferralStatCard;
