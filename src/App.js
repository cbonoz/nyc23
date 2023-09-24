import { Buffer } from "buffer";

import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, Select, Spin } from "antd";
import { Home } from "./components/Home";
import {
  QuestionCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { About } from "./components/About";
import { ACTIVE_CHAIN, APP_DESC, APP_NAME, CHAINS, CHAIN_OPTIONS } from "./constants";
import 'antd/dist/reset.css';

import "@ant-design/flowchart/dist/index.css";
import logo from "./assets/logo.png";
import { abbreviate, isEmpty } from "./util";


import './App.css';
import { usePrivy, useWallets } from "@privy-io/react-auth";
import ProfilePage from "./components/ProfilePage";
import CreateContract from "./components/CreateContract";
import { Research } from "./components/Research";
import Conversation from "./components/Conversation";
// import Conversation from "./components/Conversation";

window.Buffer = window.Buffer || Buffer;

const { Header, Footer, Content } = Layout;
const { Option } = Select;

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { ready, authenticated, user, login, logout } = usePrivy();
  const [account, setAccount] = useState()
  const [provider, setProvider] = useState()
  const [signer, setSigner] = useState()
  const [activeChain, setActiveNetwork] = useState(CHAIN_OPTIONS[localStorage.getItem("chainId")] || ACTIVE_CHAIN)

  const pathname = window.location.pathname
  const isContractPage = pathname.indexOf('/policy/') !== -1
  const { wallets } = useWallets();

  async function loginUser() {
    try {
      login();
    } catch (e) {
      console.error('error logging in', e)
      await logout();
    }
  }

  const switchNetwork = async () => {
    if (isEmpty(wallets)) {
      return
    }

    const wallet = wallets.find((wallet) => (wallet.walletClientType === 'privy')) || wallets[0]

    const { chainId } = await provider.getNetwork()
    if (chainId === activeChain.id) {
      return
    }
    console.log('switching network', activeChain.id, 'from', chainId)

    try {
      await wallet.switchChain(activeChain.id);
    } catch (e) {
      alert(`Please switch your wallet to ${activeChain.name} to continue`)
      throw e;
    }
  }


  async function onLogin() {
    if (isEmpty(wallets) || provider) {
      return
    }
    // console.log('wallets', wallets, user, user?.linkedAccounts)
    const wallet = wallets[0]
    setAccount(wallet.address)
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy') || wallets[0];
    if (embeddedWallet) {
      const p = await embeddedWallet.getEthersProvider();
      setProvider(p)
      const s = await p.getSigner()
      setSigner(s);
    } else {
      console.log('no embedded wallet found', wallets)
    }

  }
  useEffect(() => {
    try {
      onLogin()
    } catch (e) {
      console.error('error logging in', e)
    }
  }, [authenticated, wallets, user]);

  const isLoggedIn = !!account

  return (
    <div className="App">
      <Layout>
        <Header>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[pathname]}
          >
            <Menu.Item key={0}>
              <img
                src={logo}
                className="header-logo pointer"
                onClick={() => navigate("/")}
              />

            </Menu.Item>
            {!isContractPage && <>
              <Menu.Item key={'/create'} onClick={() => navigate("/create")}>
                <FormOutlined /> Create your page
              </Menu.Item>
              <Menu.Item key={'/research'} onClick={() => navigate("/research")}>
                <FormOutlined /> Research
              </Menu.Item>
            </>}


            <Menu.Item key={'/about'} onClick={() => navigate("/about")}>
              <QuestionCircleOutlined /> About
            </Menu.Item>
            {!isLoggedIn && <span>
              <Button type="primary" onClick={loginUser}>Connect Wallet</Button>
            </span>}
            {isLoggedIn && <span>
              {account && <span>
                &nbsp;Logged in: <b>{abbreviate(account)}</b>
              </span>}&nbsp;(<a href="" onClick={(e) => {
                e.preventDefault()
                logout()
                setAccount(undefined)
              }}>logout</a>)
              {/* <Button onClick={disconnect}>Disconnect</Button> */}
            </span>}

            <span>
              &nbsp;
              {/* select chain */}
              <Select
                style={{ width: 180 }}
                value={activeChain.id}
                onChange={(value) => {
                  const chain = CHAINS.find((chain) => chain.id === value)
                  // Save local
                  localStorage.setItem('chainId', chain.id);
                  setActiveNetwork(chain)
                }}
              >
                {CHAINS.map((chain) => {
                  return <Option key={chain.id} value={chain.id}>{chain.name}</Option>
                }
                )}
              </Select>

            </span>
            {/* <span className="web3-button">
              {isLoggedIn
                ? <AuthedState />
                : <UnauthenticatedState />}
            </span> */}


          </Menu>


        </Header>
        <Content>
          <span className="no-print" style={{ right: 0, position: 'absolute' }}>
            &nbsp;Network: <b>{activeChain.name}</b>
            {/* {account && <span>
              ,&nbsp;Logged in: <b>{abbreviate(account.address)}</b>
            </span>} */}
            &nbsp;
          </span>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/carbon-map" element={<Home/>}/> */}
              <Route path="/about" element={<About />} />
              <Route path="/research" element={<Research />} />
              <Route path="/create" element={<CreateContract activeChain={activeChain} switchNetwork={switchNetwork} signer={signer} account={account} />} />
              <Route path="/profile/:pageId" element={<ProfilePage activeChain={activeChain} switchNetwork={switchNetwork} signer={signer} account={account} />} />
              <Route path="/conversation/:targetAddress" element={<Conversation activeChain={activeChain} switchNetwork={switchNetwork} signer={signer} account={account} />} />
            </Routes>
          </div>
        </Content>

        <Footer>
          <hr />
          <p>
            <a href={"/"}><b>{APP_NAME}</b></a>&nbsp;
            &copy;2023.&nbsp;{APP_DESC}.<br /></p>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
