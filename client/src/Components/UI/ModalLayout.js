function ModalLayout({ text = 'Copied', type = 'info' }) {
	return (
		<p
			className='title font14'
			style={{
				width: 290,
				height: 'auto',
				minHight: 32,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				paddingBlock: 5,
				background:
					type === 'warning'
						? 'radial-gradient(100% 1000% at 0% 0%, #ff9b69 0%, #ff5500 100%)'
						: 'radial-gradient(100% 1000% at 0% 0%, #86D3FF 0%, #00A3FF 100%)',
				boxShadow:
					type === 'warning'
						? '0px 0px 16px rgba(255, 107, 44, 0.5)'
						: '0px 0px 16px rgba(44, 128, 255, 0.5)',
				borderRadius: 15,
			}}>
			{text}
		</p>
	);
}

export default ModalLayout;
