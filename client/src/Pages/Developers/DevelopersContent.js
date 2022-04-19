import '../../style/Developers/devs_content.css';

import first from '../../img/ForDevelopers/1.png';
import second from '../../img/ForDevelopers/2.png';
import third from '../../img/ForDevelopers/3.png';
import app from '../../img/ForDevelopers/app.png';
import review from '../../img/ForDevelopers/review.png';
import feedback from '../../img/ForDevelopers/feedback.png';
import p2e from '../../img/ForDevelopers/p2e.png';
import launch from '../../img/ForDevelopers/launch.png';

import LINKS from '../../data/getData';
import PrimaryButton from '../../Components/UI/PrimaryButton';

function DevelopersContent() {
	const launchData = [
		{
			image: app,
			title: 'Application',
			text: 'Fill the form with basic information about your game.',
		},
		{
			image: review,
			title: 'Game review',
			text: 'Game review by Manarium team. (3 to 5 days)',
		},
		{
			image: feedback,
			title: 'Feedback',
			text: 'Feedback on reviewed game with some suggestions and ideas. (1 to 3 days)',
		},
		{
			image: p2e,
			title: 'P2E implementation',
			text: 'Our experienced developers will implement play-to-earn mechanics in your game.',
		},
		{
			image: launch,
			title: 'Launch!',
			text: 'Marketing campaign and game launch.',
		},
	];
	const helpData = [
		{
			image: first,
			title: 'Marketing support',
			text: 'You can expect marketing support in Manarium social media before the game launch.',
		},
		{
			image: second,
			title: 'Polishing your game',
			text: 'Our development and design team will help improve and complete the game',
		},
		{
			image: third,
			title: 'P2E implementation',
			text: 'Our experienced developers will implement play-to-earn mechanics in your game by themselves, so you do not need to write any smart contracts',
		},
	];

	return (
		<div className='devs_content'>
			<div className='devs_col equal_col'>
				<div className='devs_description'>
					<h2 className='title font36'>Launch your games</h2>
					<p className='text font14 devs_desc_text'>
						The Manarium team provides game developers with the ability to
						launch their own original games on the Manarium gaming platform and
						earn ARI tokens. Every game developer can fill the form with the
						information required and send their game for launch. Our team will
						examine each application and contact developers for further
						cooperation.
					</p>
					<p className='text font14'>
						After the launch, every developer gets rewards in ARI token,
						consisting of two parts: one-time payment (up to 50 000 ARI) and 6%
						of a daily prize pool fee.
					</p>
				</div>
				<div className='devs_help'>
					<h3 className='title font36'>We will help you</h3>
					<div className='devs_help_cards'>
						{helpData.map((item, index) => {
							return (
								<div key={index} className='devs_help_card'>
									<img src={item.image} alt={item.title} />
									<div className='devs_help_card_info'>
										<h4 className='title font18'>{item.title}</h4>
										<p className='text font14'>{item.text}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<a
					href={LINKS.devs_form}
					target='_blank'
					rel='noreferrer'
					className='devs_link'>
					<PrimaryButton
						title={'Fill the form'}
						classes={'devs_link_button'}
						isDisabled={false}
					/>
				</a>
			</div>
			<div className='devs_col equal_col'>
				<h3 className='title font36'>Launch process</h3>
				<div className='devs_launch_cards'>
					{launchData.map((item, index) => {
						return (
							<div className='devs_launch_card' key={index}>
								<img src={item.image} alt={item.title} />
								<div className='devs_launch_card_info'>
									<h4 className='title font24'>{item.title}</h4>
									<p className='text font14'>{item.text}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default DevelopersContent;
