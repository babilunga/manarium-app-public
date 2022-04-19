import { useState } from 'react';
import useMinimize from '../Hooks/useMinimize';

function PopUpInfo(props) {
	const { children, toggle, card, active = true } = props;
	const [popupShow, setPopupShow] = useState(false);
	const minimize = useMinimize(810, false);

	const popup_toggle_wrap = {
		position: 'absolute',
		width: toggle?.width ?? 'max-content',
		height: 'max-content',
		opacity: 0.9,
		zIndex: 2,
	};

	const popup_toggle = {
		width: toggle?.width ?? 'max-content',
		height: ' max-content',
		fontSize: 0,
	};

	const toggle_position =
		toggle?.position === 'relative'
			? {
					position: 'relative',
			  }
			: toggle?.position === 'top-left'
			? {
					top: 0,
					left: 0,
					transform: `translate(${toggle?.offset ?? ''}, ${
						toggle?.offset ?? ''
					})`,
			  }
			: toggle?.position === 'top-right'
			? {
					top: 0,
					right: 0,
					transform: `translate(-${toggle?.offset ?? ''}, ${
						toggle?.offset ?? ''
					})`,
			  }
			: toggle?.position === 'bottom-left'
			? {
					bottom: 0,
					left: 0,
					transform: `translate(${toggle?.offset ?? ''}, -${
						toggle?.offset ?? ''
					})`,
			  }
			: toggle?.position === 'bottom-right'
			? {
					bottom: 0,
					right: 0,
					transform: `translate(-${toggle?.offset ?? ''}, -${
						toggle?.offset ?? ''
					})`,
			  }
			: toggle?.position === 'top'
			? {
					top: 0,
					left: '50%',
					transform: `translate(-50%, ${toggle?.offset ?? ''})`,
			  }
			: toggle?.position === 'right'
			? {
					top: '50%',
					right: 0,
					transform: `translate(-${toggle?.offset ?? ''}, -50%)`,
			  }
			: toggle?.position === 'bottom'
			? {
					left: '50%',
					bottom: 0,
					transform: `trnaslate(-50%, -${toggle?.offset ?? ''})`,
			  }
			: toggle?.position === 'left'
			? {
					left: 0,
					top: '50%',
					transform: `translate(${toggle?.offset ?? ''}, -50%)`,
			  }
			: {
					top: 0,
					left: 0,
					transform: `translate(${toggle?.offset ?? ''}, ${
						toggle?.offset ?? ''
					})`,
			  };

	const popup_card = {
		position: 'absolute',
		width: 'max-content',
		maxWidth: card?.width ?? 'max-content',
		height: 'max-content',
		paddingInline: '1em',
		paddingBlock: '0.6em',
		borderRadius: 12,
		backgroundColor: 'rgba(56, 56, 87, 1)',
		zIndex: 3,
	};

	const card_position =
		card?.position === 'top-left'
			? {
					bottom: 'calc(100% + 7px)',
					left: -10,
					transform: `translateY(-${card?.offset ?? ''})`,
			  }
			: card?.position === 'top-right'
			? {
					bottom: 'calc(100% + 7px)',
					right: -10,
					transform: `translateY(-${card?.offset ?? ''})`,
			  }
			: card?.position === 'bottom-left'
			? {
					top: 'calc(100% + 7px)',
					left: -10,
					transform: `translateY(${card?.offset ?? ''})`,
			  }
			: card?.position === 'bottom-right'
			? {
					top: 'calc(100% + 7px)',
					right: -10,
					transform: `translateY(${card?.offset ?? ''})`,
			  }
			: card?.position === 'top'
			? {
					bottom: 'calc(100% + 7px)',
					left: '50%',
					transform: `translate(-50%, -${card?.offset ?? ''})`,
			  }
			: card?.position === 'right'
			? {
					top: '50%',
					left: 'calc(100% + 7px)',
					transform: `translate(${card?.offset ?? ''}, -50%)`,
			  }
			: card?.position === 'bottom'
			? {
					top: '100%',
					left: '50%',
					transform: `translate(-50%, ${card?.offset ?? ''})`,
			  }
			: card?.position === 'left'
			? {
					right: 'calc(100% + 7px)',
					top: '50%',
					transform: `translate(-${card?.offset ?? ''}, -50%)`,
			  }
			: {
					bottom: '100%',
					left: '50%',
					transform: `translate(-50%, ${card?.offset ?? ''})`,
			  };

	const popup_arrow = {
		position: 'absolute',
		width: 15,
		height: 15,
		transform: 'rotateZ(45deg)',
		backgroundColor: 'rgba(56, 56, 87, 1)',
		borderRadius: 2,
		zIndex: -1,
	};

	const arrow_position =
		card?.position === 'top-left'
			? {
					top: `calc(100% - ${15 / 2 + 3}px`,
					left: 10,
			  }
			: card?.position === 'top-right'
			? {
					top: `calc(100% - ${15 / 2 + 3}px`,
					right: 10,
			  }
			: card?.position === 'bottom-left'
			? {
					bottom: `calc(100% - ${15 / 2 + 3}px`,
					left: 10,
			  }
			: card?.position === 'bottom-right'
			? {
					bottom: `calc(100% - ${15 / 2 + 3}px`,
					right: 10,
			  }
			: card?.position === 'top'
			? {
					top: `calc(100% - ${15 / 2 + 3}px`,
					left: '50%',
					transform: `translateX(-50%) rotateZ(45deg)`,
			  }
			: card?.position === 'right'
			? {
					top: '50%',
					left: -15 / 2 + 3,
					transform: `translateY(-50%) rotateZ(45deg)`,
			  }
			: card?.position === 'bottom'
			? {
					bottom: `calc(100% - ${15 / 2 + 3}px)`,
					left: '50%',
					transform: `translateX(-50%) rotateZ(45deg)`,
			  }
			: card?.position === 'left'
			? {
					top: '50%',
					right: -15 / 2 + 3,
					transform: `translateY(-50%) rotateZ(45deg)`,
			  }
			: {
					bottom: '100%',
					left: '50%',
			  };

	return (
		<div style={{ ...popup_toggle_wrap, ...toggle_position }}>
			<div
				onMouseEnter={() => (active && !minimize ? setPopupShow(true) : null)}
				onMouseLeave={() => (active ? setPopupShow(false) : null)}
				onClick={() =>
					active ? setPopupShow((prev) => (popupShow ? !prev : true)) : null
				}
				style={popup_toggle}>
				{children}
			</div>
			{popupShow && active && (
				<div
					className={`title font12`}
					style={{ ...popup_card, ...card_position }}>
					{card.text}
					<div style={{ ...popup_arrow, ...arrow_position }}></div>
				</div>
			)}
		</div>
	);
}

export default PopUpInfo;
