
import { isValidAddress, useStartConversation } from "@xmtp/react-sdk";
import { useCallback, useState } from "react";

export const StartConversation = ({peerAddress, onStart}) => {
//   const [peerAddress, setPeerAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { startConversation } = useStartConversation();

  const handleMessageChange = useCallback(
    (e) => {
      setMessage(e.target.value);
    },
    [],
  );

  const handleStartConversation = useCallback(
    async (e) => {
      e.preventDefault();
      if (peerAddress && message) {
        setIsLoading(true);
        const conversation = await startConversation(peerAddress, message);
        onStart(conversation);
        setIsLoading(false);
      }
    },
    [message, peerAddress, startConversation],
  );

  return (
    <form onSubmit={handleStartConversation}>
        <h3>Channel opened!</h3>
        <p>Start the conversation</p>
      <input
        name="addressInput"
        type="text"
        value={peerAddress}
        disabled
      />
      <input
        name="messageInput"
        type="text"
        onChange={handleMessageChange}
        disabled={isLoading || !isValidAddress(peerAddress)}
      />
    </form>
  );
};