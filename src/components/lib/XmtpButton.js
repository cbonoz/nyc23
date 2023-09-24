import { Client, useClient } from "@xmtp/react-sdk";
import { Button } from "antd";
import { useCallback } from "react";

export const XmtpButton = ({ signer }) => {
    const { client, error, isLoading, initialize } = useClient();
  
    const handleConnect = async () => {
      const options = {
        persistConversations: true,
        env: "dev",
      };
      if (!signer) {
        alert('Please connect your wallet')
        return;
      }
      const keys = await Client.getKeys(signer);
      console.log('initialize', keys, options, signer)
      await initialize({ keys, options, signer });
    };
  
    if (error) {
      return "An error occurred while initializing the client";
    }
  
    if (isLoading) {
      return "Awaiting signatures...";
    }
  
    if (!client) {
      return (
        <Button type="primary" loading={isLoading} onClick={handleConnect} disabled={isLoading}>
          Connect to XMTP
        </Button>
      );
    }
  
    return "Connected to XMTP";
  };