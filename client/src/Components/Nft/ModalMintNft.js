function ModalMintNft({ hash }) {
	return hash ? (
		<p
			className='title font14'
			style={{
				width: 300,
				height: 32,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background:
					'radial-gradient(100% 1000% at 0% 0%, #86D3FF 0%, #00A3FF 100%)',
				boxShadow: '0px 0px 16px rgba(44, 128, 255, 0.5)',
				borderRadius: 15,
			}}>
			Mint went successfuly{' '}
			<a
				className='font12'
				style={{
					marginLeft: 10,
					textDecoration: 'underline',
					color: 'white',
				}}
				href={`https://bscscan.com/tx/${hash || ''}`}
				rel='noreferrer'
				target='_blank'>
				Transaction link
			</a>
		</p>
	) : (
		<p
			className='title font14'
			style={{
				width: 300,
				height: 32,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background:
					'radial-gradient(100% 1000% at 0% 0%, #86D3FF 0%, #00A3FF 100%)',
				boxShadow: '0px 0px 16px rgba(44, 128, 255, 0.5)',
				borderRadius: 15,
			}}>
			Mint error...
		</p>
	);
}

export default ModalMintNft;
