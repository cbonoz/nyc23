import React from "react"
import ReactMarkdown from "react-markdown"
import { APP_NAME } from "../constants"

import logo from './../assets/logo.png'
import { Button } from "antd"
import { useNavigate } from "react-router"

// TODO: replace markdown here

const text = `

Web3backers
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