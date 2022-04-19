import '../../../style/Nft/nft_hero_parallax.css';

import Parallax from 'parallax-js';
import trees_back from '../../../img/Nft/trees_back.png';
import trees_mid from '../../../img/Nft/trees_mid.png';
import tree_front_left from '../../../img/Nft/tree_front_left.png';
import tree_front_right from '../../../img/Nft/tree_front_right.png';
import light from '../../../img/Nft/light.png';
import { useEffect } from 'react';

function NftParallax() {
	useEffect(() => {
		const scene = document.getElementById('scene');
		new Parallax(scene, {
			calibrateX: true,
			invertY: true,
			limitX: 15,
		});
	}, []);

	return (
		<div className='nft_hero_parralax' id='scene'>
			<div
				id='nft_hero_parallax_back'
				className='nft_hero_parallax_layer'
				data-depth-x='0.3'>
				<img src={trees_back} alt='' />
			</div>
			<div
				id='nft_hero_parallax_mid'
				className='nft_hero_parallax_layer'
				data-depth-x='0.4'>
				<img src={trees_mid} alt='' />
			</div>
			<div
				id='nft_hero_parallax_left_tree'
				className='layer nft_hero_parallax_layer'
				data-depth-x='0.5'>
				<img src={tree_front_left} alt='' />
			</div>
			<div
				id='nft_hero_parallax_right_tree'
				className='layer nft_hero_parallax_layer'
				data-depth-x='0.55'>
				<img src={tree_front_right} alt='' />
			</div>
			<div
				id='nft_hero_parallax_light_id'
				className='layer nft_hero_parallax_layer'
				data-depth-x='4'>
				<img src={light} alt='' />
			</div>
		</div>
	);
}

export default NftParallax;
