import { createContext, useContext, useRef } from 'react'
import {createStore, useStore} from 'zustand'

const createChatStore = () => createStore<{
  curMsg: string,
  msgs: string[],
  setCurMsg: (x: string) => void,
  addMsg: () => void
}>((set, get) =>({
  curMsg: '',
  msgs: [],
  setCurMsg: (x: string) => set({curMsg: x}),
  addMsg: () => set({
    msgs: [...get().msgs, get().curMsg],
    curMsg: ''
  })
}))

const ChatContext = createContext<ReturnType<typeof createChatStore> | null>(null)

const useMessages = () => useStore(useContext(ChatContext)!, state => state.msgs)
const useCurrentMessage = () => useStore(useContext(ChatContext)!, state => state.curMsg)
const useMessageCount = () => useStore(useContext(ChatContext)!, state => state.msgs.length)
const useSetCurrentMessage = () => useStore(useContext(ChatContext)!, state => state.setCurMsg)
const useAddMessage = () => useStore(useContext(ChatContext)!, state => state.addMsg)

const Chat = () => {
  const currentMessage = useCurrentMessage()
  const messages = useMessages()
  const messageCount = useMessageCount()
  const setCurrentMessage = useSetCurrentMessage()
  const addMessage = useAddMessage()

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
          onChange={e => setCurrentMessage(e.target.value)} 
        />
      </div>

      <div className="chat-button">
        <button onClick={addMessage}>Send</button>
      </div>
    </div>
  )
}

const ChatContainer = () => {
  const store = useRef(createChatStore())

  return (
    <div className="chat">
      <ChatContext.Provider value={store.current}>
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
