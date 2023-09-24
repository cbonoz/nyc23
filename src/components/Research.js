import React, { useState, useEffect } from "react"

import { useNavigate } from "react-router"
import { Divider, Input } from "antd"
import { AIRSTACK_KEY, AIRSTACK_QUERY, APP_NAME } from "../constants"
import { useQuery, init } from "@airstack/airstack-react"
import AirstackQuery from "./lib/AirstackQuery"
import { Button, Card } from "antd/es"

const { Search } = Input;

// init(AIRSTACK_KEY)

export const Research = () => {
    const [value, setValue] = useState('cbono.eth')
    const [identity, setIdentity] = useState('cbono.eth')


    return <div>
        <div className="centered research-page">
            <h1>Research Hub</h1>
            <h3>Because reputation often doesn't just come from one source</h3>
            <Search placeholder="Search ENS" prefix={'Search ENS:'}
            className="search-input"
            style={{ width: 600, paddingBottom: 10 }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                enterButton="Search"
                onSearch={
                    () => setIdentity(value)
                }
            />
        </div>
        <Divider />

        <Card title={`${APP_NAME} breakdown for ${identity}`} style={{ width: '100%' }}>
            <AirstackQuery identity={identity} />
        </Card>

    </div>
}