import modalClaim from '../../../../img/Platform/Referral/modalClaim.png';
import PrimaryButton from '../../../UI/PrimaryButton';

function ClaimedModal({ setState, number, hash }) {
	return (
		<div
			style={{
				width: 300,
				height: 450,
				background:
					'radial-gradient(65.87% 26.81% at 50% 0%, rgb(255, 255, 255) 0.01%, rgb(0 163 255 / 0%) 100%), radial-gradient(115.49% 96% at 50% 0%, rgb(0, 178, 255) 22.92%, rgba(0, 12, 124, 0) 100%), linear-gradient(0deg, #1d1b2b 0.01%, #1d1b2b 100%)',
				boxShadow: '0px 6px 32px rgba(10, 10, 10, 0.5)',
				borderRadius: 32,
				overflow: 'hidden',
				zIndex: 999,
			}}>
			<div
				style={{
					width: '100%',
					height: '100%',
					padding: '25px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}>
				<img
					src={modalClaim}
					alt='claimed successfuly'
					style={{
						objectPosition: 'top center',
						objectFit: 'cover',
						transform: 'scale(1.29)',
					}}
				/>
				<div style={{}}>
					<p className='title font24'>Successfully claimed</p>
					<p className='title font18 fw500'>{number} USDT</p>
					<a
						className='font14'
						style={{
							textDecoration: 'underline',
							color: '#00A3FF',
						}}
						href={`https://bscscan.com/tx/${hash || ''}`}
						rel='noreferrer'
						target='_blank'>
						Transaction link
					</a>
				</div>
				<PrimaryButton
					title={'Ok'}
					classes={'platform_claimed_modal_button'}
					onClickFunction={() =>
						setState((prev) => ({ ...prev, hash: '', open: false }))
					}
				/>
			</div>
		</div>
	);
}

export default ClaimedModal;
