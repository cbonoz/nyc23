import React from "react"
import ReactMarkdown from "react-markdown"
import { APP_NAME } from "../constants"

import logo from './../assets/logo.png'
import { Button } from "antd"
import { useNavigate } from "react-router"

// TODO: replace markdown here

const text = `

Web3backers
---

Web3backers connects your existing web3 and web2 social accounts and information (see ENS< lens, linkedin, twitter, github, on-chain, etc.) to create a funding page for you to drive product sales and paid consults based on your combined reputation.

Web3backers pulls information from your existing web3 and web2 networks to create a patreon-like experience without the 10% fees. Get clients and drive an alternative source of revenue.

Three big pieces are:
1. Web3backers enables anyone to create a monetization-focused site pulling many of their existing web2 and web3 social connections without requiring starting over on a greenfield platform.
2. Every web3backer profile page has its own smart contract deployed on either low cost or high through L1/L2 networks such as scroll, neon, and filecoin. 
3. The shareable profile page gives you an overall reputation score based on data from Airstack and Next.ID. Content such as courses can be sold, or a chat opened up directly from the page on XMTP with the creator's wallet address (no emails/subscriptions required).

`

export const About = () => {
    const navigate = useNavigate();
    return <div>
        <br />
        <img src={logo} className='about-logo'></img>
        <br />
        <br />
        <h1>About</h1>
        <ReactMarkdown>{text}</ReactMarkdown>
        <b>{APP_NAME} is an open source project built for the EthNYC 2023.<br/><br/> View the code here:</b>
        <br/>
        <br/>
        <p>
            <a href="https://github.com/cbonoz/nyc23" target="_blank">Github</a>
        </p>

           {/* Create listing */}
           <Button type="primary" onClick={() => {
                navigate('/create')
            }}>Create new listing</Button>&nbsp;
    </div>
}