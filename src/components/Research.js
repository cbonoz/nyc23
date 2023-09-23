import React, { useState, useEffect } from "react"

import { useNavigate } from "react-router"
import { Divider, Input } from "antd/lib"
import { AIRSTACK_KEY, AIRSTACK_QUERY, APP_NAME } from "../constants"
import { useQuery, init } from "@airstack/airstack-react"
import AirstackQuery from "./lib/AirstackQuery"
import { Card } from "antd/es"

// init(AIRSTACK_KEY)

export const Research = () => {
    const [identity, setIdentity] = useState('cbono.eth')


    return <div>
        <div className="centered">
            <h1>Research Hub</h1>
            <h3>Because reputation often doesn't just come from one source</h3>
            <Input placeholder="Search ENS" prefix={'Search ENS:'}
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
            />
        </div>
        <Divider />

        <Card title={`${APP_NAME} breakdown for ${identity}`} style={{ width: '100%' }}>
            <AirstackQuery identity={identity} />
        </Card>

    </div>
}