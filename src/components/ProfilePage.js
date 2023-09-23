import { Button, Card, Col, Grid, Modal, Result, Spin } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { APP_NAME, EXAMPLE_FORM } from '../constants'
import { getMetadata, purchaseConsult, purchaseOffer } from '../contract/profileContract'
import { capitalize, formatDate, getExplorerUrl, humanError, ipfsUrl } from '../util'
import { ethers } from 'ethers'
import { CopyOutlined } from '@ant-design/icons'

export default function ProfilePage({ network, provider, account }) {
    const [error, setError] = useState()
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState()
    const [data, setData] = useState({ ...EXAMPLE_FORM })
    const [confirmModal, setConfirmModal] = useState(false);

    const signer = provider?.signer;

    const params = useParams()
    const { pageId: itemId } = params

    async function buyConsult() {
        // TODO: add error check for preset location if user denied permission or location not retrievable.
        setLoading(true)
        try {
            const res = await purchaseConsult(provider?.signer, itemId);
            setResult({ ...res, contractUrl: getExplorerUrl(itemId) })
        } catch (e) {
            setError(humanError(e.message));
        } finally {
            setLoading(false)
        }
    }

    async function getContractInfo() {
        setError(undefined)
        setLoading(true)
        try {
            const res = await getMetadata(provider?.signer, itemId)
            const d = JSON.parse(res || '{}')
            setData(d)
        } catch (e) {
            console.error('error fetching profile information', e)
            let { reason } = e
            setError(humanError(reason))
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


    return (
        <div className='boxed container'>
            <Card title={cardHeading}>
                {JSON.stringify(data)}
                {/* TODO: add profile info here */}

            </Card>
        </div>
    )
}