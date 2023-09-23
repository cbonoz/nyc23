import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Radio, Steps, Result, DatePicker, Card } from "antd";
import { insureUrl, ipfsUrl, getExplorerUrl, qrUrl, humanError, createFundRequest, profilePage, isEmpty } from "../util";
import { ACTIVE_CHAIN, APP_NAME, EXAMPLE_FORM } from "../constants";
import { deployContract } from "../contract/profileContract";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { FileDrop } from "./lib/FileDrop";
import { useAccount } from "wagmi";
import { uploadFiles } from "../util/stor";
import { Divider } from "antd/es";


const { Step } = Steps;

function CreateContract({ account, provider, signer, switchNetwork, activeChain }) {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [lastInflation, setLastInflation] = useState();

  // const { chain } = useNetwork()
  // const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  const setDemoValues = (e) => {
    e.preventDefault();
    setData({
      ...EXAMPLE_FORM,
    });
  };


  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const getActiveError = (data) => {
    if (!data.name) {
      return "Please provide a profile page name.";
    } else if (!data.purpose) {
      return "Please provide a purpose for the " + APP_NAME + " page.";
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

    // Ethereum request switch if not on ACTIVE_NETWORK.id

    setLoading(true);

    let res = { ...data, paymentAddress: account };

    try {
      // 1. Check current network
      await switchNetwork()

      // 2. Deploy offer to filecoin.
      let cid = ''
      if (!isEmpty(data.files)) {
        cid = await uploadFiles(data.files, res)
      }

      // 3. Deploy base contract with metadata,
      const contract = await deployContract(
        signer,
        data.name,
        data.purpose,
        activeChain.id,
        cid,
        data.offerPrice,
        data.offerDescription,
        data.consultFee
      );


      // 4. Return shareable url for policy.
      res["contract"] = contract.address;
      res["contractUrl"] = getExplorerUrl(activeChain, contract.address);
      res["profileUrl"] = profilePage(contract.address);
      res["offerUrl"] = ipfsUrl(cid);

      // Result rendered after successful doc upload + contract creation.
      console.log('result', res)
      setResult(res);

    } catch (e) {
      console.error("Error creating profile page contract", e);
      const message = e.reason || e.response?.message || e.message
      setError(humanError(e.data?.message || message))
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

  const title = `Create your new ${APP_NAME} page`
  const symbol = activeChain.nativeCurrency.symbol;

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <Card title={title}>
              {!result && <div>
                <a href="" onClick={setDemoValues}>
                  Set demo values
                </a>
                <br />
                <br />
                <h2>1. General information</h2>
                {/* <h3 className="vertical-margin">Profile information:</h3> */}
                <h4>Page name</h4>
                <Input
                  placeholder="Name of listing"
                  prefix="Name: "
                  value={data.name}
                  onChange={(e) => updateData("name", e.target.value)}
                />
                <h4>Enter your ENS address</h4>
                <Input
                  aria-label="ENS Identity"
                  onChange={(e) => updateData("ens", e.target.value)}
                  placeholder="Your profile ENS"
                  prefix="ENS: "
                  value={data.ens}
                />

                <h4>Purpose / Headline</h4>
                <TextArea
                  aria-label="Purpose / Headline"
                  onChange={(e) => updateData("purpose", e.target.value)}
                  placeholder="Your mission statement"
                  prefix="Purpose: "
                  value={data.purpose}
                />

                <Divider/>

                <h2>2. Add purchaseable content</h2>

                {data.offerActive && <Card title="Offer">


                <TextArea
                    aria-label="Offer description"
                    onChange={(e) => updateData("offerDescription", e.target.value)}
                    placeholder="Offer description"
                    prefix={`Price (${symbol})`}
                    value={data.offerDescription}
                  />

                  <Input
                  type="number"
                  aria-label="Offer price"
                  onChange={(e) => updateData("offerPrice", e.target.value)}
                  placeholder="Price"
                  prefix={`Price (${symbol})`}
                  value={data.offerPrice}
                />

                  {/* TODO: add configurable amount of items */}
                  <h3 className="vertical-margin">Upload content for purchaseable offer/content</h3>
                  <FileDrop
                    files={data.files || []}
                    setFiles={(files) => updateData("files", files)}
                  />
                </Card>}

                <Button type="primary" className="standard-button" onClick={() => {
                  if (data.offerActive) {
                    alert("Future work for ability to add more offers!")
                  } else {
                    updateData("offerActive", true)
                  }
                  // const offers = data.offers || []
                  // offers.push({ name: '', description: '', price: 0 })
                  // updateData('offers', offers)
                }}>+ Add item</Button>

                {data.offerActive && <Button type="secondary" onClick={() => {
                  updateData("offerActive", false)
                }}>Remove Offer</Button>}

                <Divider/>
                <h2>3. Set a messaging fee</h2>
                <p>Users can message you to your address by paying a specified fee.</p>

                <Input
                type="number"
                  aria-label="Consult fee"
                  onChange={(e) => updateData("consultFee", e.target.value)}
                  placeholder="Consult price"
                  prefix={`Consult Fee (${symbol})`}
                  value={data.consultFee}
                />

                <Divider/>


                {/* <h4>Payment Address</h4> */}
                <p>Your current deployer address will collect any payments gathered by {APP_NAME}</p>

                <Input
                  aria-label="Payment address"
                  placeholder="Payment address: "
                  disabled
                  prefix="Payment Address: "
                  value={account}
                />

                <Button
                  type="primary"
                  className="standard-button"
                  onClick={create}
                  disabled={loading || !account}
                  loading={loading}
                  size="large"
                >
                  Create profile page
                </Button>
                {!error && !result && loading && (
                  <span>&nbsp;Note this may take a few moments.</span>
                )}
                {!account && (
                  <span>&nbsp;Please connect your wallet to continue.</span>
                )}
                <br />
                <br />
              </div>}
              {error && <div className="error-text">Error: {error}</div>}
              {result && (<div>
                <Result status="success"
                  title="Profile page created!"
                  subTitle="Your profile page has been created. Share or post your profile page for others to unlock content or purchase a consult"
                  extra={[
                    <Button type="primary" key="buy">
                      <a href={result.profileUrl} target="_blank">
                        Profile page (shareable)
                      </a></Button>,
                    <Button type="default" key="console">
                      <a href={result.contractUrl} target="_blank">
                        View page contract
                      </a>
                    </Button>,
                  ]}
                />

                <h5>View Offer</h5>
                <p>The below offer link will be shared with any users that purchase it:
                  <br/>
                  {/* ipfs url */}
                  <a href={result.offerUrl} target="_blank">
                    View offer content
                  </a>


                </p>
                <div>
                  <p>

                    <br />
                  </p>
                </div>
              </div>
              )}
            </Card>
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Card title={`How ${APP_NAME} works`}>
              <Steps
                  progressDot

                className="standard-margin"
                direction="vertical"
                size="small"
                current={getStep()}
              >
                <Step title="Fill in fields" description="Enter required data." />
                <Step
                  title={`Create public ${APP_NAME} profile page.`}
                  description="Deploys a smart contract which represents the profile page."
                />
                <Step
                  title="Share the generated contract url with potential policy buyers."
                  description="Others can purchase and initiate a private consult from this url"
                />
              </Steps>
            </Card>
          </div>
        </Col>
      </Row>
    </div >
  );
}

export default CreateContract;
