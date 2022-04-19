import { useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
// import { useTransition, animated } from 'react-spring';

function Modal({
	children,
	position,
	fullscreen,
	blured,
	darkened,
	open,
	setState,
	timeout,
}) {
	// const transition = useTransition(open, {
	// 	from: (item) => async (next) => {
	// 		await next({ opacity: 0 });
	// 	},
	// 	enter: (item) => async (next) => {
	// 		await next({ opacity: 1 });
	// 	},
	// 	leave: (item) => async (next, cancel) => {
	// 		await next({ opacity: 0 });
	// 		await next({ y: -100 });
	// 	},
	// });

	const CONTAINER_STYLE = {
		transition: 'opacity 500ms ease',
		opacity: 0,
		position: 'fixed',
		top:
			position === 'center'
				? '50%'
				: position === 'top'
				? '0'
				: position === 'bottom'
				? 'auto'
				: '0',
		bottom:
			position === 'center'
				? '50%'
				: position === 'top'
				? 'auto'
				: position === 'bottom'
				? '0'
				: 'auto',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: fullscreen ? '100vw' : 'auto',
		height: fullscreen ? '100vh' : 'auto',
		display: 'flex',
		zIndex: 3,
		background: blured
			? 'rgba(0, 0, 0, 0.25)'
			: darkened
			? 'rgba(0, 0, 0, 0.8)'
			: 'transparent',
		backdropFilter: blured && open ? 'blur(20px)' : 'none',
	};
	const MODAL_STYLE = {
		position: 'absolute',
		marginTop: position === 'center' ? 0 : 16,
	};
	const MODAL_POSITION = {
		top:
			position === 'center'
				? '50%'
				: position === 'top'
				? '0'
				: position === 'bottom'
				? 'auto'
				: '0',
		bottom:
			position === 'center'
				? 'auto'
				: position === 'top'
				? 'auto'
				: position === 'bottom'
				? '0'
				: 'auto',
		left: '50%',
		transform:
			position === 'center'
				? 'translate(-50%, -50%)'
				: position === 'top'
				? 'translate(-50%, 0)'
				: position === 'bottom'
				? 'translate(-50%, 0)'
				: 'translate(-50%, 0)',
	};

	const container = useRef(null);

	useEffect(() => {
		let id;
		if (timeout && timeout > 0 && open === true) {
			id = setTimeout(() => {
				setState();
				clearTimeout(id);
			}, timeout + 500);

			id = setTimeout(() => {
				container.current.style.opacity = 0;
			}, timeout);
			id = setTimeout(() => {
				container.current.style.opacity = 1;
			}, 100);
		}
		return () => clearTimeout(id);
	}, [open]);

	return ReactDom.createPortal(
		<>
			{open === true && (
				<div ref={container} style={{ ...CONTAINER_STYLE }}>
					<div style={{ ...MODAL_STYLE, ...MODAL_POSITION }}>{children}</div>
				</div>
			)}
		</>,
		document.getElementById('portal')
	);
}

export default Modal;
