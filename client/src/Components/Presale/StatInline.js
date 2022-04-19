import React from 'react';
import { useEffect, useState } from 'react';

function StatInline({ title, text, wrappable }) {
	const [address, setAddress] = useState(text);
	const [copyBtn, setCopyBtn] = useState(false);
	const [copyText, setCopyText] = useState('coppy to clipboard');

	useEffect(() => {
		if (title === 'Token Address' && window.screen.width < 678) {
			const addr = addressFormater(text);
			setAddress(addr);
		}
		if (title === 'Token Address' && window.screen.width < 1000) {
			setCopyBtn(true);
		}
	}, []);

	const addressFormater = (wallet) => {
		const first = wallet.slice(0, 8);
		const second = wallet.slice(-8);
		return first.concat('...', second);
	};

	const copyToClipboard = () => {
		setCopyText('address copied to clipboard');
		navigator.clipboard.writeText(text);
	};

	const mobCopyToClipboard = () => {
		const copyBudEl = document.querySelector('.copyBud');
		copyBudEl.classList.add('mobileBudAppear');
		setTimeout(() => {
			copyBudEl.classList.remove('mobileBudAppear');
		}, 1900);

		setCopyText('address copied to clipboard');
		navigator.clipboard.writeText(text);
	};

	const resetCopyText = () => {
		setCopyText('coppy to clipboard');
	};

	return (
		<div
			className={`presale_card_stats_row ${
				wrappable ? 'presale_card_stats_row_wrap' : ''
			}`}
			onClick={
				title === 'Token Address' && copyBtn
					? mobCopyToClipboard
					: copyToClipboard
			}
			onMouseLeave={title === 'Token Address' ? resetCopyText : () => {}}>
			{title === 'Token Address' ? (
				<div className='copyBud'>{copyText}</div>
			) : null}
			<p className='font14 fw500 title'>{title}</p>
			<p
				className={`font14 fw500 title ${
					title === 'Status' || title === 'Sale Type' ? 'stats_row_blue ' : ''
				}`}>
				{address}
				{title === 'Token Address' && copyBtn && (
					<svg
						className='presale_card_stats_copybtn'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 30 30'>
						<path d='M 11 2 C 9.895 2 9 2.895 9 4 L 9 20 C 9 21.105 9.895 22 11 22 L 24 22 C 25.105 22 26 21.105 26 20 L 26 8.5 C 26 8.235 25.895031 7.9809687 25.707031 7.7929688 L 20.207031 2.2929688 C 20.019031 2.1049687 19.765 2 19.5 2 L 11 2 z M 19 3.9042969 L 24.095703 9 L 20 9 C 19.448 9 19 8.552 19 8 L 19 3.9042969 z M 6 7 C 4.895 7 4 7.895 4 9 L 4 25 C 4 26.105 4.895 27 6 27 L 19 27 C 20.105 27 21 26.105 21 25 L 21 24 L 11 24 C 8.794 24 7 22.206 7 20 L 7 7 L 6 7 z'></path>
					</svg>
				)}
			</p>
		</div>
	);
}

export default StatInline;
