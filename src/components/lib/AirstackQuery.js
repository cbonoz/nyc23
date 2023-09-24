import React, { useEffect } from "react";
import { useLazyQuery } from "@airstack/airstack-react";
import { AIRSTACK_QUERY, APP_NAME } from "../../constants";
import { Card, List, Progress, Tooltip, Typography } from "antd";
import { Row, Col } from 'antd';
import { getActivityScore, getBioUrl } from "../../util";
import { Divider } from "antd/es";
import { InfoCircleOutlined } from "@ant-design/icons";


const AirstackQuery = ({ identity }) => {
    const variables = { identity }
    const twoColors = { '0%': '#108ee9', '100%': '#87d068' };
    const [fetch, { data, loading, error }] = useLazyQuery(AIRSTACK_QUERY, variables, { cache: true });

    useEffect(() => {
        if (identity) {
            fetch()
        }
    }, [identity])

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
        <span>
            <Progress type="circle" percent={getActivityScore(tokenBalances?.length, domains?.length, poaps?.length, socials?.length)} strokeColor={twoColors} />
            <span className="activity-score">Community Score
            &nbsp;  <Tooltip placement="top" title="The community score is a grade out of 100 on activity across number of token balances, owned domains, connected social accounts, and poaps">
                <InfoCircleOutlined/>
            </Tooltip>
            </span>
            <Divider/>
          
        </span>
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
        <Divider />
        Pulled from <a href="https://airstack.com" target="_blank">Airstack</a> and <a href="https://next.id" target="_blank">Next.ID</a> profiles.
        {/* {JSON.stringify(data)} */}
    </div>
}

export default AirstackQuery