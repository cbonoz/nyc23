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
  const [insure, setInsure] = useState()
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
      const res = await purchaseConsult(provider?.signer, itemId, insure.premium);
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
      const data = JSON.parse(res || '{}')
      setInsure(data)
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

  const decodedName = `Policy: ${decodeURIComponent(insure?.policyName || '')}`

  const cardHeading = insure?.policyName ?
    <span className='success-text'>Found policy</span> :
    <span>{APP_NAME}: Error loading policy</span>;

  const beforeExpiration = insure?.expiration * 1 > Date.now()

  return (
    <div className='boxed container'>
      <Card title={cardHeading}>
        {insure && <div>
          <h3>{decodedName}</h3>
          <hr />

          {/* Render payout, premium,expiration, inflationTarget, isPUrchased */}

              <div>
                <h3>Payout</h3>
                <p>{ethers.utils.formatUnits(insure.payout, 'ether')}</p>
              </div>
              <div>
                <h3>Premium</h3>
                <p>{ethers.utils.formatUnits(insure.premium, 'ether')}</p>
              </div>
              <div>
                <h3>Expiration</h3>
                <p>
                  {/* {insure.expiration} */}
                  {formatDate(insure.expiration * 1)}
                </p>
              </div>
              <div>
                <h3>Inflation Target</h3>
                <p>{insure.inflationTarget / 100}%</p>
              </div>
              {/* is met */}
            {/* </Col>
            <Col> */}
              <div>
                <h3>Is satisfied</h3>
                <p>{capitalize(insure?.isMet ?? 'false')}</p>
              </div>
            {/* </Col> */}



        </div>}

        {/* {insure?.contractUrl && <a href={insure.contractUrl} target="_blank">Contract URL</a>} */}


        {insure && insure?.isPurchased === "true" && <div>
          {beforeExpiration ? <h3 className='success-text'>This policy has been purchased</h3> : <h3 className='error-text'>This policy has expired</h3>}
                {/* Copy address to clipboard */}
            <a href="#" onClick={(e) => {
              e.preventDefault()
            navigator.clipboard.writeText(itemId)
          }}><CopyOutlined /> Copy address to clipboard</a>&nbsp;


          <p>Contract address: <a href={getExplorerUrl(itemId)} target="_blank">{itemId}</a></p>


        </div>}

        {!result && signer && insure?.isPurchased === "false" && <Button type="primary" size="large" disabled={loading} loading={loading} onClick={
          () => setConfirmModal(true)
        }>
          Purchase policy
        </Button>}

        {result && <Result status="success" title="Policy purchased!"
          subTitle={`TX: ${result.hash}. Please wait a few moments for the transaction to confirm.`}
          extra={[
            <Button type="primary" key="console" onClick={() => {
              window.open(result.contractUrl, "_blank")
            }}>
              View contract
            </Button>,
            <Button type="default" key="console" onClick={() => {
              window.location.reload()
            }}>
              Refresh
            </Button>,
          ]} />}
        <br />
        <br />
        <div className='error-text'>
          {error}
        </div>

      </Card>


      <Modal
        title="Confirm purchase"
        open={confirmModal}
        footer={[
          <Button key="back" onClick={() => setConfirmModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={async () => {
            await buyConsult()
            setConfirmModal(false)
          }}>
            Purchase
          </Button>,
        ]}>

        <p>Are you sure you want to purchase this policy?</p>
        <p>By purchasing this policy you have coverage until the expiration date. If the inflation target is met, funds can be withdrawn from the contract.</p>


      </Modal>
    </div>
  )
}