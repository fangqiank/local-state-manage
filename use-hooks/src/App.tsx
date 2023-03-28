import { createContext, useContext, useState, useMemo } from 'react'

const useChatStore = () => {
  const [msgs, setMsgs] = useState<string[]>([]);
  const [curMsg, setCurMsg] = useState<string>("");

  const msgsCount = useMemo(() => msgs.length, [msgs]);

  return {
    msgs,
    curMsg,
    setCurMsg,
    msgsCount,
    addMsg: () => {
      setMsgs([...msgs, curMsg]);
      setCurMsg("");
    },
  };
};
const ChatContext = createContext<ReturnType<typeof useChatStore> | null>(null);

const useMessages = () => useContext(ChatContext)!.msgs
const useCurrentMessage = () => useContext(ChatContext)!.curMsg
const useMessageCount = () => useContext(ChatContext)!.msgsCount
const useSetCurrentMessage = () => useContext(ChatContext)!.setCurMsg
const useAddMessage = () => useContext(ChatContext)!.addMsg

const Chat = () => {
  const messages = useMessages()
  const currentMessage = useCurrentMessage()
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
  const store = useChatStore()

  return (
    <div className="chat">
      <ChatContext.Provider value={store}>
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

