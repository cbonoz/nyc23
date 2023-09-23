import { useSendMessage } from "@xmtp/react-sdk";
import { useCallback, useState } from "react";
import { ethers } from "ethers";

export const SendMessage = ({ conversation, peerAddress }) => {
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

    return (
        <form onSubmit={handleSendMessage}>
            <input
                name="messageInput"
                type="text"
                onChange={handleMessageChange}
                disabled={isSending}
            />
        </form>)
}