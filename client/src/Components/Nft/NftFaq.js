import '../../style/Nft/nft_faq.css';
import { useState } from 'react';
import useMinimize from '../Hooks/useMinimize';
import DATA from '../../data/getData';

function NftFaq() {
	const [faqState, setFaqState] = useState(999);
	const minimize = useMinimize(850);
	return (
		<div className='nft_faq'>
			<div className='nft_faq_content'>
				<h2 className='nft_faq_title title font32 baloo_font'>FAQ</h2>
				<div className='nft_faq_interactive'>
					<NftFaqBlock
						value={0}
						clickHandler={setFaqState}
						open={faqState}
						title={'How to buy?'}
						text={[
							'1. Prepare BNB for transaction fee',
							'2. Approve ARI tokens',
							'3. Press BUY when NFT sale started',
						]}
					/>
					<NftFaqBlock
						value={1}
						clickHandler={setFaqState}
						open={faqState}
						title={'What is the mint price?'}
						text={[
							'2000 ARI',
							'You can buy ARI on ApeSwap:',
							[
								minimize ? 'Click to go on ApeSwap' : DATA.buyApeswapLink,
								DATA.buyApeswapLink,
							],
						]}
					/>
					<NftFaqBlock
						value={2}
						clickHandler={setFaqState}
						open={faqState}
						title={'When is the reveal?'}
						text={['The reveal will be 1 hour after the NFT sale end']}
					/>
					<NftFaqBlock
						value={3}
						clickHandler={setFaqState}
						open={faqState}
						title={'How to use NFT?'}
						text={[
							'Each NFT will give you exclusive access to the new farming game - Manarium Miners.',
							'The rarest NFT you have the more ROI you will get in the game.',
						]}
					/>
				</div>
			</div>
		</div>
	);
}

function NftFaqBlock(props) {
	const { title, text, clickHandler, open, value } = props;
	function handleFaqClick() {
		clickHandler((prev) => (prev === value ? 999 : value));
	}

	return (
		<div
			onClick={(e) => {
				handleFaqClick();
			}}
			style={{ cursor: 'pointer' }}
			className={`nft_faq_interactive_block ${
				open === value ? 'nft_faq_interactive_block_open' : ''
			}`}>
			<div className='nft_faq_interactive_block_title'>
				<h3 className='title font24 baloo_font' style={{ cursor: 'pointer' }}>
					{title}
				</h3>
				<svg
					style={{
						transform: `rotateZ(${open === value ? '180deg' : '0deg'})`,
					}}
					width='21'
					height='8'
					viewBox='0 0 21 8'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10.5898 8L0.589844 -8.74227e-07L20.5898 7.0663e-07L10.5898 8Z'
						fill='white'
					/>
				</svg>
			</div>
			{text.map((item, index) =>
				Array.isArray(item) ? (
					<a
						href={item[1]}
						target='_blank'
						rel='noreferrer'
						onClick={(e) => e.stopPropagation()}
						key={index}
						style={{
							display: 'block',
							marginTop: 20,
							lineHeight: 1,
							textDecoration: 'underline',
							opacity: open === value ? 1 : 0,
							transform: `translateY(${open === value ? '0px' : '15px'}`,
						}}
						className='font18 nft_faq_interactive_content baloo_font'>
						{item[0]}
					</a>
				) : (
					<p
						key={index}
						style={{
							lineHeight: 1,
							opacity: open === value ? 1 : 0,
							transform: `translateY(${open === value ? '0px' : '15px'}`,
							cursor: 'default',
						}}
						className='font18 nft_faq_interactive_content baloo_font'>
						{item}
					</p>
				)
			)}
		</div>
	);
}

export default NftFaq;
