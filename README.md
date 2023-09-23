<p align='center'>
    <img src='./img/logo.png' width=400 />
</p>
<br/>

Web3backers
---

Monetize your expertise.

Web3backers connects your existing social accounts and reputation (see lens, linkedin, twitter, etc.) to create a funding page for you to produce and sell content and your time. 

Web3backers pulls information from your existing web3 and web2 networks to create a patreon-like experience without the 10% fees. Get clients and drive an alternative source of revenue.

Currently supported on FEVM, Sepolia, and Neon EVM.

Each page gets its own unique smart contract which tracks user interactions and payments. L2 and low cost chains are used to minimize

A web3 platform for creating content funding similar to onlyfans and patreon but without the middleman.

Example:
Upload
* Chris Buonocore - links to social (lens, twitter).
* Chris is creating web3 tutorials.
* Unlockable content, reveals a cid.
* Get in contact with Chris (XMTP)
* Connect account (Privy)
* Deploy contract per page (Neon, Metamask, Scroll, XDC)
* Unlock (gated content and connection to XMTP)
* NFT API (quicknode)
* Mask (relationservice search) https://docs.next.id/core-concepts/relation-service/rs-example

### Inspiration

### Core functions
* Landing page
* Create page
* User page
    * Chat page
    * Payment page
    * Content page
* Search page
* About page 

### Example Web3backers contract

Sepolia: 0xb1F35230c645C12Bc3066dcdcd774E704983d208
Verification: `cd contracts; yarn verify-sepolia 0xb1F35230c645C12Bc3066dcdcd774E704983d208`

* url: 
* Example verification url:

<h1>Home</h1>
<img src='./img/home.png' width=800>

###

https://docs.privy.io/guide/quickstart
### Sponsors


* Privy: Authentication

Bounty Description:

1inch Developer Portal do have multiple APIs (Balances, Fiat Prices, Portfolio, Swap, Limit Order). Use any of it to enhance your project. Apps with the best use cases will be eligible for bounties

Criteria:

1 - Use portal.1inch.dev APIs (Any of it)

2 - The utilization of 1inch Developer Portal should have a meaningful purpose

Bounty Description:

Develop an innovative DeFi solution on a supported EVM that has a meaningful impact on the community. Your project should introduce novel concepts or functionalities, addressing real-world problems and pushing the boundaries of DeFi

* Filecoin/IPFS: Storage (web3.storage api only likely not enough, needs to use FVM). Contract deployment
* Scroll: Contract deployment
* Neon: Contract deployment
* Airstack: Profiles and social
* Next.id: Profiles and social
* Privy: Authentication
* ENS account abstraction (can use cbono.eth)

Maybe:
* Unlock protocol for gated content
* Quicknode NFT API

* 

## Useful links
* Sponsors: https://ethglobal.com/events/newyork2023/prizes

### Running the app

Copy `.env.sample` - `.env`

Define the included environment variables with your own custom values. This includes keys for filecoin storage, privy authentication, and airstack.


`yarn; yarn dev`

Web3backers should now be running on port 3000.

<!-- <b>Note this project is currently a prototype and would require additional work to be production ready on Chainlink mainnet.</b> -->

### Deployment

1. `yarn build` to generate a production build (note that you must set all env variables in .env).
2. `yarn deploy` is currently set to use surge.sh. Feel free to replace with the distributed host of your choosing.

### Potential future work


## Screenshots / User flow

### Home
<img src="./img/home.png" width=800 />

<!--

Demo flow:


Sponsors:


-->

