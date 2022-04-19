import '../../style/UI/headerContainer.css';

function HeaderContainer(props) {
	const { children, classes } = props;
	return (
		<header id='navbar' className={`header ${classes}`}>
			<div className={`header-container`}>{children}</div>
		</header>
	);
}

export default HeaderContainer;
