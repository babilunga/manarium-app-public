import '../../style/Platform/platform.css';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import LoaderScreen from '../../Components/UI/LoaderScreen';
import { css } from '@emotion/css';
import Games from '../../Components/Platform/Games/Games';
import ReferralSystem from '../../Components/Platform/ReferralSystem/ReferralSystemHOC';
import Staking from '../../Components/Platform/Staking/Staking';

function Platform({ contractTour, contractTok, contractStaking }) {
	return (
		<div className='platform'>
			<LoaderScreen
				loading={
					contractTour === null &&
					contractTok === null &&
					contractStaking === null
				}
				timeForLoad={true}
			/>
			<input
				type='checkbox'
				id='sidebar_checkbox'
				className='platform_wrap_check'
			/>
			<label htmlFor='sidebar_checkbox' className='platform_wrap_button'>
				<svg
					width='9'
					height='12'
					viewBox='0 0 8 12'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M5.08797 0.472601L0.5227 4.79362C-0.174232 5.45326 -0.174232 6.54674 0.5227 7.20638L5.08797 11.5274C5.75373 12.1575 6.81155 12.1575 7.4773 11.5274C8.17035 10.8714 8.17421 9.78644 7.48887 9.12569L4.33956 5.98272L7.48648 2.87661C8.17422 2.21608 8.17116 1.12934 7.4773 0.472601C6.81155 -0.157534 5.75373 -0.157534 5.08797 0.472601Z'
						fill='#1A2236'
					/>
				</svg>
			</label>
			<div className='platform_sidebar'>
				<div className='platform_logo'>
					<Link to='/'>
						<svg
							width='58'
							height='46'
							viewBox='0 0 58 46'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M42.4181 21.0831C38.5226 20.3165 30.407 25.8748 26.8362 28.7498C23.2653 25.8748 15.1497 20.3163 11.2542 21.0829C9.30651 30.6667 18.0713 43.125 18.0713 43.125C-9.19702 24.9167 2.48942 0 2.48942 0C14.1759 1.91667 26.8362 17.25 26.8362 17.25C26.8362 17.25 39.4965 1.91667 51.1829 0C51.1829 0 57.0261 7.66667 54.1045 19.1667C54.1045 19.1667 56.0523 19.1667 58 17.25C58 17.25 56.0523 33.5417 37.5487 46C37.5487 46 40.4703 43.125 45.3397 29.7083C45.3397 29.7083 44.3658 30.6667 41.4442 31.625C41.4442 31.625 43.392 25.875 42.4181 21.0831Z'
								fill='url(#paint0_radial_262_1323)'
							/>
							<defs>
								<radialGradient
									id='paint0_radial_262_1323'
									cx='0'
									cy='0'
									r='1'
									gradientUnits='userSpaceOnUse'
									gradientTransform='translate(15.9835 4.18386) rotate(47.5179) scale(30.4285 31.4299)'>
									<stop stopColor='#86D3FF' />
									<stop offset='1' stopColor='#00A3FF' />
								</radialGradient>
							</defs>
						</svg>{' '}
						<span className='title'>anarium</span>
					</Link>
				</div>
				<ul className='platform_sidebar_list'>
					<li className='platform_sidebar_element'>
						{/* GAMES */}

						<NavLink
							activeStyle={{
								backgroundColor: 'rgba(94, 119, 155, 0.25)',
							}}
							className='title font14 platform_link'
							to='/games'>
							<svg
								width='25'
								height='17'
								viewBox='0 0 24 17'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M15.2947 9.28364C15.6504 9.28364 15.9387 8.99475 15.9387 8.63838C15.9387 8.28201 15.6504 7.99311 15.2947 7.99311C14.939 7.99311 14.6507 8.28201 14.6507 8.63838C14.6507 8.99475 14.939 9.28364 15.2947 9.28364Z'
									fill='white'
								/>
								<path
									d='M8.99173 9.28364C9.34742 9.28364 9.63576 8.99475 9.63576 8.63838C9.63576 8.28201 9.34742 7.99311 8.99173 7.99311C8.63604 7.99311 8.3477 8.28201 8.3477 8.63838C8.3477 8.99475 8.63604 9.28364 8.99173 9.28364Z'
									fill='white'
								/>
								<path
									d='M7.56412 4.69391V5.36607C7.56412 5.40602 7.5483 5.44434 7.52013 5.47261C7.49196 5.50089 7.45375 5.51682 7.41388 5.5169H6.77849V6.15349C6.77849 6.1935 6.76263 6.23186 6.7344 6.26015C6.70617 6.28843 6.66788 6.30432 6.62795 6.30432H5.95777C5.91784 6.30432 5.87955 6.28843 5.85132 6.26015C5.82309 6.23186 5.80722 6.1935 5.80722 6.15349V5.5169H5.17144C5.15168 5.5169 5.13211 5.513 5.11385 5.50541C5.09559 5.49783 5.079 5.48672 5.06503 5.47271C5.05106 5.45871 5.03998 5.44208 5.03243 5.42378C5.02487 5.40548 5.02099 5.38587 5.021 5.36607V4.69391C5.02099 4.6741 5.02487 4.65449 5.03243 4.63619C5.03998 4.61789 5.05106 4.60127 5.06503 4.58726C5.079 4.57325 5.09559 4.56214 5.11385 4.55456C5.13211 4.54698 5.15168 4.54308 5.17144 4.54308H5.80693V3.90648C5.80693 3.86648 5.82279 3.82811 5.85102 3.79983C5.87925 3.77154 5.91754 3.75565 5.95747 3.75565H6.62765C6.66758 3.75565 6.70587 3.77154 6.7341 3.79983C6.76233 3.82811 6.7782 3.86648 6.7782 3.90648V4.54308H7.41388C7.45375 4.54316 7.49196 4.55908 7.52013 4.58736C7.5483 4.61564 7.56412 4.65395 7.56412 4.69391Z'
									fill='white'
								/>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M20.5308 2.31944C20.8926 2.47358 21.1775 2.76413 21.3201 3.1306C21.9072 4.63927 23.4679 8.74824 23.8043 10.6397C24.219 12.9671 24.0539 14.8555 22.5316 15.7969C22.0253 16.1114 21.3786 16.077 20.9039 15.7172C20.0252 15.0498 19.0611 14.0154 18.0171 12.8513C17.4947 12.219 16.8098 11.8456 15.8338 11.8456H8.1442C7.21377 11.8456 6.4833 12.2193 5.96187 12.8513C5.91563 12.9027 5.8695 12.9541 5.82349 13.0053L5.82181 13.0072C4.85858 14.0795 3.9441 15.0975 3.12946 15.7172C2.89774 15.8936 2.61816 15.9957 2.32747 16.0099C2.03679 16.0241 1.74861 15.9499 1.50083 15.7969C0.246477 15.0218 -0.310407 12.6139 0.173095 10.6442C0.510744 9.26867 1.93311 5.17231 2.55678 3.39663C2.74152 2.87064 3.17092 2.47047 3.70756 2.31944C3.70756 2.31944 3.73483 1.41982 4.11649 1.1472C4.11649 1.1472 6.43371 0.0022116 7.52013 0.00221263C7.74227 0.00221263 8.62549 0.657117 8.81257 0.738285C8.99965 0.819452 9.20135 0.861332 9.40522 0.861338H14.8657C15.0696 0.861346 15.2713 0.819472 15.4584 0.738304C15.6455 0.657136 16.3569 0.0260592 16.7027 0.00221263C17.4931 -0.052299 19.9554 0.915863 20.228 1.20173C20.4227 1.40588 20.5308 2.31944 20.5308 2.31944ZM18.2422 4.2359C18.6559 4.2359 18.9913 3.89986 18.9913 3.48534C18.9913 3.07081 18.6559 2.73477 18.2422 2.73477C17.8285 2.73477 17.4931 3.07081 17.4931 3.48534C17.4931 3.89986 17.8285 4.2359 18.2422 4.2359ZM17.4518 5.02782C17.4518 5.44234 17.1164 5.77838 16.7027 5.77838C16.2889 5.77838 15.9535 5.44234 15.9535 5.02782C15.9535 4.61329 16.2889 4.27725 16.7027 4.27725C17.1164 4.27725 17.4518 4.61329 17.4518 5.02782ZM18.2422 7.32076C18.6559 7.32076 18.9913 6.98472 18.9913 6.57019C18.9913 6.15567 18.6559 5.81963 18.2422 5.81963C17.8285 5.81963 17.4931 6.15567 17.4931 6.57019C17.4931 6.98472 17.8285 7.32076 18.2422 7.32076ZM20.5308 5.02782C20.5308 5.44234 20.1954 5.77838 19.7816 5.77838C19.3679 5.77838 19.0325 5.44234 19.0325 5.02782C19.0325 4.61329 19.3679 4.27725 19.7816 4.27725C20.1954 4.27725 20.5308 4.61329 20.5308 5.02782ZM16.2518 9.59736C16.7804 9.06774 16.7804 8.20906 16.2518 7.67944C15.7232 7.14982 14.8662 7.14982 14.3375 7.67944C13.8089 8.20906 13.8089 9.06774 14.3375 9.59736C14.8662 10.127 15.7232 10.127 16.2518 9.59736ZM15.9387 8.63838C15.9387 8.99475 15.6504 9.28364 15.2947 9.28364C14.939 9.28364 14.6507 8.99475 14.6507 8.63838C14.6507 8.28201 14.939 7.99311 15.2947 7.99311C15.6504 7.99311 15.9387 8.28201 15.9387 8.63838ZM9.94887 7.67944C10.4775 8.20906 10.4775 9.06774 9.94887 9.59736C9.42025 10.127 8.56321 10.127 8.0346 9.59736C7.50599 9.06774 7.50599 8.20906 8.0346 7.67944C8.56321 7.14982 9.42025 7.14982 9.94887 7.67944ZM8.99173 9.28364C9.34742 9.28364 9.63576 8.99475 9.63576 8.63838C9.63576 8.28201 9.34742 7.99311 8.99173 7.99311C8.63604 7.99311 8.3477 8.28201 8.3477 8.63838C8.3477 8.99475 8.63604 9.28364 8.99173 9.28364ZM6.25109 6.93295C7.30009 6.93295 8.15048 6.08094 8.15048 5.02994C8.15048 3.97893 7.30009 3.12692 6.25109 3.12692C5.20209 3.12692 4.35171 3.97893 4.35171 5.02994C4.35171 6.08094 5.20209 6.93295 6.25109 6.93295ZM7.56412 4.69391V5.36607C7.56412 5.40602 7.5483 5.44434 7.52013 5.47261C7.49196 5.50089 7.45375 5.51682 7.41388 5.5169H6.77849V6.15349C6.77849 6.1935 6.76263 6.23186 6.7344 6.26015C6.70617 6.28843 6.66788 6.30432 6.62795 6.30432H5.95777C5.91784 6.30432 5.87955 6.28843 5.85132 6.26015C5.82309 6.23186 5.80722 6.1935 5.80722 6.15349V5.5169H5.17144C5.15168 5.5169 5.13211 5.513 5.11385 5.50541C5.09559 5.49783 5.079 5.48672 5.06503 5.47271C5.05106 5.45871 5.03998 5.44208 5.03243 5.42378C5.02487 5.40548 5.02099 5.38587 5.021 5.36607V4.69391C5.02099 4.6741 5.02487 4.65449 5.03243 4.63619C5.03998 4.61789 5.05106 4.60127 5.06503 4.58726C5.079 4.57325 5.09559 4.56214 5.11385 4.55456C5.13211 4.54698 5.15168 4.54308 5.17144 4.54308H5.80693V3.90648C5.80693 3.86648 5.82279 3.82811 5.85102 3.79983C5.87925 3.77154 5.91754 3.75565 5.95747 3.75565H6.62765C6.66758 3.75565 6.70587 3.77154 6.7341 3.79983C6.76233 3.82811 6.7782 3.86648 6.7782 3.90648V4.54308H7.41388C7.45375 4.54316 7.49196 4.55908 7.52013 4.58736C7.5483 4.61564 7.56412 4.65395 7.56412 4.69391Z'
									fill='white'
								/>
							</svg>{' '}
							<span className='font14 platform_sidebar_element_text'>
								Games
							</span>
						</NavLink>
					</li>
					<li className='platform_sidebar_element'>
						{/* STAKING */}

						<a
							href='https://manariumstaking.com/'
							target='_blank'
							rel='noreferrer'
							className={`title font14  platform_link ${css`
								&:hover #staking_ext_link_icon {
									transform: scale(0.75) translateY(7%);
								}
								&:active #staking_ext_link_icon {
									transform: scale(0.68) translateY(7%);
									transition: transform 0ms ease-in-out;
								}
							`}`}>
							{/* <NavLink */}
							{/* activeStyle={{
								backgroundColor: 'rgba(94, 119, 155, 0.25)',
							}}
							className='title font14 platform_link'
							to='/staking'> */}
							<svg
								width='23'
								height='26'
								viewBox='0 0 22 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M11 10.5454C16.3325 10.5454 22 8.79291 22 5.54541C22 2.29791 16.3325 0.54541 11 0.54541C5.6675 0.54541 0 2.29791 0 5.54541C0 8.79291 5.6675 10.5454 11 10.5454Z'
									fill='white'
								/>
								<path
									d='M21 15.5454C20.448 15.5454 20 15.9934 20 16.5454C20 17.7684 16.494 19.5454 11 19.5454C5.506 19.5454 2 17.7684 2 16.5454C2 15.9934 1.552 15.5454 1 15.5454C0.448 15.5454 0 15.9934 0 16.5454V19.5454C0 22.7929 5.6675 24.5454 11 24.5454C16.3325 24.5454 22 22.7929 22 19.5454V16.5454C22 15.9934 21.552 15.5454 21 15.5454Z'
									fill='white'
								/>
								<path
									d='M21 8.5454C20.448 8.5454 20 8.9934 20 9.5454C20 10.7684 16.494 12.5454 11 12.5454C5.506 12.5454 2 10.7684 2 9.5454C2 8.9934 1.552 8.5454 1 8.5454C0.448 8.5454 0 8.9934 0 9.5454V12.5454C0 15.7929 5.6675 17.5454 11 17.5454C16.3325 17.5454 22 15.7929 22 12.5454V9.5454C22 8.9934 21.552 8.5454 21 8.5454Z'
									fill='white'
								/>
							</svg>

							<span className={`font14 platform_sidebar_element_text`}>
								Staking
							</span>
							{/* <div className='platform_sidebar_element_bud'>soon</div>
              					<div className='platform_sidebar_element_bud_'></div> */}
							{/* </NavLink> */}
						</a>
					</li>
					<li className='platform_sidebar_element'>
						{/* <a className='title font14 platform_link'> */}
						<NavLink
							activeStyle={{
								backgroundColor: 'rgba(94, 119, 155, 0.25)',
							}}
							className='title font14 platform_link'
							to='/referral'>
							<svg
								width='25'
								height='25'
								viewBox='0 0 25 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M18.773 14.1712L22.1525 10.7912C24.6178 8.32642 24.6178 4.31496 22.1525 1.85017C19.6874 -0.615422 15.6762 -0.615422 13.2112 1.85017L8.33413 6.72722C5.86881 9.19202 5.86881 13.2035 8.33413 15.6683C8.69813 16.0325 9.09653 16.3413 9.51813 16.5979L12.1291 13.9867C11.6317 13.8677 11.16 13.6168 10.7728 13.2299C9.65226 12.1093 9.65226 10.2859 10.7728 9.16562L15.6498 4.28856C16.7704 3.16803 18.5938 3.16803 19.7141 4.28856C20.8346 5.40909 20.8346 7.23229 19.7141 8.35282L18.2813 9.78588C18.8717 11.1755 19.0349 12.7037 18.773 14.1712Z'
									fill='white'
								/>
								<path
									d='M5.22987 9.83097L1.85042 13.2107C-0.615178 15.6758 -0.615178 19.6869 1.85042 22.152C4.31521 24.6173 8.32666 24.6173 10.7917 22.152L15.6685 17.275C18.1338 14.8099 18.1336 10.7987 15.6685 8.33391C15.3048 7.96964 14.9064 7.66085 14.4848 7.40431L11.8739 10.0155C12.3709 10.1347 12.8426 10.3851 13.2301 10.7723C14.3506 11.8928 14.3506 13.716 13.2301 14.8366L8.3528 19.7136C7.23227 20.8341 5.40907 20.8341 4.28854 19.7136C3.16801 18.5931 3.16801 16.7699 4.28854 15.6494L5.7216 14.2166C5.13094 12.827 4.96774 11.2984 5.22987 9.83097Z'
									fill='white'
								/>
							</svg>
							<span className='font14 platform_sidebar_element_text'>
								Referral System
							</span>
							{/* <div className='platform_sidebar_element_bud'>soon</div> */}
							{/* <div className='platform_sidebar_element_bud_'></div> */}
						</NavLink>
						{/* </a> */}
					</li>
					<li className='platform_sidebar_element'>
						{/* VOTING */}

						<a className='title font14 platform_link'>
							{/* <NavLink
                activeStyle={{
                  backgroundColor: 'rgba(94, 119, 155, 0.25)',
                }}
                className="title font14"
                to="/voting"
              > */}
							<svg
								width='25'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12 0C5.38105 0 0 5.38105 0 12C0 18.6189 5.38105 24 12 24C18.6189 24 24 18.6189 24 12C24 5.38105 18.6189 0 12 0ZM12 20.7158C7.2 20.7158 3.28421 16.8 3.28421 12C3.28421 7.2 7.2 3.28421 12 3.28421C16.8 3.28421 20.7158 7.2 20.7158 12C20.7158 16.8 16.8 20.7158 12 20.7158Z'
									fill='white'
								/>
								<path
									d='M14.3495 8.53896L10.9137 11.9747L9.65053 10.7369C9.01895 10.1053 7.98316 10.1053 7.32632 10.7369C6.69474 11.3684 6.69474 12.4042 7.32632 13.0611L9.72632 15.4611C10.0295 15.7642 10.4589 15.9411 10.8884 15.9411C11.3179 15.9411 11.7474 15.7642 12.0505 15.4611L16.6484 10.8632C17.28 10.2316 17.28 9.1958 16.6484 8.53896C16.0168 7.90738 14.9811 7.90738 14.3495 8.53896Z'
									fill='white'
								/>
							</svg>

							<span className='font14 platform_sidebar_element_text'>
								Voting
							</span>
							<div className='platform_sidebar_element_bud'>soon</div>
							<div className='platform_sidebar_element_bud_'></div>
							{/* </NavLink> */}
						</a>
					</li>
					<li className='platform_sidebar_element'>
						<div
							onClick={() => {
								const dropLinks = document.querySelectorAll(
									'.platform_about_links'
								);
								dropLinks[0].classList.toggle('platform_links_appear');
								dropLinks[1].classList.toggle('platform_links_appear');
							}}
							className='title font14 platform_link'>
							<svg
								width='25'
								height='6'
								viewBox='0 0 24 6'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z'
									fill='white'
								/>
								<path
									d='M15 3C15 4.65685 13.6569 6 12 6C10.3431 6 9 4.65685 9 3C9 1.34315 10.3431 0 12 0C13.6569 0 15 1.34315 15 3Z'
									fill='white'
								/>
								<path
									d='M24 3C24 4.65685 22.6569 6 21 6C19.3431 6 18 4.65685 18 3C18 1.34315 19.3431 0 21 0C22.6569 0 24 1.34315 24 3Z'
									fill='white'
								/>
							</svg>
							<span className='font14 platform_sidebar_element_text'>
								About
							</span>
							<svg
								className='platform_about_arrow'
								width='9'
								height='6'
								viewBox='0 0 9 6'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='M4.5 6L0 0L9 1.05995e-06L4.5 6Z' fill='white' />
							</svg>
						</div>
						<a
							href='https://manarium.gitbook.io/manarium/LzHH7vsGZQZtJ9k8cYL3/'
							target='_blank'
							rel='noreferrer'
							className='text font14 platform_about_links'>
							Whitepaper
						</a>
						<a
							href='https://github.com/solidproof/smart-contract-audits/blob/main/SmartContract_Audit_Solidproof_Manarium.pdf'
							target='_blank'
							rel='noreferrer'
							className='text font14 platform_about_links'>
							Audit
							{/* <div className='platform_about_links_bud'>soon</div> */}
						</a>
					</li>
				</ul>
				<Switch>
					<Route path='/games' />
					<Route path='/staking' />
					<Route path='/voting' />
					<Route path='/referral' />
				</Switch>
			</div>
			<div className='platform_content'>
				{contractTour ? (
					<Switch>
						<Route path='/games' children={<Games contract={contractTour} />} />
						<Route
							path='/staking'
							children={<Staking contract={contractStaking} />}
						/>
						<Route path='/voting' />
						<Route
							path='/referral'
							children={<ReferralSystem contract={contractTok} />}
						/>
					</Switch>
				) : null}
			</div>
		</div>
	);
}

export default Platform;
