import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ACTIVE_CHAIN, APP_NAME, CHAIN_OPTIONS, WEB3_PROJECT_ID } from './constants';

import './index.css';
import { ConfigProvider } from 'antd';

// https://0.12.x.wagmi.sh/react/WagmiConfig
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
// import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { PrivyProvider } from '@privy-io/react-auth';
import { AirstackProvider } from '@airstack/airstack-react';

const projectId = process.env.REACT_APP_WC_ID || 'YOUR_PROJECT_ID'
const PRIVY_ID = process.env.REACT_APP_PRIVY_APP_ID
const AIRSTACK_KEY = process.env.REACT_APP_AIRSTACK_KEY

// const chains = [scrollSepolia, xdcTestnet, neonDevnet]

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, appName: APP_NAME })
console.log('app context', projectId, PRIVY_ID, AIRSTACK_KEY)


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#7D60A0', //pr/
           colorPrimary: '#8B99DC',
        },
      }}
    >
      {/* <WagmiConfig client={client}> */}
      <PrivyProvider
      appId={PRIVY_ID}
      config={{
        walletConnectCloudProjectId: projectId
      }}
    >
      <AirstackProvider apiKey={AIRSTACK_KEY}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </AirstackProvider>
        </PrivyProvider>
      {/* </WagmiConfig> */}
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();