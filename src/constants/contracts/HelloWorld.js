export const ASSET_CONTRACT_ADDRESS =
  '0x88a23bddb85842bbf4f5b214ec1e0777f2b1ca10';
export const ASSET_ABI_INTERFACE = [
  {
    constant: false,
    inputs: [
      {
        name: '_newString',
        type: 'string',
      },
    ],
    name: 'helloModify',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'increaseCounter',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        name: '_oldCounter',
        type: 'uint256',
      },
      {
        indexed: true,
        name: '_newCounter',
        type: 'uint256',
      },
    ],
    name: 'LogCounterIncreased',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        name: '_helloModified',
        type: 'string',
      },
    ],
    name: 'LogHelloModified',
    type: 'event',
  },
  {
    payable: false,
    stateMutability: 'nonpayable',
    type: 'fallback',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    constant: true,
    inputs: [],
    name: 'counter',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'helloModified',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'helloRaw',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
