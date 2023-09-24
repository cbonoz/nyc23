
import { isValidAddress, useCanMessage, useConversations, useStartConversation } from "@xmtp/react-sdk";
import { Button, Card, Divider, Input, List, Modal } from "antd";
import { useCallback, useState } from "react";
import { formatDate } from "../../util";

export const StartConversation = ({ account, peerAddress, onStart }) => {
  //   const [peerAddress, setPeerAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { startConversation } = useStartConversation();
  const { canMessage } = useCanMessage();

  const { conversations, error, isLoading: loadingConversations } = useConversations();


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
        if (canMessage(peerAddress)) {
          setIsLoading(true);
          let conversation;
          try {
            conversation = await startConversation(peerAddress, message);
          } catch (e) {
          }
          console.log('start asconversation', conversation)
          onStart(conversation, {
            author: account,
            content: message,
            timestamp: Date.now()
          });
        } else {
          alert("You can't message this address, they may have XMTP disabled")
        }
        setIsLoading(false);
      }
    },
    [message, peerAddress],
  );

  return (
    <form onSubmit={handleStartConversation}>
      <h3>Channel opened!</h3>

      <Input
        name="addressInput"
        type="text"
        prefix="To: "
        value={peerAddress}
        disabled
      />
      <p>Start the conversation:</p>
      <Input
        name="messageInput"
        placeholder="Enter opening message"
        type="text"
        onChange={handleMessageChange}
        disabled={isLoading || !isValidAddress(peerAddress)}
      />


      <Button onClick={handleStartConversation} disabled={isLoading || !message} >Start Conversation</Button>&nbsp;
      <br />
      <a href="#" onClick={(e) => {
        e.preventDefault()
        setShow(true)
      }}
      >View old conversations</a>

      <Divider />



      <Modal
        title="Old Conversations"
        open={show}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setShow(false)}
        onClose={() => setShow(false)}>

        <List
          loading={loadingConversations}
          dataSource={conversations}
          onClick={(conversation) => onStart(conversation)}
          renderItem={(item) => <List.Item>ID {item.id}: Topic {item.topic}, Last updated: {formatDate(item.updatedAt)}</List.Item>}
        />
      </Modal>

    </form >
  );
};