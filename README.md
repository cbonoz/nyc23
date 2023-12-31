<p align='center'>
    <img src='./img/logo.png' width=400 />
</p>
<br/>

Web3backers
---

Web3backers is a smart contract - managed content monetization app that links in social data from your other third party platforms on day one

Web3backers connects your existing web3 and web2 social accounts and information (see ENS< lens, linkedin, twitter, github, on-chain, etc.) to create a funding page for you to drive product sales and paid consults based on your combined reputation.

Web3backers pulls information from your existing web3 and web2 networks to create a patreon-like experience without the 10% fees. Get clients and drive an alternative source of revenue.

Core components:
1. Web3backers enables anyone to create a monetization-focused site pulling many of their existing web2 and web3 social connections without requiring starting over on a greenfield platform.
2. Every web3backer profile page has its own smart contract deployed on either low cost or high through L1/L2 networks such as scroll, neon, and filecoin. 
3. The shareable profile page gives you an overall reputation score based on data from Airstack and Next.ID. Content such as courses can be sold, or a chat opened up directly from the page on XMTP with the creator's wallet address (no emails/subscriptions required).

<!-- Monetize your expertise. -->

<!-- Example:
Upload
* Chris Buonocore - links to social (lens, twitter).
* Chris is creating web3 tutorials.
* Unlockable content, reveals a cid.
* Get in contact with Chris (XMTP)
* Connect account (Privy)
* Deploy contract per page (Neon, Metamask, Scroll, XDC)
* Unlock (gated content and connection to XMTP)
* NFT API (quicknode)
* Mask (relationservice search) https://docs.next.id/core-concepts/relation-service/rs-example -->

<p>Note this project is currently a testnet prototype and would require additional work to be production ready.</p>

Demo url: web3backers.surge.sh

Quick demo video: https://youtu.be/rSb10W75Uao

Note: The app network switch and your wallet network should both set to use the given network.

### Inspiration

Existing platforms for creator monetization exist such as Patreon and Buy Me a Coffee, however many of these fall short in different ways. While Patreon charges fees of up to 12% and operates primarily on web2 principles, Web3backers offers a monetization-focused solution that seamlessly integrates web3 and web2 social connections without the need to start from scratch on a new platform.

 Every Web3backer profile page comes with its own smart contract deployed on efficient L1/L2 networks like Scroll, Neon, and Filecoin, reducing transaction costs and ensuring a more transparent payment process. Additionally, Web3backers provides users with an overall reputation score derived from data from Airstack and Next.ID, enabling creators to sell content like courses and offer paid consultations directly from their profiles without relying on email subscriptions. This innovative approach positions Web3backers as a disruptive force in the creator monetization space, addressing many of the limitations of existing platforms that require centralized management.

 The goal of this project was to create an app that took existing social data and enabled wiring up to a highly auditable/self-governing system (smart contracts) to both facilitate sales of content and drive consulting conversations with potential clients.


### Example Web3backers profile pages


#### Scroll Sepolia 

Example contract: https://sepolia-blockscout.scroll.io/address/0x3868341EC71194425B8E2ac8d6fae3FcB9D8A020 (verified)
Profile page: web3backers.surge.sh/profile/0x3868341EC71194425B8E2ac8d6fae3FcB9D8A020

![Alt text](img/scroll.png)

![Alt text](img/verify.png)

<!-- Example verification: npx hardhat verify --network scrollSepolia 0x3868341EC71194425B8E2ac8d6fae3FcB9D8A020 Chris "Chris is creating web3 project tutorials and is open to consulting." 534351 bafybeidull4upwdt36rb4guypgoixhtiokn6f5jvywf2yt4j3meilxwhmy 10000000000000000 "Purchase a PDF tutorial of building a web3 app from scratch." 20000000000000000 cbono.eth -->

#### Neon DevNet

Example contract: https://devnet.neonscan.org/address/0xdA8562f275f5D93c64Bd993efA30b446EF445171#code (verified)
Profile page: web3backers.surge.sh/profile/0xdA8562f275f5D93c64Bd993efA30b446EF445171

![Alt text](img/neon.png)


#### Filecoin Calibration:

Example contract: https://calibration.filscan.io/address/0xAE985d249B125c7b2CCc000B1D6ea250e1204E41/
Profile page: web3backers.surge.sh/profile/0xAE985d249B125c7b2CCc000B1D6ea250e1204E41

![Alt text](img/fil.png)


### Technologies used

Web3backers adds in a few core technologies around social data aggregation and low-cost contract networks. Technologies and how they are used:

* Filecoin/IPFS: Filecoin/IPFS: Contract deployment compatible with FEVM. Filecoin also serves uploaded content and the smart contract provides an access barrier to the addressed content based on cid. FEVM deployment code here used in app also: Deployment code for testnet FEVM smart contract also used in app.
* Scroll: Contract deployment on L2. Low cost and L2 networks helps reduce transaction fees and improve scalability, making it cost-effective for users and creators to interact with the platform. Scroll adds a level of auditability to all interactions with the profile page.
* Neon: Main Contract deployment option that helps with gating and auditing at low cost / high throughput. Payments for consulting fees can be handled through the platform without the need for email addresses. Neon also adds a level of auditability to all interactions for each user's profile page on an external chain.
* Airstack: Profiles and social. This entire app is around abstracting addresses and focusing on identity and social credibility. Used for the research tab and getting information about potential Web3backers. Mixed with Next.ID for web2 elements, Airstack allows importing a user's social identity into the app without needing recreation. Also used on main profile page.
* Mask/Next.id: Profiles and social APIs. This app is centered around abstracting addresses and focusing on identity and social credibility Relation service data is used to create a universal profile that forms the basis of the Web3backers profile page for each user automatically. Mixed with Airstack, mask/next.id API allows importing a user's social identity into the app without needing recreation. 
* Privy: Privy is part of the root of the application. Authentication experience and transaction signing regardless of wallet. Privy provides a simple user experience for accessing the app and data on the connected smart contracts regardless of network.
* XMTP: XMTP is used for chat functionality within the platform. Users can open direct chats with creators, potentially for consultation or communication related to services or content. 
* ENS: Core component of general profile account lookup abstraction (maps the address -> ENS profile and avatar). A big part of the profile information automatically created is linked through the user's ENS and alternatively DID.
* QuickNode: Used on the infrastructure side. Added an RPC endpoint with scroll for more availability and performance compared to public networks.

### Running the app

Copy `.env.sample` - `.env`

Define the included environment variables with your own custom values. This includes keys for filecoin storage, privy authentication, airstack, etc.

`yarn; yarn dev`

Web3backers should now be running on port 3000.

<!-- <b>Note this project is currently a prototype and would require additional work to be production ready on Chainlink mainnet.</b> -->

### Deployment

1. `yarn build` to generate a production build (note that you must set all env variables in .env).
2. `yarn deploy` is currently set to use surge.sh. Feel free to replace with the distributed host of your choosing.


### Home page
![Alt text](img/home.png) 

## Core functions
* Landing page
* Create page
* User page
    * Chat page
    * Payment page
    * Content page
* Search page
* About page 


### Potential future work


1.  NFT and Token Integration: Exploring opportunities to integrate non-fungible tokens (NFTs) and utility tokens into the platform. This could allow creators to tokenize their content and services, enabling new monetization models, such as NFT sales, token-based memberships, and loyalty rewards for supporters.
2. Enhanced Reputation and Identity Verification: Developing more robust reputation scoring algorithms and identity verification mechanisms to provide users with a more accurate assessment of creators' trustworthiness and expertise. 
3. Enhanced profile search: A search function based on reputation or domain expertise could also help with discovery and recommendations for finding new creators looking for backing or support.
4. Testing and production deployment: Web3backers is currently an app on the testnet. To monetize, Networks and protocols would need to be retested to be compliant with mainnets.

## Screenshots of user flows / Contract creation


![Alt text](img/buy.png) ![Alt text](img/chat.png) ![Alt text](img/confirm.png) ![Alt text](img/contract.png) ![Alt text](img/created.png) ![Alt text](img/deploy.png) ![Alt text](img/privy.png) ![Alt text](img/profile.png) ![Alt text](img/research.png) ![Alt text](img/score.png) ![Alt text](img/xmtp1.png)

## Useful links
* Sponsors: https://ethglobal.com/events/newyork2023/prizes


<!--

Demo flow:


Sponsors:


-->

