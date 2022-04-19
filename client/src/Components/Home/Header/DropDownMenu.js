import '../../../style/Home/header/header_dropdown.css';

import SecondaryButton from '../../UI/SecondaryButton';
import { Link } from 'react-router-dom';

function DropDownMenu(props) {
	const data = props.data;
	return (
		<div className='header__navbar-dropdown dropdown-apearence'>
			{data.map((item, index) => {
				return item.link ? (
					<a
						href={item.link}
						target='_blank'
						rel='noreferrer'
						key={index}
						className='dropdown__element'>
						{item.imageSrc ? (
							<img
								className='dropdown-image'
								src={item.imageSrc}
								alt='game preview'
							/>
						) : (
							<div className='dropdown-image'></div>
						)}
						<div>
							<h2 className='dropdown-title title'>{item.title}</h2>
							<p className='dropdown-text text'>{item.text}</p>
						</div>
					</a>
				) : (
					<p key={index} className='dropdown__element'>
						{item.imageSrc ? (
							<img
								className='dropdown-image'
								src={item.imageSrc}
								alt='game preview'
							/>
						) : (
							<div className='dropdown-image'></div>
						)}
						<div>
							<h2 className='dropdown-title title'>{item.title}</h2>
							<p className='dropdown-text text'>{item.text}</p>
						</div>
					</p>
				);
			})}
			<Link to='/games'>
				<SecondaryButton classes={'header_dropdown_button'} isDisabled={false}>
					<p className='title font12'>Show all</p>
				</SecondaryButton>
			</Link>
		</div>
	);
}

export default DropDownMenu;
