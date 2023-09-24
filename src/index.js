import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ACTIVE_CHAIN, AIRSTACK_KEY, APP_NAME, CHAIN_OPTIONS, CHAINS, WEB3_PROJECT_ID } from './constants';

import { ConfigProvider } from 'antd';

// https://0.12.x.wagmi.sh/react/WagmiConfig
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { PrivyProvider } from '@privy-io/react-auth';
import { AirstackProvider } from '@airstack/airstack-react';

import './index.css';
import { XMTPProvider } from '@xmtp/react-sdk';

const projectId = process.env.REACT_APP_WC_ID || 'YOUR_PROJECT_ID'
const PRIVY_ID = process.env.REACT_APP_PRIVY_APP_ID
const QUICKNODE_URL = process.env.REACT_APP_SEPOLIA_QUICKNODE_URL


const RPCS = []
if (QUICKNODE_URL) {
  console.log('using quicknode', QUICKNODE_URL)
  RPCS.push(jsonRpcProvider({
    rpc: (chain) => ({
      http: QUICKNODE_URL
    }),
  }))
}
// public default
RPCS.push(publicProvider())

// const wagmiConfig = defaultWagmiConfig({ chains: Object.values(CHAIN_OPTIONS), projectId, appName: APP_NAME })
const { chains, publicClient, webSocketPublicClient } = configureChains(
  CHAINS, RPCS
)

const config = createConfig({
  publicClient,
  webSocketPublicClient,
})

console.log('app context', projectId, PRIVY_ID, 'airstack', AIRSTACK_KEY)


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
      <WagmiConfig config={config}>
        <PrivyProvider
          appId={PRIVY_ID}
          config={{
            walletConnectCloudProjectId: projectId
          }}
        >
          <AirstackProvider apiKey={AIRSTACK_KEY}>
            <XMTPProvider>

              <BrowserRouter>
                <App />
              </BrowserRouter>
            </XMTPProvider>
          </AirstackProvider>
        </PrivyProvider>
      </WagmiConfig>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
