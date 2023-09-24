import { Button, Card, Row, Col, Grid, Modal, Result, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { APP_NAME, EXAMPLE_FORM } from '../constants'
import { getMetadata, purchaseAccess, purchaseConsult } from '../contract/profileContract'
import { capitalize, formatDate, getExplorerUrl, humanError, ipfsUrl, isEmpty } from '../util'
import Layout, { Content } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import EnsAvatar from './lib/EnsAvatar'
import { getProfilesForIdentity } from '../util/nextid'
import { Avatar, Divider } from 'antd/lib'
import { render } from '@testing-library/react'
import AirstackQuery from './lib/AirstackQuery'
import { ethers } from 'ethers'
import { v4 as uuidv4 } from 'uuid';


export default function ProfilePage({ provider, signer, activeChain, account }) {
    const [error, setError] = useState()
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [cid, setCid] = useState()
    const [location, setLocation] = useState()
    const [data, setData] = useState({})
    const [confirmModal, setConfirmModal] = useState(false);

    const params = useParams()
    const { pageId: itemId } = params

    async function buyOffer() {
        // TODO: add error check for preset location if user denied permission or location not retrievable.
        setLoading(true)
        let res
        try {
            const res = await purchaseAccess(signer, itemId, data.offerPrice);
            setCid(res)
        } catch (e) {
            setError(humanError(e.data?.message || e.message));
        } finally {
            setLoading(false)
        }
    }

    async function buyConsult() {
        // TODO: add error check for preset location if user denied permission or location not retrievable.
        setLoading(true)
        try {
            try {
            const res = await purchaseConsult(signer, itemId, data.consultFee);
            } catch (e) {

            }
            // setResult({ ...res, contractUrl: getExplorerUrl(activeChain, itemId) })
            // set uuid4
            const uuid = uuidv4()
            // Open new tab /coversation/address?paymentToken=
            const url = `${window.location.origin}/conversation/${(data?.target && data?.target !== account) ? data?.target : '0x06045177CA0aE933Be741D9016Cf8d6B056662AE'}?paymentToken=${uuid}`
            window.open(url, '_blank');
        } catch (e) {
            setError(humanError(e.data?.message || e.message));
        } finally {
            setLoading(false)
        }
    }

    async function getContractInfo() {
        setError(undefined)
        setLoading(true)
        try {
            let res = {}
            try {
                res = await getMetadata(signer, itemId)
                const d = {
                    name: res[0],
                    description: res[1],
                    offerPrice: ethers.utils.formatEther(res[2][0]),
                    offerDescription: res[2][1],
                    cid: res[2][2],
                    consultFee: ethers.utils.formatEther(res[3]),
                    ens: res[4],
                    chainId: res[5],
                    target: res[6],
                }
                res = d
                // res = JSON.parse(d || '{}')
                const response = await getProfilesForIdentity(res.ens)
                res['identities'] = response.data
                console.log('res', res)
                setData(res)
            } catch (e) {
                // console.error('error fetching contract info, using default', e)
                setError(humanError("Error fetching profile information, are you sure you're wallet is on the correct network?"))
                // res = { ...EXAMPLE_FORM }
            }
         
        } catch (e) {
            console.error('error fetching profile information', e)
            setError(humanError(e.message))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (signer && itemId) {
            getContractInfo()
        }
    }, [itemId, signer])


    const decodedName = `Profile: ${decodeURIComponent(data?.name || '')}`

    const cardHeading = decodedName ?
        <span className='success-text'>Found profile</span> :
        <span>{APP_NAME}: Error loading profile</span>;

    const hasIdentites = !isEmpty(data?.identities || [])

    const renderLinks = (platform, links) => {
        return <span>
            {platform} --&nbsp;
            {Object.keys(links).map((key, i) => {
                const d = links[key]
                return <span key={i}>
                    <a href={d.link} target='_blank'>{d.handle} ({key})</a>&nbsp;|&nbsp;
                </span>
            })}
        </span>
    }

    const symbol = activeChain.nativeCurrency.symbol;

    if (!signer) {
        return <p>
            Connect your wallet with Privy to continue.
        </p>
    }

    if (loading) {
        return <Spin size="large" className='boxed' />
    }

    if (error) {
        return <Result
            status="warning"
            title={error}
            extra={[
                <Button type="primary" key="console" onClick={() => {
                    window.location.reload()
                }}>
                    Refresh page
                </Button>,
            ]}/>
    }


    return (
        <div className='boxed container profile-page'>
            <Layout>
                <Sider
                >
                    <EnsAvatar data={data} identities={data?.identities} chainId={activeChain.chainId} />
               
                </Sider>
                <Content>

                    <Card style={{ background: 'white' }} title={cardHeading}>
                        <h1>{data?.purpose}</h1>
                        <br/>
                        <h2>{data?.description}</h2>

                        <p>View credentials and see options to engage with {data?.name} below.</p>

                        <Row gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                        }}>
                            <Col span={12}>
                                <Card title="Offers">
                                    {data?.offerDescription && <p>{data.offerDescription}</p>}
                                    <Button type='primary' disabled={cid} onClick={buyOffer}>Buy ({data.offerPrice} {symbol})</Button>
                                    {cid && <div>
                                        <br/>
                                        <p className='success-text'>Thanks for your purchase</p>
                                        <a href={ipfsUrl(data?.cid)} target="_blank">Access Content</a>
                                    </div>}
                                </Card>
                            </Col>
                            <Col span={12}>


                                <Card title="Consult">
                                    <p>Get directly in contact via&nbsp;
                                        <a href="https://xmtp.chat/" target="_blank">XMTP</a>
                                        &nbsp;by paying their set fee.</p>
                                    <Button type='primary' onClick={buyConsult}>Purchase a consultation ({data.consultFee} {symbol})</Button>
                                </Card>
                            </Col>
                        </Row>
                        {/* TODO: pull in third party media from nextid and airstack. */}
                        {/* {JSON.stringify(data)} */}
                        <br />

                        {hasIdentites && <div className='nextid-identities'>
                            <Card title="Connect with me">
                                {(data?.identities || []).map((identity, i) => {
                                    // render into antd avatar row
                                    return (
                                        <div className='nextid-identity' key={i}>

                                            <Card.Meta
                                                className='bordered'
                                                avatar={
                                                    <Avatar src={identity.avatar} />}
                                                title={identity.displayName}
                                                description={renderLinks(identity.platform, identity.links)} />
                                            <Divider />

                                        </div>
                                    )
                                })}
                                Powered by Next.ID
                            </Card></div>}
                        <br />

                        {/* {data?.ens && <div>
                            <Collapse items={[
                                {
                                    key: 'reputation',
                                    label: "Web3 Reputation",
                                    children: <AirstackQuery identity={data?.ens} />
                                }
                            ]} /></div>}
                            <br/> */}

                        {data?.ens && <Card title={`${APP_NAME} Reputation Insights`}>
                            <AirstackQuery identity={data?.ens} />
                        </Card>}


                    </Card>
                </Content>
            </Layout>

        </div >
    )
}