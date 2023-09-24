
import { useMessages } from "@xmtp/react-sdk";
import { Card } from "antd/es";


export const Messages = ({ conversation }) => {
    // const { error, messages, isLoading } = useMessages(conversation);

    console.log('conversation', conversation)

    // if (error) {
    //     console.log('message error', error)
    //     return "An error occurred while loading messages";
    // }

    // if (isLoading) {
    //     return "Loading messages...";
    // }

    return (
        <div>
            <Card title="Conversation started">
               
            </Card>
        </div>
    );
};