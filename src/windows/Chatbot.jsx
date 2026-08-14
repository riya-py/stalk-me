import { useState } from 'react'
import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { Send, Bot, User } from 'lucide-react'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi, I'm Ria's assistant. Ask me anything!" },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    setMessages((prev) => [...prev, { sender: 'user', text }])
    setInput('')
    setIsLoading(true)
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: '(connect this to your backend to get a real reply)' },
    ])
    setIsLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <>
      <div id='window-header'>
        <WindowControls target='chatbot' />
        <h2>Chatbot</h2>
      </div>

      <div className='absolute left-0 right-0 bottom-0 top-[52px] flex flex-col bg-white dark:bg-neutral-900 overflow-hidden'>
        <div className='flex-1 overflow-y-auto space-y-2 p-4'>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && <Bot size={18} className='mt-1 shrink-0 dark:text-neutral-300' />}
              <p
                className={`px-3 py-2 rounded-2xl text-sm max-w-[75%] ${
                  msg.sender === 'bot'
                    ? 'bg-gray-200 dark:bg-neutral-700 text-black dark:text-neutral-100 rounded-tl-sm'
                    : 'bg-blue-500 text-white rounded-tr-sm'
                }`}
              >
                {msg.text}
              </p>
              {msg.sender === 'user' && <User size={18} className='mt-1 shrink-0 dark:text-neutral-300' />}
            </div>
          ))}

          {isLoading && (
            <div className='flex items-center gap-2 justify-start'>
              <Bot size={18} className='shrink-0 dark:text-neutral-300' />
              <p className='px-3 py-2 rounded-2xl text-sm bg-gray-200 dark:bg-neutral-700 text-black dark:text-neutral-100 rounded-tl-sm'>
                Typing...
              </p>
            </div>
          )}
        </div>

        <div className='mt-auto flex items-center gap-2 border-t dark:border-neutral-700 px-4 py-3 bg-white dark:bg-neutral-900'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type a message...'
            disabled={isLoading}
            className='flex-1 rounded-full px-4 py-2 text-sm border dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 outline-none disabled:opacity-50'
          />
          <button
            type='button'
            onClick={handleSend}
            disabled={isLoading}
            className='rounded-full bg-blue-500 text-white p-2 hover:bg-blue-600 transition disabled:opacity-50 shrink-0'
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  )
}

const ChatbotWindow = WindowWrapper(Chatbot, 'chatbot')

export default ChatbotWindow