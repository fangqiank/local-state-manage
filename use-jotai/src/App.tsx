import { createContext, useContext, useRef } from 'react'
import {atom, createStore, useAtomValue, useSetAtom} from 'jotai'

const msgsAtom = atom<string[]>([])
const msgCountAtom = atom(get => get(msgsAtom).length)
const curMsgAtom = atom('')

const ChatContext = createContext<ReturnType<typeof createStore> | null>(null)

const useMessages = () => useAtomValue(msgsAtom, {
  store: useContext(ChatContext)!
})
const useCurrentMessage = () => useAtomValue(curMsgAtom, {
  store: useContext(ChatContext)!
})
const useMessageCount = () => useAtomValue(msgCountAtom, {
  store: useContext(ChatContext)!
})
const useSetCurrentMessage = () => useSetAtom(curMsgAtom, {
  store: useContext(ChatContext)!
})
const useAddMessage = () => useSetAtom(msgsAtom, {
  store: useContext(ChatContext)!
})

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
        <button 
          onClick={() => {
            addMessage([...messages, currentMessage])
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

const ChatContainer = () => {
  const store = useRef(createStore())
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
