import CountdownHOC from '../../Components/UI/CountdownHOC';
import useMinimize from '../Hooks/useMinimize';

function NftCountdown(props) {
	const { timeExpired, days, hours, minutes, seconds } = props;
	const TEXT_STYLE = { lineHeight: 0.5 };
	const DIGITS_STYLE = { lineHeight: 0.5, marginRight: 8 };
	const minimize = useMinimize(510);

	if (timeExpired) {
		return (
			<p
				className='font32 title baloo_font'
				style={{
					margin: '35px auto 100px',
					padding: '0px 20px',
					display: 'flex',
					alignItems: 'flex-end',
					justifyContent: 'center',
					zIndex: 2,
				}}>
				Nft sale starts soon
			</p>
		);
	}

	return (
		<div
			style={{
				margin: '20px auto 100px auto',
				padding: '10px 25px',
				maxWidth: '520px',
				width: '100%',
				zIndex: 1,
				border: '2px solid white',
				borderRadius: '16px',
				backdropFilter: 'blur(20px)',
				cursor: 'default',
			}}>
			<h3
				className='baloo_font title font18 textcenter'
				style={{
					width: 'max-content',
					padding: '3px 45px',
					margin: '0px auto',
					textAlign: 'center',
				}}>
				Starts in
			</h3>
			<div
				style={{
					marginTop: 12,
					display: 'flex',
					alignItems: 'flex-end',
					justifyContent: 'space-between',
					width: '100%',
				}}>
				<div>
					<span style={DIGITS_STYLE} className='title font36 baloo_font'>
						{days}
					</span>
					<span style={TEXT_STYLE} className='text font12 baloo_font'>
						{minimize ? 'D' : 'Days'}
					</span>
				</div>

				<div>
					<span style={DIGITS_STYLE} className='title font36 baloo_font'>
						{hours}
					</span>
					<span style={TEXT_STYLE} className='text font12 baloo_font'>
						{minimize ? 'H' : 'Hours'}
					</span>
				</div>
				<div>
					<span style={DIGITS_STYLE} className='title font36 baloo_font'>
						{minutes}
					</span>
					<span style={TEXT_STYLE} className='text font12 baloo_font'>
						{minimize ? 'M' : 'Minutes'}
					</span>
				</div>
				<div>
					<span style={DIGITS_STYLE} className='title font36 baloo_font'>
						{seconds}
					</span>
					<span style={TEXT_STYLE} className='text font12 baloo_font'>
						{minimize ? 'S' : 'Seconds'}
					</span>
				</div>
			</div>
		</div>
	);
}

export default CountdownHOC(NftCountdown, '18:00:00', {
	d: 20,
	m: 'February',
	y: 2022,
});
