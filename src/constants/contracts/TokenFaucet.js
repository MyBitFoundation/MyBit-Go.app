export const ADDRESS = '0x66652784Bd48b69D9f20c9046b67150351023707';
export const ABI = [
  {
    constant: true,
    inputs: [],
    name: 'tokensInFaucet',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'database',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address'
      },
      {
        name: '_amount',
        type: 'uint256'
      },
      {
        name: '_token',
        type: 'address'
      },
      {
        name: '_data',
        type: 'bytes'
      }
    ],
    name: 'receiveApproval',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_amount',
        type: 'uint256'
      },
      {
        name: '_pass',
        type: 'string'
      }
    ],
    name: 'register',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newPass',
        type: 'bytes32'
      }
    ],
    name: 'changePass',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'deposit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_amount',
        type: 'uint256'
      },
      {
        name: '_pass',
        type: 'string'
      }
    ],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'oneYear',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'token',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: '_database',
        type: 'address'
      },
      {
        name: '_tokenAddress',
        type: 'address'
      },
      {
        name: '_accessPass',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_sender',
        type: 'address'
      },
      {
        indexed: false,
        name: '_amount',
        type: 'uint256'
      },
      {
        indexed: false,
        name: '_blockNumber',
        type: 'uint256'
      }
    ],
    name: 'TokenWithdraw',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_depositer',
        type: 'address'
      },
      {
        indexed: false,
        name: '_amount',
        type: 'uint256'
      },
      {
        indexed: false,
        name: '_blockNumber',
        type: 'uint256'
      }
    ],
    name: 'TokenDeposit',
    type: 'event'
  }
];
