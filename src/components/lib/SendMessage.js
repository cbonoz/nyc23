import { useSendMessage } from "@xmtp/react-sdk";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { Button, Input } from "antd";

export const SendMessage = ({ account, conversation, peerAddress, addMessage }) => {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { sendMessage } = useSendMessage();


    const handleMessageChange = useCallback(
        (e) => {
            setMessage(e.target.value);
        },
        [],
    );

    const handleSendMessage = useCallback(
        async (e) => {
            e.preventDefault();
            let isValid = true
            try {
                ethers.utils.getAddress(peerAddress)
            } catch (e) {
                isValid = false
            }
            if (peerAddress && isValid && message) {
                setIsLoading(true);
                await sendMessage(conversation, message);
                setIsLoading(false);
            }
        },
        [message, peerAddress, sendMessage],
    );

    return (<div><Input
        name="messageInput"
        placeholder="Type a message"
        type="text"
        disabled={isSending}
        value={message}
        onChange={handleMessageChange}
    />

        <Button type="primary" htmlType="submit" disabled={isSending || !message}
        onClick={
            () => {
                addMessage(conversation, {
                    content: message,
                    timestamp: Date.now(),
                    author: account
                })
                setMessage('')
            }
        }>
            Send
        </Button>
    </div>)


}