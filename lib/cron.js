import cron from 'node-cron';

// Run every 21:00 UTC
cron.schedule(
	'0 21 * * *',
	() => {
		// console.log('I start everyday in 21:00 UTC.');
	},
	{
		timezone: 'Europe/Dublin',
	}
);
