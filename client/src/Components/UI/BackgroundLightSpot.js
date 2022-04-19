function BackgroundLightSpot({
	width,
	height,
	maxWidth,
	maxHeight,
	top,
	left,
}) {
	return (
		<div
			style={{
				opacity: 1,
				position: 'absolute',
				top,
				left: left || '50%',
				transform: left ? '' : 'translateX(-50%)',
				width,
				height,
				maxWidth,
				maxHeight,
				background:
					'radial-gradient(50% 50% at 50% 50%,rgba(0, 163, 255, 0.4) 0%,rgba(0, 26, 255, 0) 100%)',
				backgroundRepeat: 'no-repeat',
				zIndex: -1,
			}}></div>
	);
}

export default BackgroundLightSpot;
