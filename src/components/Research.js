import React, {useState, useEffect} from "react"
import ReactMarkdown from "react-markdown"
import { APP_NAME } from "../constants"

import logo from './../assets/logo.png'
import { Button } from "antd"
import { useNavigate } from "react-router"

// TODO: replace markdown here

const text = `

Web3backers
`

export const Research = () => {
    const [address, setAddress] = useState()
    const navigate = useNavigate();
    return <div>
        <Input placeholder="Search" prefix={<SearchOutlined />}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
         />
   
    </div>
}