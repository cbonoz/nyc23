import { sepolia, xdcTestnet, neonDevnet, filecoinCalibration } from 'viem/chains'

export const APP_NAME = 'Web3backers'
// export const APP_DESC = 'Web3backers is a platform for backing and learning from your favorite web3 creators.'
// export const APP_DESC = 'Monetize your expertise.'
export const APP_DESC = 'Your ultimate web3 sidehustle.'

export const NEXTID_BASE_URL='https://proof-service.next.id/'

export const CHAIN_OPTIONS = {
    [sepolia.id]: sepolia,
    // [xdcTestnet.id]: xdcTestnet,
    [neonDevnet.id]: neonDevnet,
    [filecoinCalibration.id]: filecoinCalibration,
}

export const CHAINS = Object.values(CHAIN_OPTIONS)

export const AIRSTACK_KEY = process.env.REACT_APP_AIRSTACK_KEY
export const ACTIVE_CHAIN = CHAIN_OPTIONS[sepolia.id]

export const EXAMPLE_FORM = {
    "id": 1,
    "name": "Chris",
    "purpose": "Chris is creating web3 project tutorials",
    "address": "0x3CCAFaC2Cd44664bBb22F1fe9FBaEbcfcFFB2898",
    "paymentAddress": "0xFc62E94af9aBd25a1D7abfe00F7034Cf154BbBD9",
    "ens": "cbono.eth",
    "offerActive": true,
    "offerDescription": "Purchase a PDF tutorial of building a web3 app from scratch.",
    "offerPrice": .01,
    "consultFee": .02
}

export const generateItem = (id) => {
    return {
        ...EXAMPLE_FORM,
        id,
        createdAt: Date.now(), // timestamp
        price: Math.round(Math.random() * 10) / 10
    }
}


// export const IPFS_BASE_URL = 'https://ipfs.filebase.io/ipfs'
// export const IPFS_BASE_URL = 'https://gateway.pinata.cloud/ipfs'
// export const IPFS_BASE_URL = 'https://saturn.ms/ipfs'
export const IPFS_BASE_URL = 'https://ipfs.io/ipfs'

export const AIRSTACK_QUERY = `query MyQuery($identity: Identity!) {
    Ethereum: Wallet(input: {identity: $identity, blockchain: ethereum}) {
       domains {
         name
       }
       poaps {
         poapEvent {
           eventName
           endDate
           eventURL
         }
       }
     socials{
       profileName
       dappName
     }
       tokenBalances {
         amount
         blockchain
         formattedAmount
         tokenAddress
         tokenId
         tokenNfts {
           contentValue {
             image {
               extraSmall
               large
               original
               medium
               small
             }
           }
         }
       }
     }
   }`