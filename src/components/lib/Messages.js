
import { useMessages } from "@xmtp/react-sdk";
import { Card } from "antd/es";


export const Messages = ({ conversation }) => {
    const { error, messages, isLoading } = useMessages(conversation);

    if (error) {
        return "An error occurred while loading messages";
    }

    if (isLoading) {
        return "Loading messages...";
    }

    return (
        <div>
            <Card title="Conversation started">
                {messages.map((message) => (
                    <div key={message.id}>
                        {/* <span>{message.sender}</span> */}
                        {/* <span>{message.content}</span> */}
                        <span>{JSON.stringify(message)}</span>
                    </div>
                ))}
            </Card>
        </div>
    );
};