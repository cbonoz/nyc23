import { StartConversation } from "./lib/StartConversation"
import { Messages } from "./lib/Messages"
import { SendMessage } from "./lib/SendMessage"
import { useParams } from "react-router"
import { useState } from "react"
import { Card, Divider } from "antd"
import { XmtpButton } from "./lib/XmtpButton"
import { Comment } from '@ant-design/compatible';

import { formatDate } from "../util"

const Conversation = ({ account, signer }) => {
    const [error, setError] = useState()
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [activeConversation, setActiveConversation] = useState()
    // Pull paymentToken query param out of URL. querystring
    // const {paymentToken} = querystring.parse(window.location.search);

    const [messages, setMessages] = useState([])



    const params = useParams()
    const { targetAddress } = params

    const addMessage = (conversation, message) => {
        setActiveConversation(conversation)
        // Greedy approach until message could be retrieved from XMTP/API or stream.
        if (message) {
            setMessages([...messages, message])
        }
    }

    return <div>
        <Card title={`Conversation with ${targetAddress}`} className="conversation-card">
            <XmtpButton signer={signer} />
            <StartConversation account={account} peerAddress={targetAddress} onStart={addMessage} />
            {messages.map((message) => {
                return <div key={message.id}>
                    <Comment
                        author={message.sender}
                        datetime={formatDate(message.timestamp)}
                        content={message.content}
                    />
                </div>
            })}
            <SendMessage account={account} addMessage={addMessage} conversation={activeConversation} peerAddress={targetAddress} />
            <Divider />
            {activeConversation?.id && <p>Conversation ID: {activeConversation.id}</p>}
            < p > Powered by XMTP</p>

        </Card >
    </div >

}


export default Conversation