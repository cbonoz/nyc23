import React, { useEffect } from "react";
import { useQuery } from "@airstack/airstack-react";
import { AIRSTACK_QUERY, APP_NAME } from "../../constants";
import { Card, List, Typography } from "antd";
import { Row, Col } from 'antd';
import { getBioUrl } from "../../util";
import { Divider } from "antd/es";

const AirstackQuery = ({ identity }) => {
    const variables = { identity }
    const { data, loading, error } = useQuery(AIRSTACK_QUERY, variables, { cache: false });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!identity) {
        return <p>No identity selected</p>
    }

    const { domains, poaps, socials, tokenBalances } = data?.Ethereum || {}


    return <div>
            <Row>
                <Col span={8}>
                    <h2>Owned domains</h2>
                    <List
                        dataSource={domains}
                        renderItem={(domain) => (
                            <List.Item key={domain.name}>
                                <a href={getBioUrl(domain.name)} target="_blank">
                                    {domain.name}
                                </a>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={8}>
                    <h2>POAPs</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={poaps}
                        renderItem={(poap) => (
                            <List.Item key={poap.poapEvent.eventName} >
                                <a href={poap.poapEvent.eventURL} target="_blank">
                                    {poap.poapEvent.eventName}
                                </a>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={8}>
                    <h2>Other Socials</h2>

                    <List
                        itemLayout="horizontal"
                        dataSource={socials}
                        renderItem={(social) => (
                            <List.Item key={social.profileName}>
                                <List.Item.Meta title={social.profileName} />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>


            {/* <h2>Balances</h2>
            <List
                itemLayout="horizontal"
                dataSource={tokenBalances}
                renderItem={(tokenBalance) => (
                    <List.Item key={tokenBalance.tokenAddress}>
                        <List.Item.Meta
                            title={tokenBalance.tokenAddress}
                            description={`${tokenBalance.formattedAmount} ${tokenBalance.tokenSymbol}`}
                        />
                    </List.Item>
                )}
            /> */}
            <Divider/>
            Pulled from <a href="https://airstack.com" target="_blank">Airstack</a> and <a href="https://next.id" target="_blank">Next.ID</a> profiles.
        {/* {JSON.stringify(data)} */}
    </div>
}

export default AirstackQuery