import '../../../style/Nft/nft_hero.css';

import miners from '../../../img/Nft/miners.png';
import useMinimize from '../../Hooks/useMinimize';
import PopUpInfo from '../../UI/PopUpInfo';
import { useState } from 'react';
import Modal from '../../UI/Modal';
import ModalLayout from '../../UI/ModalLayout';

function NftHero() {
	const minimizeContract = useMinimize(425);
	const activePopup = useMinimize(768);
	const [modal, setModal] = useState(false);

	return (
		<div className='nft_hero'>
			<Modal
				position={'top'}
				fullscreen={false}
				open={modal}
				timeout={2500}
				setState={setModal}>
				<ModalLayout text='NFT contract copied' />
			</Modal>
			<div className='nft_hero_content'>
				<img src={miners} alt='123' />
				<p className='baloo_font nft_hero_text title font18'>
					Limited collection of{' '}
					<span className='baloo_font title font18'>333</span> unique NFTs
				</p>
				<div className='nft_hero_contract_container'>
					<PopUpInfo
						active={!activePopup}
						toggle={{ position: 'relative', offset: '', width: '100%' }}
						card={{
							text: 'Copy NFT contract',
							position: 'bottom',
							offset: '10px',
						}}>
						<p
							className='baloo_font title nft_hero_contract'
							onClick={() => {
								navigator.clipboard.writeText(
									'0xBF14b2371aB2d9D10E86807825b77f6B9EFE2C7C'
								);
								setModal(true);
							}}>
							{minimizeContract
								? '0xBF14b237...6B9EFE2C7C'
								: '0xBF14b2371aB2d9D10E86807825b77f6B9EFE2C7C'}
							<svg
								className='nft_hero_contract_copy_btn'
								width='20'
								height='20'
								fill='#ffffff'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 30 30'>
								<path d='M 11 2 C 9.895 2 9 2.895 9 4 L 9 20 C 9 21.105 9.895 22 11 22 L 24 22 C 25.105 22 26 21.105 26 20 L 26 8.5 C 26 8.235 25.895031 7.9809687 25.707031 7.7929688 L 20.207031 2.2929688 C 20.019031 2.1049687 19.765 2 19.5 2 L 11 2 z M 19 3.9042969 L 24.095703 9 L 20 9 C 19.448 9 19 8.552 19 8 L 19 3.9042969 z M 6 7 C 4.895 7 4 7.895 4 9 L 4 25 C 4 26.105 4.895 27 6 27 L 19 27 C 20.105 27 21 26.105 21 25 L 21 24 L 11 24 C 8.794 24 7 22.206 7 20 L 7 7 L 6 7 z'></path>
							</svg>
						</p>
					</PopUpInfo>
				</div>
			</div>
			<div className='nft_hero_back'></div>
		</div>
	);
}

export default NftHero;
