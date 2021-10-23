const abi = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "registerJudge",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "judge",
      "type": "address"
    }],
    "name": "reportGood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "judge",
      "type": "address"
    }],
    "name": "reportBad",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "address",
        "name": "opponent",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "proofHash",
        "type": "bytes32"
      }
    ],
    "name": "createCase",
    "outputs": [{
      "internalType": "uint256",
      "name": "caseId",
      "type": "uint256"
    }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "participant",
      "type": "address"
    }],
    "name": "getCase",
    "outputs": [{
      "components": [{
          "components": [{
              "internalType": "address",
              "name": "addr",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "proofHash",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "proof",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "collateral",
              "type": "uint256"
            }
          ],
          "internalType": "struct CaseParticipant",
          "name": "requester",
          "type": "tuple"
        },
        {
          "components": [{
              "internalType": "address",
              "name": "addr",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "proofHash",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "proof",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "collateral",
              "type": "uint256"
            }
          ],
          "internalType": "struct CaseParticipant",
          "name": "opponent",
          "type": "tuple"
        },
        {
          "internalType": "address[]",
          "name": "judges",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "judgesRequired",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "enum CaseStates",
          "name": "state",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tally",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "baseCollateral",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiration",
          "type": "uint256"
        }
      ],
      "internalType": "struct CaseData",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "caseId",
      "type": "uint256"
    }],
    "name": "getCaseById",
    "outputs": [{
      "components": [{
          "components": [{
              "internalType": "address",
              "name": "addr",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "proofHash",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "proof",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "collateral",
              "type": "uint256"
            }
          ],
          "internalType": "struct CaseParticipant",
          "name": "requester",
          "type": "tuple"
        },
        {
          "components": [{
              "internalType": "address",
              "name": "addr",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "proofHash",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "proof",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "collateral",
              "type": "uint256"
            }
          ],
          "internalType": "struct CaseParticipant",
          "name": "opponent",
          "type": "tuple"
        },
        {
          "internalType": "address[]",
          "name": "judges",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "judgesRequired",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "enum CaseStates",
          "name": "state",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tally",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "baseCollateral",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiration",
          "type": "uint256"
        }
      ],
      "internalType": "struct CaseData",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "caseId",
      "type": "uint256"
    }],
    "name": "caseContract",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "uint256",
        "name": "caseId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "proofHash",
        "type": "bytes32"
      }
    ],
    "name": "acceptCase",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "uint256",
        "name": "caseId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "proof",
        "type": "string"
      }
    ],
    "name": "discloseProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "uint256",
        "name": "caseId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "win",
        "type": "bool"
      }
    ],
    "name": "setDecision",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "caseId",
      "type": "uint256"
    }],
    "name": "appeal",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "caseId",
      "type": "uint256"
    }],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export default abi;