/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
const CountdownHOC = (
	Component,
	countdownTime = '',
	countdownDate = new Date()
) =>
	function CountdownComponent() {
		const [hoursRemaining, setHours] = useState(0);
		const [minutesRemaining, setMinutes] = useState(0);
		const [secondsRemaining, setSeconds] = useState(0);
		const [timeExpired, setTimeExpired] = useState(false);
		const [id, setId] = useState();

		useEffect(() => {
			countdown();
			if (id === undefined) {
				console.log(id);
				const timeout = setInterval(() => countdown(), 1000);
				setId(timeout);
			}

			return () => {
				clearInterval(id);
			};
		}, []);

		function monthFormatter(num) {
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
		}

		function countdown() {
			try {
				const date = new Date();
				const curentYear = date.getFullYear();
				const curentMounth = monthFormatter(date.getMonth());
				const curentDay = date.getDate();
				const COUNTDOWN_TIME = countdownTime;

				let countDownDateFull = new Date(
					`${curentMounth} ${curentDay}, ${curentYear} ${COUNTDOWN_TIME}`
				).getTime();

				const localTime = date.getTime();
				const localOffset = date.getTimezoneOffset() * 60 * 1000;
				const utcNow = localTime + localOffset;

				let distance = countDownDateFull - utcNow;

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
									date.getMonth() + 1
								)} ${curentDay}, ${curentYear} ${COUNTDOWN_TIME}`
							).toString() !== 'Invalid Date'
						) {
							curentMounthNew = monthFormatter(date.getMonth() + 1);
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

						countDownDateFull = new Date(
							`${curentMounthNew} ${curentDayNew}, ${curentYearNew} ${COUNTDOWN_TIME}`
						).getTime();
						distance = countDownDateFull - utcNow;
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

				setHours(hours);
				setMinutes(minutes);
				setSeconds(seconds);
			} catch (error) {
				console.log(error);
			}
		}

		const formated = (num = 0) =>
			String(num).length === 1 ? '0' + String(num) : String(num);

		return (
			<Component
				timeExpired={timeExpired}
				hours={formated(hoursRemaining)}
				minutes={formated(minutesRemaining)}
				seconds={formated(secondsRemaining)}
			/>
		);
	};

export default CountdownHOC;
