import { createContext, useContext } from 'react'

const ChatContext = createContext<null>(null)

const noop = () => {}
const useMessages = () => useContext(ChatContext) ?? []
const useCurrentMessage = () => useContext(ChatContext) ?? ''
const useMessageCount = () => useContext(ChatContext) ?? 0
const useSetCurrentMessage = () => useContext(ChatContext) ?? noop
const useAddMessage = () => useContext(ChatContext) ?? noop

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
  return (
    <div className="chat">
      <ChatContext.Provider value={null}>
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
