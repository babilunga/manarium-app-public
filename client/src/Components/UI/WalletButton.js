import '../../style/UI/walletButton.css';
import { AppContext } from '../App';
import { useState, useEffect } from 'react';
import useMinimize from '../Hooks/useMinimize';

import DATA from '../../data/getData';
import { walletFormating } from '../../helpers/utilities';
import PrimaryButton from './PrimaryButton';
import BigNumber from 'bignumber.js';
import tokenAbi from '../../data/tokenAbi.json';

import { ReactComponent as AriLogo } from '../../img/svg/manarium_logo_white.svg';
import { ReactComponent as Player } from '../../img/svg/player_account.svg';
import player from '../../img/Platform/player.png';

function WalletButton(props) {
	const {
		classesConnect,
		classesAccount,
		onConnect,
		onDisconnect,
		address,
		titleClasses,
	} = props;

	return address ? (
		<Account
			address={address}
			classes={classesAccount}
			disconnect={onDisconnect}
		/>
	) : (
		<Connect
			classes={classesConnect}
			titleClasses={titleClasses}
			connect={onConnect}
		/>
	);
}

function Account(props) {
	const { classes, disconnect, address } = props;
	const [open, setOpen] = useState(false);
	const minimize = useMinimize(940, false);

	return (
		<div
			id={`${open ? 'wallet_button_open' : 'wallet_button_close'}`}
			className={`title font14 ${classes} wallet_button`}
			onClick={() => setOpen(!open)}>
			<div
				id={`${
					minimize ? 'wallet_button_avatar_minified' : 'wallet_button_avatar'
				}`}>
				<img src={player} alt='user default avatar' />
			</div>
			{!minimize && (
				<span style={{ marginLeft: 7 }} className='title font14'>
					{walletFormating({ wallet: address })}
				</span>
			)}
			{!minimize && (
				<svg
					id='wallet_button_arrow'
					className={
						open ? 'wallet_button_arrow_open' : 'wallet_button_arrow_close'
					}
					width='12'
					height='8'
					viewBox='0 0 12 8'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M1.5 1.5L6 6L10.5 1.5'
						stroke='#5E779B'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			)}
			{open && <Dropdown address={address} logout={disconnect} />}
		</div>
	);
}

function Connect(props) {
	const { classes, connect, titleClasses } = props;
	const minimize = useMinimize(660, false);

	return (
		<PrimaryButton
			title={minimize ? 'Connect' : 'Connect wallet'}
			titleClasses={titleClasses}
			onClickFunction={connect}
			classes={classes}
		/>
	);
}

function Dropdown(props) {
	const { logout, address } = props;
	const minimize = useMinimize(660, false);
	const [balance, setBalance] = useState(false);

	useEffect(() => {
		if (address) {
			getBalance(address);
		}
	}, [address]);

	const getBalance = async (address) => {
		const { contractConnect } = await import('../../helpers/utilities');
		const contract = await contractConnect(tokenAbi, DATA.tokenAddress);
		const balanceWei = await contract.methods.balanceOf(address).call();
		setBalance(
			BigNumber(balanceWei).dividedBy(BigNumber(10).pow(18)).toFixed()
		);
	};

	function DropdownItem(props) {
		const { icon, underline } = props;
		return (
			<div
				id={underline ? 'wallet_button_dropdown_item_underline' : ''}
				className='wallet_button_dropdown_item'>
				{icon && <span id='wallet_button_dropdown_icon'>{icon}</span>}
				{props.children}
			</div>
		);
	}

	return (
		<div className='wallet_button_dropdown'>
			<DropdownItem icon={<AriLogo />} underline={minimize}>
				<p className='title font14' style={{ overflowWrap: 'anywhere' }}>
					{balance} ARI
				</p>
			</DropdownItem>
			{minimize && (
				<DropdownItem icon={<Player />}>
					<p className='title font14'>
						{walletFormating({ wallet: address, start: 6 })}
					</p>
				</DropdownItem>
			)}
			<DropdownItem>
				<button onClick={logout} className='title font12 wallet_button_logout'>
					Logout
				</button>
			</DropdownItem>
		</div>
	);
}

const WalletButtonContainer = (props) => {
	return (
		<AppContext.Consumer>
			{(context) => (
				<WalletButton
					onConnect={context.onConnect}
					onDisconnect={context.onDisconnect}
					address={context.address}
					web3Account={context.web3Account}
					{...props}
				/>
			)}
		</AppContext.Consumer>
	);
};

export default WalletButtonContainer;
