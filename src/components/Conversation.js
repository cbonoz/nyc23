import { StartConversation } from "./lib/StartConversation"
import { Messages } from "./lib/Messages"
import { SendMessage } from "./lib/SendMessage"
import { useParams } from "react-router"
import { useState } from "react"



const Conversation = (account) => {
    const [error, setError] = useState()
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [activeConversation, setActiveConversation] = useState()

    const params = useParams()
    const { targetAddress } = params

    const onStart = async (conversation) => {
        setActiveConversation(conversation)
    }

    return <div>
        <h1>Conversation</h1>
        <StartConversation peerAddress={targetAddress} onStart={onStart} />
        {activeConversation && <div>
            <Messages conversation={activeConversation} />
            <SendMessage conversation={activeConversation} peerAddress={targetAddress} />
        </div>}
    </div>

}


export default Conversation