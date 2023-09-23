import React, { useState, useEffect } from "react"

import { useNavigate } from "react-router"
import { Divider, Input } from "antd/lib"
import { AIRSTACK_QUERY } from "../constants"
import { useQuery } from "@airstack/airstack-react"

export const Research = () => {
    const [address, setAddress] = useState()
    const variables = { address }
    const { data, loading, error } = useQuery(AIRSTACK_QUERY, variables, { cache: true });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return <div>
        <Input placeholder="Search" prefix={'Search'}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
        />

        <Divider />

        <div className="result-section">
        {JSON.stringify(data)}

        </div>




    </div>
}