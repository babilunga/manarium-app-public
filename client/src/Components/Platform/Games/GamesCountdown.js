import '../../../style/Platform/games/gamesCountdown.css';

import { useState, useEffect } from 'react';

function GamesCountdown() {
	const [houRemaining, setHou] = useState(0);
	const [minRemaining, setMin] = useState(0);
	const [secRemaining, setSec] = useState(0);
	const [timeExpired, setTimeExpired] = useState(false);

	useEffect(() => {
		countdown();
		const id = setInterval(() => countdown(id), 1000);
		return () => {
			clearInterval(id);
		};
	}, []);

	const monthFormatter = (num) => {
		let month = '';
		switch (num) {
			case 0:
				month = 'January';
				break;
			case 1:
				month = 'February';
				break;
			case 2:
				month = 'March';
				break;
			case 3:
				month = 'April';
				break;
			case 4:
				month = 'May';
				break;
			case 5:
				month = 'June';
				break;
			case 6:
				month = 'July';
				break;
			case 7:
				month = 'August';
				break;
			case 8:
				month = 'September';
				break;
			case 9:
				month = 'October';
				break;
			case 10:
				month = 'November';
				break;
			case 11:
				month = 'December';
				break;
			default:
				month = 'none';
				break;
		}
		return month;
	};

	const countdown = (id) => {
		try {
			const d = new Date();

			const curentYear = d.getFullYear();
			const curentMounth = monthFormatter(d.getMonth());
			const curentDay = d.getDate();
			const COUNTDOWN_TIME = '18:00:00';

			let countDownDate = new Date(
				`${curentMounth} ${curentDay}, ${curentYear} ${COUNTDOWN_TIME}`
			).getTime();

			const localTime = d.getTime();
			const localOffset = d.getTimezoneOffset() * 60 * 1000;
			const utcNow = localTime + localOffset;

			let distance = countDownDate - utcNow;

			if (distance <= 0) {
				// 60 minutes (from 18:00:00 utc)
				if (distance <= -3600000) {
					setTimeExpired(false);

					let curentMounthNew = curentMounth;
					let curentDayNew = curentDay;
					let curentYearNew = curentYear;

					if (
						new Date(
							`${curentMounth} ${
								curentDay + 1
							}, ${curentYear} ${COUNTDOWN_TIME}`
						).toString() !== 'Invalid Date'
					) {
						curentDayNew += 1;
					} else if (
						new Date(
							`${monthFormatter(
								d.getMonth() + 1
							)} ${curentDay}, ${curentYear} ${COUNTDOWN_TIME}`
						).toString() !== 'Invalid Date'
					) {
						curentMounthNew = monthFormatter(d.getMonth() + 1);
						curentDayNew = 1;
					} else if (
						new Date(
							`${curentMounth} ${curentDay}, ${
								curentYear + 1
							} ${COUNTDOWN_TIME}`
						).toString() !== 'Invalid Date'
					) {
						curentYearNew = curentYear + 1;
						curentMounthNew = monthFormatter(0);
						curentDayNew = 1;
					}

					countDownDate = new Date(
						`${curentMounthNew} ${curentDayNew}, ${curentYearNew} ${COUNTDOWN_TIME}`
					).getTime();
					distance = countDownDate - utcNow;
				} else {
					setTimeExpired(true);
					return;
				}
			}

			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			setHou(hours);
			setMin(minutes);
			setSec(seconds);
		} catch (error) {
			console.log(error);
		}
	};

	const formatter = (num) => {
		const strNum = String(num);
		return strNum.length === 1 ? '0' + strNum : strNum;
	};

	return (
		<div className='games_countdown'>
			<div className='games_countdown_content'>
				{/* <h3 className='title'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'>
            <path
              fill='white'
              d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-7v-8h2v6h5v2z'
            />
          </svg>
          Tournaments paused...
        </h3> */}
				{!timeExpired ? (
					<h3 className='title'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'>
							<path
								fill='white'
								d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-7v-8h2v6h5v2z'
							/>
						</svg>
						Tournament day ends in:
						<div className='text games_clock_face'>
							<span>{formatter(houRemaining)}</span>
							<span>:</span>
							<span>{formatter(minRemaining)}</span>
							<span>:</span>
							<span>{formatter(secRemaining)}</span>
						</div>
					</h3>
				) : (
					<h3
						id='games_countdown_expired'
						className='title'
						style={{ display: 'flex', flexDirection: 'column' }}>
						Tournament day starts in 19:00 UTC
					</h3>
				)}
			</div>
		</div>
	);
}

export default GamesCountdown;
