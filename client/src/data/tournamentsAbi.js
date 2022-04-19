const getAbi = () => {
	const abi = [
		{
			inputs: [
				{
					internalType: 'address',
					name: 'token_',
					type: 'address',
				},
			],
			stateMutability: 'nonpayable',
			type: 'constructor',
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'previousOwner',
					type: 'address',
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'newOwner',
					type: 'address',
				},
			],
			name: 'OwnershipTransferred',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: 'string',
					name: 'title',
					type: 'string',
				},
				{
					indexed: false,
					internalType: 'address',
					name: 'owner',
					type: 'address',
				},
			],
			name: 'TournamentAdded',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: 'string',
					name: 'title',
					type: 'string',
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'rewards',
					type: 'uint256',
				},
			],
			name: 'TournamentFinilized',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: 'string',
					name: 'title',
					type: 'string',
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'player',
					type: 'address',
				},
			],
			name: 'TournamentJoined',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: 'string',
					name: 'title',
					type: 'string',
				},
				{
					indexed: false,
					internalType: 'bool',
					name: 'status',
					type: 'bool',
				},
			],
			name: 'TournamentPauseStateChanged',
			type: 'event',
		},
		{
			inputs: [],
			name: 'PROCENT_DENOMINATOR',
			outputs: [
				{
					internalType: 'uint16',
					name: '',
					type: 'uint16',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'addTournamentReward',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'burnFees',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'developmentFees',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'developmentWallet',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'owner',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'ownerFees',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'prizePoolReward',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'prizePoolWallet',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'renounceOwnership',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'newOwner',
					type: 'address',
				},
			],
			name: 'transferOwnership',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getTournaments',
			outputs: [
				{
					internalType: 'string[]',
					name: '',
					type: 'string[]',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'getTotalPlayers',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [],
			name: 'getTotalRewards',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
			],
			name: 'getTournamentInfo',
			outputs: [
				{
					internalType: 'string',
					name: 'title',
					type: 'string',
				},
				{
					internalType: 'address',
					name: 'owner',
					type: 'address',
				},
				{
					internalType: 'bool',
					name: 'paused',
					type: 'bool',
				},
				{
					internalType: 'uint256',
					name: 'num',
					type: 'uint256',
				},
				{
					internalType: 'uint256',
					name: 'version',
					type: 'uint256',
				},
				{
					internalType: 'uint256',
					name: 'entry',
					type: 'uint256',
				},
				{
					internalType: 'uint256',
					name: 'pool',
					type: 'uint256',
				},
				{
					internalType: 'uint256',
					name: 'countPlayers',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'amount_',
					type: 'uint256',
				},
			],
			name: 'updateOwnerUploadReward',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'amount_',
					type: 'uint256',
				},
			],
			name: 'updatePrizePoolReward',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'fees_',
					type: 'uint256',
				},
			],
			name: 'updateOwnerFees',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'fees_',
					type: 'uint256',
				},
			],
			name: 'updateDevelopmentFees',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'fees_',
					type: 'uint256',
				},
			],
			name: 'updateBurnFees',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'token_',
					type: 'address',
				},
			],
			name: 'updateTokenAddress',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'wallet_',
					type: 'address',
				},
			],
			name: 'updatePrizePoolWallet',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'wallet_',
					type: 'address',
				},
			],
			name: 'updateDevelopmentWallet',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
				{
					internalType: 'address',
					name: 'owner_',
					type: 'address',
				},
				{
					internalType: 'uint256',
					name: 'entry_',
					type: 'uint256',
				},
			],
			name: 'addTournament',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
				{
					internalType: 'uint256',
					name: 'version',
					type: 'uint256',
				},
			],
			name: 'updateTournamentVersion',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
				{
					internalType: 'uint256',
					name: 'entry_',
					type: 'uint256',
				},
			],
			name: 'updateTournamentEntry',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
				{
					internalType: 'address',
					name: 'owner_',
					type: 'address',
				},
			],
			name: 'updateTournamentOwner',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
				{
					internalType: 'bool',
					name: 'paused_',
					type: 'bool',
				},
			],
			name: 'pauseTournament',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
				{
					internalType: 'address',
					name: 'player',
					type: 'address',
				},
			],
			name: 'playerEntred',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
			],
			name: 'tournamentEntryCost',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
			],
			name: 'tournamentPlayersCount',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
			],
			name: 'tournamentPool',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
			constant: true,
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
				{
					internalType: 'uint256',
					name: 'version',
					type: 'uint256',
				},
			],
			name: 'joinTournament',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'string',
					name: 'title_',
					type: 'string',
				},
				{
					internalType: 'address[]',
					name: 'winners',
					type: 'address[]',
				},
				{
					internalType: 'uint256[]',
					name: 'amounts',
					type: 'uint256[]',
				},
			],
			name: 'finilizeTournament',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'nonpayable',
			type: 'function',
		},
	];
	return abi;
};

export default getAbi;
