import { Button, Card, Col, Grid, Modal, Result, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { APP_NAME, EXAMPLE_FORM } from '../constants'
import { getMetadata, purchaseConsult, purchaseOffer } from '../contract/profileContract'
import { capitalize, formatDate, getExplorerUrl, humanError, ipfsUrl, isEmpty } from '../util'
import Layout, { Content } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import EnsAvatar from './lib/EnsAvatar'
import { getProfilesForIdentity } from '../util/nextid'
import { Avatar, Divider } from 'antd/lib'
import { render } from '@testing-library/react'
import AirstackQuery from './lib/AirstackQuery'

export default function ProfilePage({ network, provider, signer, activeChain, account }) {
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
        try {
            const res = await purchaseOffer(signer, itemId);
            setCid(cid)
        } catch (e) {
            setError(humanError(e.data.message || e.message));
        } finally {
            setLoading(false)
        }
    }

    async function buyConsult() {
        // TODO: add error check for preset location if user denied permission or location not retrievable.
        setLoading(true)
        try {
            const res = await purchaseConsult(signer, itemId);
            setResult({ ...res, contractUrl: getExplorerUrl(activeChain, itemId) })
        } catch (e) {
            setError(humanError(e.data.message || e.message));
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
                res = JSON.parse(res || '{}')
            } catch (e) {
                console.error('error fetching contract info, using default', e)
                res = { ...EXAMPLE_FORM }
            }
            const response = await getProfilesForIdentity(res.ens)
            console.log('res', res)
            res['identities'] = response.data
            setData(res)
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

    if (loading) {
        return <Spin size="large" className='boxed' />
    }

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
    return (
        <div className='boxed container profile-page'>
            <Layout>
                <Sider
                >
                    <EnsAvatar address={data?.paymentAddress} chainId={activeChain?.id} />
                    <h1>{data?.name}</h1>
                </Sider>
                <Content>

                    <Card style={{ background: 'white' }} title={cardHeading}>
                        <h1>{data?.purpose}</h1>

                        <p>View credentials and see options to engage with {data?.name} below</p>
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

                        {data?.ens && <Card title="Web3 Reputation">
                            <AirstackQuery identity={data?.ens} />
                        </Card>}
                        <Card title="Offers">
                            {data?.offerDescription && <p>{data.offerDescription}</p>}
                            <Button type='primary' disabled={cid} onClick={buyOffer}>Buy offer ({data.offerPrice} {symbol})</Button>
                            {cid && <div>
                                <p className='success-text'>Thanks for your purchase</p>
                                <a href={ipfsUrl(cid)} target="_blank">Access Content</a>
                            </div>}
                        </Card>
                        <br />

                        <Card title="Consult">
                            <Button type='primary' onClick={buyConsult}>Purchase a consult ({data.consultFee} {symbol})</Button>
                        </Card>

                    </Card>
                </Content>
            </Layout>

        </div >
    )
}