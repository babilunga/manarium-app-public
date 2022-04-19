/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
const CountdownHOC = (Component, countdownTime = '', countdownDate) =>
	function CountdownComponent() {
		const [daysRemaining, setDays] = useState(0);
		const [hoursRemaining, setHours] = useState(0);
		const [minutesRemaining, setMinutes] = useState(0);
		const [secondsRemaining, setSeconds] = useState(0);
		const [timeExpired, setTimeExpired] = useState(false);
		const [id, setId] = useState(null);

		useEffect(() => {
			countdown();
			const interval = setInterval(() => countdown(), 1000);
			setId(interval);

			return () => {
				clearInterval(interval);
			};
		}, []);

		const mounthText = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		function countdown() {
			try {
				const dateNow = new Date();

				const curentYear = dateNow.getFullYear();
				const curentMounth = mounthText[dateNow.getMonth()];
				const curentDay = dateNow.getDate();

				const COUNTDOWN_TIME = countdownTime;

				let countDownDateDaily = new Date(
					countdownDate !== undefined
						? `${countdownDate.m} ${countdownDate.d}, ${countdownDate.y} ${COUNTDOWN_TIME}`
						: `${curentMounth} ${curentDay}, ${curentYear} ${COUNTDOWN_TIME}`
				).getTime();

				const localTime = dateNow.getTime();
				const localOffset = dateNow.getTimezoneOffset() * 60 * 1000;
				const utcNow = localTime + localOffset;

				let distance = countDownDateDaily - utcNow;

				if (distance <= 0) {
					if (countdownDate !== undefined) {
						setTimeExpired(true);
						clearInterval(id);
						return;
					}

					if (distance <= -3600000) {
						// 60 minutes after tech time
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
								`${
									mounthText[dateNow.getMonth() + 1]
								} ${curentDay}, ${curentYear} ${COUNTDOWN_TIME}`
							).toString() !== 'Invalid Date'
						) {
							curentMounthNew = mounthText[dateNow.getMonth() + 1];
							curentDayNew = 1;
						} else if (
							new Date(
								`${curentMounth} ${curentDay}, ${
									curentYear + 1
								} ${COUNTDOWN_TIME}`
							).toString() !== 'Invalid Date'
						) {
							curentYearNew = curentYear + 1;
							curentMounthNew = mounthText[0];
							curentDayNew = 1;
						}

						countDownDateDaily = new Date(
							`${curentMounthNew} ${curentDayNew}, ${curentYearNew} ${COUNTDOWN_TIME}`
						).getTime();
						distance = countDownDateDaily - utcNow;
					} else {
						// Inside the Tech Time
						setTimeExpired(true);
						return;
					}
				}

				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				setDays(days);
				setHours(hours);
				setMinutes(minutes);
				setSeconds(seconds);
			} catch (error) {
				console.log('Countdown error:', error);
			}
		}

		const formated = (num = 0) =>
			String(num).length === 1 ? '0' + String(num) : String(num);

		return (
			<Component
				timeExpired={timeExpired}
				days={formated(daysRemaining)}
				hours={formated(hoursRemaining)}
				minutes={formated(minutesRemaining)}
				seconds={formated(secondsRemaining)}
			/>
		);
	};

export default CountdownHOC;
