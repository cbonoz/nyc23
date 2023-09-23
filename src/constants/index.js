import { scrollSepolia, xdcTestnet, neonDevnet, filecoinCalibration } from 'wagmi/chains'

export const APP_NAME = 'Web3backers'
// export const APP_DESC = 'Web3backers is a platform for backing and learning from your favorite web3 creators.'
export const APP_DESC = 'Monetize your expertise.'

export const NEXTID_BASE_URL='https://proof-service.next.id/'

export const CHAIN_OPTIONS = {
    [scrollSepolia.id]: scrollSepolia,
    [xdcTestnet.id]: xdcTestnet,
    [neonDevnet.id]: neonDevnet,
    [filecoinCalibration.id]: filecoinCalibration,
}

export const CHAINS = Object.values(CHAIN_OPTIONS)

export const ACTIVE_CHAIN = CHAIN_OPTIONS[534351]

export const EXAMPLE_FORM = {
    "id": 1,
    "name": "Chris",
    "purpose": "Chris is creating web3 projects",
    "address": "0x3CCAFaC2Cd44664bBb22F1fe9FBaEbcfcFFB2898",
    "offers": "",
    "consult": [],
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

export const AIRSTACK_QUERY = `query MyQuery {
    Socials(input: {filter: {identity: {_eq: "cbono.eth"}}, blockchain: ethereum}) {
      Social {
        dappName
        profileName
        profileBio
        profileDisplayName
        profileImage
        profileUrl
        userAddress
        userAssociatedAddresses
        userCreatedAtBlockTimestamp
        userRecoveryAddress
        followerCount
        followingCount
      }
    }
  }`