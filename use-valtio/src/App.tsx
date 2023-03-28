import { createContext, useContext, useRef } from 'react'
import {proxy, useSnapshot} from 'valtio'

const createProxy = () => {
  const state = proxy({
    curMsg: '',
    msgs: [] as string[],
    get msgCount() {
      return state.msgs.length
    }
  })

  return state
}

const ChatContext = createContext<ReturnType<typeof createProxy> | null>(null)

const useMessages = () => useSnapshot(useContext(ChatContext)!).msgs
const useCurrentMessage = () => useSnapshot(useContext(ChatContext)!).curMsg
const useMessageCount = () => useSnapshot(useContext(ChatContext)!).msgCount
const useMutableState = () => useContext(ChatContext)!

const Chat = () => {
  const currentMessage = useCurrentMessage()
  const messages = useMessages()
  const messageCount = useMessageCount()
  const store = useMutableState()

  return (
    <div>
      {messages.map((msg, idx) => (
        <div key={idx} className='chat-message'>{msg}</div>
      ))}

      <div className="chat-count">Message count: {messageCount}</div>

      <div className="chat-input">
        <input 
          type="text"
          value={currentMessage}
          onChange={e => store.curMsg = e.target.value} 
        />
      </div>

      <div className="chat-button">
        <button onClick={e => {
            store?.msgs.push(currentMessage)
            store.curMsg = ''
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

const ChatContainer = () => {
  const chatStore = useRef(createProxy())

  return (
    <div className="chat">
      <ChatContext.Provider value={chatStore.current}>
        <Chat />
      </ChatContext.Provider>
    </div>
  )
} 

function App() {
  return (
    <div className="chat-area">
       <ChatContainer />
      <ChatContainer />
      <ChatContainer />
      <ChatContainer />
    </div>
  )
}

export default App
