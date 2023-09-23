'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
    Card,
    Button,
    Statistic,
    Descriptions,
    Row,
    Col,
    List,
    Spin,
    Divider,
    Modal,
    Input,
} from 'antd';
import Image from 'next/image'
import { abbreviate, convertCamelToHuman, formatCurrency, getExplorerUrl, humanError } from '../util';
import { ACTIVE_CHAIN, EXAMPLE_OFFERS, STAT_KEYS } from '../util/constant';

import { purchaseContract } from '../util/profileContract';
import { ethers } from 'ethers';



const ListingDetail = ({ item }) => {
    const [loading, setLoading] = useState(false)
    const [offerData, setOfferData] = useState(EXAMPLE_OFFERS)
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [amount, setAmount] = useState(1 || item.price)
    const {wallets} = useWallets();
    let wallet = {}

    if (!item) {
        return <Spin size='large' />
    }

    const createdAddress = item.createdBy.toString()
    console.log('createdAddress', createdAddress)

    async function makePurchase() {
        setLoading(true)
        try {
            const res = await purchaseContract(provider.signer, item.address, item.price)
            console.log('purchase', res)
        } catch (e) {
            console.error('error purchasing', e)
            alert('Error purchasing: ' + humanError(e));
        } finally {
            setLoading(false)
        }
    }
   

    return (
        <div className="listing-detail-page">
            <Card title={<span style={{ color: "green" }}>For Purchase</span>}>
                <h1>{item.name}</h1>
                <h3>{item.description}</h3>
                <Divider />
                <Row>

                    <Col span={12}>
                        <section className="product-images">
                            <Image width={450} height={300} src={item.image} alt={item.name} />
                            <br />
                            <br />
                        </section>
                        <section className="product-details">
                            <Statistic
                                style={{ display: 'inline-block', marginRight: 32 }}
                                title={"Created by"}
                                valueRender={() => <a href={getExplorerUrl(createdAddress)} target="_blank">
                                    {abbreviate(createdAddress)}
                                </a>
                                }
                            />

                            <Statistic
                                style={{ display: 'inline-block', marginRight: 32 }}
                                title={"Created at"}
                                valueRender={
                                    () => <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                }
                            />


                            <Statistic
                                style={{ display: 'inline-block', marginRight: 32 }}
                                title={"Purchases"}
                                valueRender={
                                    () => <span>{item.purchases}</span>
                                }
                            />


                            <Statistic
                                style={{ display: 'inline-block', marginRight: 32 }}
                                title={"Price "}
                                valueRender={
                                    () => <span>{ethers.utils.formatEther(item.price)} {ACTIVE_CHAIN.symbol}</span>
                                }
                            />

                            {item.size && <Statistic
                                style={{ display: 'inline-block', marginRight: 32 }}
                                title={"Size"}
                                valueRender={
                                    () => <span>{item.size} B</span>
                                } />}


                            {/* 
                            {STAT_KEYS.map((key, i) => {
                                return (<span
                                    key={i}
                                >
                                    <Statistic
                                        style={{ display: 'inline-block', marginRight: 32 }}
                                        title={convertCamelToHuman(key)}
                                        value={item[key]} />
                                </span>
                                )
                            })} */}
                        </section>
                    </Col>
                    <Col span={12}>

                        <Card title="Purchase">
                            <section className="product-actions">
                                <p>
                                    <b>Listing Price: {formatCurrency(item.amount)} </b>
                                    <br />
                                </p>
                                <p>
                                    Purchase this profile offer or make an offer.
                                </p>
                                <br />
                                <Button
                                    loading={loading}
                                    disabled={!wallet || loading}
                                    onClick={makePurchase}
                                    type="primary">{wallet ? 'Buy Now' : 'Connect Wallet'}</Button>&nbsp;
                                {/* <Button type="default">Add to Cart</Button> */}
                                <Button
                                    disabled={loading}
                                    onClick={async () => {
                                        await checkWallet()
                                        setShowOfferModal(!showOfferModal)
                                    }} type="link">Make an Offer</Button>
                            </section>
                        </Card>
                    </Col>
                </Row>
            </Card>


            {/* TODO: enable offer */}
            <Modal
                title={item?.name}
                open={showOfferModal}
                okText="Make offer"
                confirmLoading={loading}
                onCancel={() => setShowOfferModal(false)}
            >
                {/* <h3>{item?.name}</h3> */}
                <h3>Make an offer on this profile offer</h3>
                <p>Listing price: {formatCurrency(item.amount)}</p>
                <Divider />

                <Input
                    type="number"
                    placeholder={`Enter amount (${ACTIVE_CHAIN.symbol})`}
                    prefix={`Your offer (${ACTIVE_CHAIN.symbol}):`}
                    value={amount}
                    onError={(e) => console.log('error', e)}
                    onChange={(e) => setAmount(e.target.value)}
                />

            </Modal>


        </div>
    );
};

export default ListingDetail;