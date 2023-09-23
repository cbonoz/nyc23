import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Radio, Steps, Result, DatePicker, Card } from "antd";
import { insureUrl, ipfsUrl, getExplorerUrl, qrUrl, humanError, createFundRequest } from "../util";
import { ACTIVE_CHAIN, APP_NAME, EXAMPLE_FORM } from "../constants";
import { deployContract } from "../contract/profileContract";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { FileDrop } from "./lib/FileDrop";
import { useAccount } from "wagmi";


const { Step } = Steps;

function CreateContract({ account, provider, switchNetwork, activeChain }) {
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
    try {
      switchNetwork()
    } catch (e) {
      alert(`Please switch your wallet to ${ACTIVE_CHAIN.name} to continue`)
    return;
    }

    setLoading(true);

    let res = { ...data };

    try {
      // Deploy base contract with metadata,
      const contract = await deployContract(
        provider?.signer,
        data.name,
        data.purpose
      );

      // Return shareable url for policy.
      res["contract"] = contract.address;
      res["contractUrl"] = getExplorerUrl(activeChain, contract.address);
      res["policyUrl"] = insureUrl(contract.address);

      // Result rendered after successful doc upload + contract creation.
      setResult(res);

    } catch (e) {
      console.error("error creating insurance policy", e);
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
                <h3 className="vertical-margin">Profile information:</h3>
              <h5>Name</h5>
              <Input
                placeholder="Name of listing"
                value={data.name}
                onChange={(e) => updateData("name", e.target.value)}
              />
              <br />
              <br />
              <h5>Purpose / Headline</h5>
              <TextArea
                aria-label="Purpose / Headline"
                onChange={(e) => updateData("purpose", e.target.value)}
                placeholder="Your mission statement"
                prefix="Purpose"
                value={data.purpose}
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
                  title="Insurance policy created!"
                  subTitle="Your insurance policy has been created.  Share or post the purchase page above to allow others to
                  purchase the policy."
                  extra={[
                    <Button type="primary" key="buy">
                      <a href={result.policyUrl} target="_blank">
                        Purchase page
                      </a></Button>,
                    <Button type="default" key="console">
                      <a href={result.contractUrl} target="_blank">
                        View policy
                      </a>
                    </Button>,
                  ]}
                />
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
                className="standard-margin"
                direction="vertical"
                size="small"
                current={getStep()}
              >
                <Step title="Fill in fields" description="Enter required data." />
                <Step
                  title="Create insurance policy agreement."
                  description="Deploys a smart contract which represents the insurance policy."
                />
                <Step
                  title="Share the generated contract url with potential policy buyers."
                  description="Others can view and purchase the policy from this url"
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
