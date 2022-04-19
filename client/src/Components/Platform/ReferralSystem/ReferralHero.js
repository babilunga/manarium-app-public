import '../../../style/Platform/referral/referralHero.css';

import chains from '../../../img/Platform/Referral/chains.png';
import { ReactComponent as CopyBtn } from '../../../img/svg/copy.svg';
import { ReactComponent as Telegram } from '../../../img/svg/telegram.svg';
import { ReactComponent as Reddit } from '../../../img/svg/reddit.svg';
import { ReactComponent as Twitter } from '../../../img/svg/twitter.svg';

import ReferralStatCard from './ReferralStatCard';
import { ReactComponent as Player } from '../../../img/svg/player.svg';
import { ReactComponent as Coin } from '../../../img/svg/coin.svg';
import PopUpInfo from '../../UI/PopUpInfo';
import useMinimize from '../../Hooks/useMinimize';
import { useState } from 'react';

import Modal from '../../UI/Modal';
import ModalLayout from '../../UI/ModalLayout';

function ReferralHero(props) {
	const { referrals, refString, games, stacking, accumulated } = props;

	const [modalState, setModalState] = useState(false);
	const minimize = useMinimize(810, true);

	return (
		<div className='referral_hero'>
			<Modal
				position={'top'}
				fullscreen={false}
				open={modalState}
				timeout={2500}
				setState={setModalState}>
				<ModalLayout text='Referral link copied' />
			</Modal>
			<div className='platform_hero_content'>
				<div className='equal_col hero_col ref_hero_col'>
					<div className='hero_info ref_hero_info'>
						<h2 className='title font_subtitle'>Manarium Playground</h2>
						<p className='text font14'>
							Bring people here and earn more! Receive passive income for each
							player who follows your link, registers and plays actively on the
							platform.
						</p>
						<a
							className='font14 ref_learn_more_link'
							href='https://manarium.gitbook.io/manarium/LzHH7vsGZQZtJ9k8cYL3/manarium-platform/referrall-system'
							target='_blank'
							rel='noreferrer'>
							Learn more
						</a>
					</div>
					<div className='ref_hero_card r_border_32'>
						<div className='ref_hero_card_link_row'>
							<div
								id='ref_hero_card_column_link'
								className='ref_hero_card_column'>
								<h3 className='ref_hero_card_title font14 title'>
									Your personal Referral link
								</h3>
								<div className='ref_hero_card_personal hero_subcard'>
									<span className='title font12 ref_hero_card_link'>
										{refString || `${window.location.origin}/?ref=...`}
									</span>
									<PopUpInfo
										active={refString && !minimize}
										toggle={{ position: 'relative', offset: '' }}
										card={{
											text: 'Click to copy',
											position: 'top',
											offset: '7px',
										}}>
										<button
											className='ref_hero_card_btn'
											onClick={
												refString
													? () => {
															setModalState(true);
															navigator.clipboard.writeText(refString);
													  }
													: () => {}
											}>
											<CopyBtn />
										</button>
									</PopUpInfo>
								</div>
							</div>
							<div
								id='ref_hero_card_column_media'
								className='ref_hero_card_column'>
								<h3 className='ref_hero_card_title font14 title'>Share</h3>
								<div className='ref_hero_card_media'>
									<div className='ref_hero_card_media_button hero_subcard'>
										<Telegram />
									</div>
									<div className='ref_hero_card_media_button hero_subcard'>
										<Reddit />
									</div>
									<div className='ref_hero_card_media_button hero_subcard'>
										<Twitter />
									</div>
								</div>
							</div>
						</div>
						<div className='ref_hero_card_row ref_hero_card_stats'>
							<ReferralStatCard title={'Refferals'} icon={<Player />} bg={true}>
								<span className='title font12'>{referrals}</span>
							</ReferralStatCard>
							<ReferralStatCard
								title={'Earned from games'}
								icon={<Coin />}
								bg={true}>
								<span className='title font12'>{games} ARI</span>
							</ReferralStatCard>
							<ReferralStatCard
								title={'Earned from staking'}
								icon={<Coin />}
								bg={true}>
								<span className='title font12'>{stacking} ARI</span>
							</ReferralStatCard>
							<ReferralStatCard
								title={'Not distributed'}
								icon={<Coin />}
								bg={false}>
								<span className='title font12'>{accumulated} ARI</span>
							</ReferralStatCard>
						</div>
					</div>
				</div>
				<div className='hero_col_abs'>
					<img className='hero_image' src={chains} alt='Referral chains' />
				</div>
			</div>
		</div>
	);
}

export default ReferralHero;
