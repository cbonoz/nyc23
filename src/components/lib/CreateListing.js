'use client'

import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Steps, Result, Divider } from "antd";
import { listingUrl, ipfsUrl, getExplorerUrl, humanError, isEmpty, } from "../util";
import { uploadFiles } from "../util/stor";
import TextArea from "antd/lib/input/TextArea";
import { ACTIVE_CHAIN, APP_NAME } from "../util/constants";
import { generateItem } from "../util/constants";
import { FileDrop } from "./FileDrop";
import { ethers } from "ethers";
import { deployContract } from "../util/profileContract";
// import { useQuery } from "@apollo/client";
import { EXAMPLE_ID_QUERY } from "../util/nextid";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const { Step } = Steps;

function CreateListing() {
  // const { connect, provider, wallet, logout } = useWallet()
  const { connectWallet, ready, authenticated, logout } = usePrivy();
  const {wallets} = useWallets();
    let wallet = {}

    // const { data: nextData, loading: nextLoading, error: nextError } = useQuery(EXAMPLE_ID_QUERY);

    // if (nextLoading) return "Loading...";
    // if (nextError) return <pre>{nextError.message}</pre>

    // useEffect(() => {
    //   // log
    //   console.log('nextData', nextData)
    // }, [nextData])



  //   useEffect(() => {
  //     const networkId = network?.chain?.id
  //     console.log('network', network)
  //     if (networkId) {
  //       refetch()
  //     }
  //   }, [network, account])

  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const setDemo = () => setData({ ...generateItem(1) })

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const getActiveError = (data) => {
    if (!data.name || !data.description || !data.price) {
      return "Please provide a name, description, price for the item.";
    }

    if (isEmpty(data.files)) {
      return "Must add at least one file";
    }

    return undefined
  };

  const errMessage = getActiveError(data);

  const create = async () => {
    setError(undefined);

    if (errMessage) {
      setError(errMessage)
      return;
    }

    if (!provider) {
      setError(`Please connect a valid ${ACTIVE_CHAIN.name} wallet`);
      return;
    }

    setLoading(true);
    const body = { ...data };

    // Format files for upload.
    const files = (body.files || []).map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // TODO: add step 1/2 once tableland indexing ready.
      // 1) Create files/metadata to ipfs.
      let cid = '123';
      if (files && files.length > 0) {
        cid = await uploadFiles(
          files,
          res
        );
      } else {
        throw new Error("No files found");
      }

      // 2) deploy contract with initial metadata
      let contract;
      const priceWei = ethers.utils.parseEther(res.price.toString()).toString();
      contract = await deployContract(provider.signer, cid, priceWei);
      // contract = {
      //   address: '0x1234'
      // }
      res["cid"] = cid;
      res["contract"] = contract.address;
      res["listingUrl"] = listingUrl(contract.address || cid);
      res["contractUrl"] = getExplorerUrl(contract.address);

      // 3) create table entry
      const listing = { ...data } // TODO: set all fields.
      listing['address'] = contract.address;

      // Result rendered after successful doc upload + contract creation.
      setResult(res);
    } catch (e) {
      console.error("error creating Web3backers request", e);
      const message = e.reason || e.response?.message || e.message
      setError(humanError(message))
    } finally {
      setLoading(false)
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (!errMessage) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            {!result && <><h2>Create new profile page</h2>
              <Divider />
              <a href="#" onClick={e => {
                e.preventDefault()
                setDemo()
              }}>Set demo values</a>
              <br />
              <br />

              <h3 className="vertical-margin">Profile information:</h3>
              <h5>Name</h5>
              <Input
                placeholder="Name of listing"
                value={data.name}
                onChange={(e) => updateData("name", e.target.value)}
              />
              <br />
              <br />
              <h5>Description</h5>
              <TextArea
                aria-label="Description"
                onChange={(e) => updateData("mission", e.target.value)}
                placeholder="Your mission statement"
                prefix="Description"
                value={data.description}
              />

              <h5>Add offers</h5>
              <br />
              <br />

              {/* TODO: add configurable amount of items */}
              <h3 className="vertical-margin">Upload content for purchaseable collection</h3>
              <FileDrop
                files={data.files || []}
                setFiles={(files) => updateData("files", files)}
              />

              <Button
                type="primary"
                className="standard-button"
                onClick={create}
                disabled={loading || errMessage}
                loading={loading}
                size="large"
              >
                Create Listing
              </Button>
              {!error && !result && loading && (
                <span>&nbsp;Note this may take a few moments.</span>
              )}
              <br />
              <br />
            </>}
            {error && <div className="error-text">Error: {error}</div>}
            {result && (<div>
              <Result status="success"
                title="Listing created!" subTitle="Access your data page and content below" />
              <div>
                <a href={ipfsUrl(result.cid)} target="_blank">
                  View files
                </a>
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <br />
                <p>
                  Share or post this page with potential buyers:
                  <br />
                  <a href={result.listingUrl} target="_blank">
                    View listing page
                  </a>
                </p>
              </div>
            </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              items={[{
                title: 'Fill in fields',
                description: 'Enter required data.'
              }, {
                title: `Create ${APP_NAME} listing`,
                description: 'Deploys a smart contract and creates a purchase page for the profile offer'
              }, {
                title: 'Use the generated purchase page to sell your data',
                description: 'Others can purchase the profile offer from this url'
              }]}
              current={getStep()}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateListing.propTypes = {};

export default CreateListing;