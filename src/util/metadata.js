export const USER_CONTRACT = {
  "_format": "hh-sol-artifact-1",
  "contractName": "UserContract",
  "sourceName": "contracts/UserContract.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_purpose",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_chainId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_consultFee",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_ens",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        }
      ],
      "name": "PurchaseEvent",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "active",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "chainId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newPrice",
          "type": "uint256"
        }
      ],
      "name": "changePrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "consultFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deployer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ens",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getCid",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMetadata",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cid",
              "type": "string"
            }
          ],
          "internalType": "struct UserContract.Offer",
          "name": "",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasAccess",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "offer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "purchaseAccess",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "purpose",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "toggleActive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b5060405162001cb138038062001cb183398181016040528101906200003791906200030c565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600060146101000a81548160ff0219169083151502179055508760019081620000a39190620006b1565b508660029081620000b59190620006b1565b50856003819055506040518060600160405280858152602001848152602001868152506005600082015181600001556020820151816001019081620000fb9190620006b1565b506040820151816002019081620001139190620006b1565b509050508160088190555080600490816200012f9190620006b1565b50505050505050505062000798565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001a7826200015c565b810181811067ffffffffffffffff82111715620001c957620001c86200016d565b5b80604052505050565b6000620001de6200013e565b9050620001ec82826200019c565b919050565b600067ffffffffffffffff8211156200020f576200020e6200016d565b5b6200021a826200015c565b9050602081019050919050565b60005b83811015620002475780820151818401526020810190506200022a565b60008484015250505050565b60006200026a6200026484620001f1565b620001d2565b90508281526020810184848401111562000289576200028862000157565b5b6200029684828562000227565b509392505050565b600082601f830112620002b657620002b562000152565b5b8151620002c884826020860162000253565b91505092915050565b6000819050919050565b620002e681620002d1565b8114620002f257600080fd5b50565b6000815190506200030681620002db565b92915050565b600080600080600080600080610100898b03121562000330576200032f62000148565b5b600089015167ffffffffffffffff8111156200035157620003506200014d565b5b6200035f8b828c016200029e565b985050602089015167ffffffffffffffff8111156200038357620003826200014d565b5b620003918b828c016200029e565b9750506040620003a48b828c01620002f5565b965050606089015167ffffffffffffffff811115620003c857620003c76200014d565b5b620003d68b828c016200029e565b9550506080620003e98b828c01620002f5565b94505060a089015167ffffffffffffffff8111156200040d576200040c6200014d565b5b6200041b8b828c016200029e565b93505060c06200042e8b828c01620002f5565b92505060e089015167ffffffffffffffff8111156200045257620004516200014d565b5b620004608b828c016200029e565b9150509295985092959890939650565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004c357607f821691505b602082108103620004d957620004d86200047b565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000504565b6200054f868362000504565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620005926200058c6200058684620002d1565b62000567565b620002d1565b9050919050565b6000819050919050565b620005ae8362000571565b620005c6620005bd8262000599565b84845462000511565b825550505050565b600090565b620005dd620005ce565b620005ea818484620005a3565b505050565b5b81811015620006125762000606600082620005d3565b600181019050620005f0565b5050565b601f82111562000661576200062b81620004df565b6200063684620004f4565b8101602085101562000646578190505b6200065e6200065585620004f4565b830182620005ef565b50505b505050565b600082821c905092915050565b6000620006866000198460080262000666565b1980831691505092915050565b6000620006a1838362000673565b9150826002028217905092915050565b620006bc8262000470565b67ffffffffffffffff811115620006d857620006d76200016d565b5b620006e48254620004aa565b620006f182828562000616565b600060209050601f83116001811462000729576000841562000714578287015190505b62000720858262000693565b86555062000790565b601f1984166200073986620004df565b60005b8281101562000763578489015182556001820191506020850194506020810190506200073c565b868310156200078357848901516200077f601f89168262000673565b8355505b6001600288020188555050505b505050505050565b61150980620007a86000396000f3fe6080604052600436106100e85760003560e01c806398d5fdca1161008a578063c028df0611610059578063c028df06146102b9578063d3419723146102e6578063d5f3948814610323578063f11aaba31461034e576100e8565b806398d5fdca1461021c57806399e288d8146102475780639a8a059214610265578063a2b40d1914610290576100e8565b80633f15457f116100c65780633f15457f1461015a57806370740aab146101855780637a5b4f59146101b057806395a078e8146101df576100e8565b806302fb0c5e146100ed57806306fdde031461011857806329c68dc114610143575b600080fd5b3480156100f957600080fd5b50610102610379565b60405161010f9190610eb0565b60405180910390f35b34801561012457600080fd5b5061012d61038c565b60405161013a9190610f5b565b60405180910390f35b34801561014f57600080fd5b5061015861041a565b005b34801561016657600080fd5b5061016f61049e565b60405161017c9190610f5b565b60405180910390f35b34801561019157600080fd5b5061019a61052c565b6040516101a79190610f5b565b60405180910390f35b3480156101bc57600080fd5b506101c56105ba565b6040516101d6959493929190611046565b60405180910390f35b3480156101eb57600080fd5b5061020660048036038101906102019190611118565b6108c5565b6040516102139190610eb0565b60405180910390f35b34801561022857600080fd5b506102316108e5565b60405161023e9190611145565b60405180910390f35b61024f6108f2565b60405161025c9190610f5b565b60405180910390f35b34801561027157600080fd5b5061027a610b94565b6040516102879190611145565b60405180910390f35b34801561029c57600080fd5b506102b760048036038101906102b2919061118c565b610b9a565b005b3480156102c557600080fd5b506102ce610bff565b6040516102dd939291906111b9565b60405180910390f35b3480156102f257600080fd5b5061030d60048036038101906103089190611118565b610d27565b60405161031a9190610f5b565b60405180910390f35b34801561032f57600080fd5b50610338610e4a565b604051610345919061120d565b60405180910390f35b34801561035a57600080fd5b50610363610e6e565b6040516103709190611145565b60405180910390f35b600060149054906101000a900460ff1681565b6001805461039990611257565b80601f01602080910402602001604051908101604052809291908181526020018280546103c590611257565b80156104125780601f106103e757610100808354040283529160200191610412565b820191906000526020600020905b8154815290600101906020018083116103f557829003601f168201915b505050505081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461047257600080fd5b600060149054906101000a900460ff1615600060146101000a81548160ff021916908315150217905550565b600480546104ab90611257565b80601f01602080910402602001604051908101604052809291908181526020018280546104d790611257565b80156105245780601f106104f957610100808354040283529160200191610524565b820191906000526020600020905b81548152906001019060200180831161050757829003601f168201915b505050505081565b6002805461053990611257565b80601f016020809104026020016040519081016040528092919081815260200182805461056590611257565b80156105b25780601f10610587576101008083540402835291602001916105b2565b820191906000526020600020905b81548152906001019060200180831161059557829003601f168201915b505050505081565b6060806105c5610e74565b6000606060016002600560085460048480546105e090611257565b80601f016020809104026020016040519081016040528092919081815260200182805461060c90611257565b80156106595780601f1061062e57610100808354040283529160200191610659565b820191906000526020600020905b81548152906001019060200180831161063c57829003601f168201915b5050505050945083805461066c90611257565b80601f016020809104026020016040519081016040528092919081815260200182805461069890611257565b80156106e55780601f106106ba576101008083540402835291602001916106e5565b820191906000526020600020905b8154815290600101906020018083116106c857829003601f168201915b50505050509350826040518060600160405290816000820154815260200160018201805461071290611257565b80601f016020809104026020016040519081016040528092919081815260200182805461073e90611257565b801561078b5780601f106107605761010080835404028352916020019161078b565b820191906000526020600020905b81548152906001019060200180831161076e57829003601f168201915b505050505081526020016002820180546107a490611257565b80601f01602080910402602001604051908101604052809291908181526020018280546107d090611257565b801561081d5780601f106107f25761010080835404028352916020019161081d565b820191906000526020600020905b81548152906001019060200180831161080057829003601f168201915b505050505081525050925080805461083490611257565b80601f016020809104026020016040519081016040528092919081815260200182805461086090611257565b80156108ad5780601f10610882576101008083540402835291602001916108ad565b820191906000526020600020905b81548152906001019060200180831161089057829003601f168201915b50505050509050945094509450945094509091929394565b60096020528060005260406000206000915054906101000a900460ff1681565b6000600560000154905090565b6060600060149054906101000a900460ff16610943576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093a906112fa565b60405180910390fd5b6000600560000154141580156109a35750600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b15610a575760056000015434146109ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e69061138c565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610a55573d6000803e3d6000fd5b505b3373ffffffffffffffffffffffffffffffffffffffff167f514a7727631c32fb8ee0600229e363e89e2667e97edd7a6aab5ea5dc0a7c5ae36005600201604051610aa19190611445565b60405180910390a26001600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060056002018054610b1190611257565b80601f0160208091040260200160405190810160405280929190818152602001828054610b3d90611257565b8015610b8a5780601f10610b5f57610100808354040283529160200191610b8a565b820191906000526020600020905b815481529060010190602001808311610b6d57829003601f168201915b5050505050905090565b60035481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610bf257600080fd5b8060056000018190555050565b6005806000015490806001018054610c1690611257565b80601f0160208091040260200160405190810160405280929190818152602001828054610c4290611257565b8015610c8f5780601f10610c6457610100808354040283529160200191610c8f565b820191906000526020600020905b815481529060010190602001808311610c7257829003601f168201915b505050505090806002018054610ca490611257565b80601f0160208091040260200160405190810160405280929190818152602001828054610cd090611257565b8015610d1d5780601f10610cf257610100808354040283529160200191610d1d565b820191906000526020600020905b815481529060010190602001808311610d0057829003601f168201915b5050505050905083565b6060600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610db5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dac906114b3565b60405180910390fd5b60056002018054610dc590611257565b80601f0160208091040260200160405190810160405280929190818152602001828054610df190611257565b8015610e3e5780601f10610e1357610100808354040283529160200191610e3e565b820191906000526020600020905b815481529060010190602001808311610e2157829003601f168201915b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60085481565b60405180606001604052806000815260200160608152602001606081525090565b60008115159050919050565b610eaa81610e95565b82525050565b6000602082019050610ec56000830184610ea1565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f05578082015181840152602081019050610eea565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f2d82610ecb565b610f378185610ed6565b9350610f47818560208601610ee7565b610f5081610f11565b840191505092915050565b60006020820190508181036000830152610f758184610f22565b905092915050565b6000819050919050565b610f9081610f7d565b82525050565b600082825260208201905092915050565b6000610fb282610ecb565b610fbc8185610f96565b9350610fcc818560208601610ee7565b610fd581610f11565b840191505092915050565b6000606083016000830151610ff86000860182610f87565b50602083015184820360208601526110108282610fa7565b9150506040830151848203604086015261102a8282610fa7565b9150508091505092915050565b61104081610f7d565b82525050565b600060a08201905081810360008301526110608188610f22565b905081810360208301526110748187610f22565b905081810360408301526110888186610fe0565b90506110976060830185611037565b81810360808301526110a98184610f22565b90509695505050505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110e5826110ba565b9050919050565b6110f5816110da565b811461110057600080fd5b50565b600081359050611112816110ec565b92915050565b60006020828403121561112e5761112d6110b5565b5b600061113c84828501611103565b91505092915050565b600060208201905061115a6000830184611037565b92915050565b61116981610f7d565b811461117457600080fd5b50565b60008135905061118681611160565b92915050565b6000602082840312156111a2576111a16110b5565b5b60006111b084828501611177565b91505092915050565b60006060820190506111ce6000830186611037565b81810360208301526111e08185610f22565b905081810360408301526111f48184610f22565b9050949350505050565b611207816110da565b82525050565b600060208201905061122260008301846111fe565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061126f57607f821691505b60208210810361128257611281611228565b5b50919050565b7f436f6e747261637420776173206d61726b656420696e6163746976652062792060008201527f63726561746f7200000000000000000000000000000000000000000000000000602082015250565b60006112e4602783610ed6565b91506112ef82611288565b604082019050919050565b60006020820190508181036000830152611313816112d7565b9050919050565b7f496e636f72726563742070726963652c20706c656173652063616c6c20636f6e60008201527f74726163742077697468206e6f6e7a65726f2076616c75650000000000000000602082015250565b6000611376603883610ed6565b91506113818261131a565b604082019050919050565b600060208201905081810360008301526113a581611369565b9050919050565b60008190508160005260206000209050919050565b600081546113ce81611257565b6113d88186610ed6565b945060018216600081146113f357600181146114095761143c565b60ff19831686528115156020028601935061143c565b611412856113ac565b60005b8381101561143457815481890152600182019150602081019050611415565b808801955050505b50505092915050565b6000602082019050818103600083015261145f81846113c1565b905092915050565b7f43616c6c20707572636861736541636365737320746f20676574206369640000600082015250565b600061149d601e83610ed6565b91506114a882611467565b602082019050919050565b600060208201905081810360008301526114cc81611490565b905091905056fea264697066735822122000647addd474d63c1713389bbe6054f91988591bb4416601e5ac61daadbfa62564736f6c63430008130033",
  "deployedBytecode": "0x6080604052600436106100e85760003560e01c806398d5fdca1161008a578063c028df0611610059578063c028df06146102b9578063d3419723146102e6578063d5f3948814610323578063f11aaba31461034e576100e8565b806398d5fdca1461021c57806399e288d8146102475780639a8a059214610265578063a2b40d1914610290576100e8565b80633f15457f116100c65780633f15457f1461015a57806370740aab146101855780637a5b4f59146101b057806395a078e8146101df576100e8565b806302fb0c5e146100ed57806306fdde031461011857806329c68dc114610143575b600080fd5b3480156100f957600080fd5b50610102610379565b60405161010f9190610eb0565b60405180910390f35b34801561012457600080fd5b5061012d61038c565b60405161013a9190610f5b565b60405180910390f35b34801561014f57600080fd5b5061015861041a565b005b34801561016657600080fd5b5061016f61049e565b60405161017c9190610f5b565b60405180910390f35b34801561019157600080fd5b5061019a61052c565b6040516101a79190610f5b565b60405180910390f35b3480156101bc57600080fd5b506101c56105ba565b6040516101d6959493929190611046565b60405180910390f35b3480156101eb57600080fd5b5061020660048036038101906102019190611118565b6108c5565b6040516102139190610eb0565b60405180910390f35b34801561022857600080fd5b506102316108e5565b60405161023e9190611145565b60405180910390f35b61024f6108f2565b60405161025c9190610f5b565b60405180910390f35b34801561027157600080fd5b5061027a610b94565b6040516102879190611145565b60405180910390f35b34801561029c57600080fd5b506102b760048036038101906102b2919061118c565b610b9a565b005b3480156102c557600080fd5b506102ce610bff565b6040516102dd939291906111b9565b60405180910390f35b3480156102f257600080fd5b5061030d60048036038101906103089190611118565b610d27565b60405161031a9190610f5b565b60405180910390f35b34801561032f57600080fd5b50610338610e4a565b604051610345919061120d565b60405180910390f35b34801561035a57600080fd5b50610363610e6e565b6040516103709190611145565b60405180910390f35b600060149054906101000a900460ff1681565b6001805461039990611257565b80601f01602080910402602001604051908101604052809291908181526020018280546103c590611257565b80156104125780601f106103e757610100808354040283529160200191610412565b820191906000526020600020905b8154815290600101906020018083116103f557829003601f168201915b505050505081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461047257600080fd5b600060149054906101000a900460ff1615600060146101000a81548160ff021916908315150217905550565b600480546104ab90611257565b80601f01602080910402602001604051908101604052809291908181526020018280546104d790611257565b80156105245780601f106104f957610100808354040283529160200191610524565b820191906000526020600020905b81548152906001019060200180831161050757829003601f168201915b505050505081565b6002805461053990611257565b80601f016020809104026020016040519081016040528092919081815260200182805461056590611257565b80156105b25780601f10610587576101008083540402835291602001916105b2565b820191906000526020600020905b81548152906001019060200180831161059557829003601f168201915b505050505081565b6060806105c5610e74565b6000606060016002600560085460048480546105e090611257565b80601f016020809104026020016040519081016040528092919081815260200182805461060c90611257565b80156106595780601f1061062e57610100808354040283529160200191610659565b820191906000526020600020905b81548152906001019060200180831161063c57829003601f168201915b5050505050945083805461066c90611257565b80601f016020809104026020016040519081016040528092919081815260200182805461069890611257565b80156106e55780601f106106ba576101008083540402835291602001916106e5565b820191906000526020600020905b8154815290600101906020018083116106c857829003601f168201915b50505050509350826040518060600160405290816000820154815260200160018201805461071290611257565b80601f016020809104026020016040519081016040528092919081815260200182805461073e90611257565b801561078b5780601f106107605761010080835404028352916020019161078b565b820191906000526020600020905b81548152906001019060200180831161076e57829003601f168201915b505050505081526020016002820180546107a490611257565b80601f01602080910402602001604051908101604052809291908181526020018280546107d090611257565b801561081d5780601f106107f25761010080835404028352916020019161081d565b820191906000526020600020905b81548152906001019060200180831161080057829003601f168201915b505050505081525050925080805461083490611257565b80601f016020809104026020016040519081016040528092919081815260200182805461086090611257565b80156108ad5780601f10610882576101008083540402835291602001916108ad565b820191906000526020600020905b81548152906001019060200180831161089057829003601f168201915b50505050509050945094509450945094509091929394565b60096020528060005260406000206000915054906101000a900460ff1681565b6000600560000154905090565b6060600060149054906101000a900460ff16610943576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093a906112fa565b60405180910390fd5b6000600560000154141580156109a35750600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b15610a575760056000015434146109ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e69061138c565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610a55573d6000803e3d6000fd5b505b3373ffffffffffffffffffffffffffffffffffffffff167f514a7727631c32fb8ee0600229e363e89e2667e97edd7a6aab5ea5dc0a7c5ae36005600201604051610aa19190611445565b60405180910390a26001600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060056002018054610b1190611257565b80601f0160208091040260200160405190810160405280929190818152602001828054610b3d90611257565b8015610b8a5780601f10610b5f57610100808354040283529160200191610b8a565b820191906000526020600020905b815481529060010190602001808311610b6d57829003601f168201915b5050505050905090565b60035481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610bf257600080fd5b8060056000018190555050565b6005806000015490806001018054610c1690611257565b80601f0160208091040260200160405190810160405280929190818152602001828054610c4290611257565b8015610c8f5780601f10610c6457610100808354040283529160200191610c8f565b820191906000526020600020905b815481529060010190602001808311610c7257829003601f168201915b505050505090806002018054610ca490611257565b80601f0160208091040260200160405190810160405280929190818152602001828054610cd090611257565b8015610d1d5780601f10610cf257610100808354040283529160200191610d1d565b820191906000526020600020905b815481529060010190602001808311610d0057829003601f168201915b5050505050905083565b6060600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610db5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dac906114b3565b60405180910390fd5b60056002018054610dc590611257565b80601f0160208091040260200160405190810160405280929190818152602001828054610df190611257565b8015610e3e5780601f10610e1357610100808354040283529160200191610e3e565b820191906000526020600020905b815481529060010190602001808311610e2157829003601f168201915b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60085481565b60405180606001604052806000815260200160608152602001606081525090565b60008115159050919050565b610eaa81610e95565b82525050565b6000602082019050610ec56000830184610ea1565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f05578082015181840152602081019050610eea565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f2d82610ecb565b610f378185610ed6565b9350610f47818560208601610ee7565b610f5081610f11565b840191505092915050565b60006020820190508181036000830152610f758184610f22565b905092915050565b6000819050919050565b610f9081610f7d565b82525050565b600082825260208201905092915050565b6000610fb282610ecb565b610fbc8185610f96565b9350610fcc818560208601610ee7565b610fd581610f11565b840191505092915050565b6000606083016000830151610ff86000860182610f87565b50602083015184820360208601526110108282610fa7565b9150506040830151848203604086015261102a8282610fa7565b9150508091505092915050565b61104081610f7d565b82525050565b600060a08201905081810360008301526110608188610f22565b905081810360208301526110748187610f22565b905081810360408301526110888186610fe0565b90506110976060830185611037565b81810360808301526110a98184610f22565b90509695505050505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110e5826110ba565b9050919050565b6110f5816110da565b811461110057600080fd5b50565b600081359050611112816110ec565b92915050565b60006020828403121561112e5761112d6110b5565b5b600061113c84828501611103565b91505092915050565b600060208201905061115a6000830184611037565b92915050565b61116981610f7d565b811461117457600080fd5b50565b60008135905061118681611160565b92915050565b6000602082840312156111a2576111a16110b5565b5b60006111b084828501611177565b91505092915050565b60006060820190506111ce6000830186611037565b81810360208301526111e08185610f22565b905081810360408301526111f48184610f22565b9050949350505050565b611207816110da565b82525050565b600060208201905061122260008301846111fe565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061126f57607f821691505b60208210810361128257611281611228565b5b50919050565b7f436f6e747261637420776173206d61726b656420696e6163746976652062792060008201527f63726561746f7200000000000000000000000000000000000000000000000000602082015250565b60006112e4602783610ed6565b91506112ef82611288565b604082019050919050565b60006020820190508181036000830152611313816112d7565b9050919050565b7f496e636f72726563742070726963652c20706c656173652063616c6c20636f6e60008201527f74726163742077697468206e6f6e7a65726f2076616c75650000000000000000602082015250565b6000611376603883610ed6565b91506113818261131a565b604082019050919050565b600060208201905081810360008301526113a581611369565b9050919050565b60008190508160005260206000209050919050565b600081546113ce81611257565b6113d88186610ed6565b945060018216600081146113f357600181146114095761143c565b60ff19831686528115156020028601935061143c565b611412856113ac565b60005b8381101561143457815481890152600182019150602081019050611415565b808801955050505b50505092915050565b6000602082019050818103600083015261145f81846113c1565b905092915050565b7f43616c6c20707572636861736541636365737320746f20676574206369640000600082015250565b600061149d601e83610ed6565b91506114a882611467565b602082019050919050565b600060208201905081810360008301526114cc81611490565b905091905056fea264697066735822122000647addd474d63c1713389bbe6054f91988591bb4416601e5ac61daadbfa62564736f6c63430008130033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
