import { useState, useRef } from 'react'
import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { Send, Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// How the typewriter reveal feels — smaller CHARS_PER_TICK / larger
// TICK_MS = slower, more dramatic reveal. Tune to taste.
const TICK_MS = 20
const CHARS_PER_TICK = 2

const TypingIndicator = () => (
  <div className='flex items-center gap-2 justify-start'>
    <Bot size={18} className='shrink-0 dark:text-neutral-300' />
    <div className='px-3 py-2.5 rounded-2xl bg-gray-200 dark:bg-neutral-700 rounded-tl-sm flex items-center gap-1'>
      <span className='typing-dot' />
      <span className='typing-dot' />
      <span className='typing-dot' />
    </div>
  </div>
)

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi, I'm Ria's assistant. Ask me anything!" },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Keeps the reveal timer alive across renders without triggering re-renders itself.
  const revealTimerRef = useRef(null)

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    // Build history from the current conversation BEFORE adding the
    // new user message, so the backend has prior turns for context.
    const history = messages
      .filter((m) => m.text && m.text.trim())
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))

    setMessages((prev) => [...prev, { sender: 'user', text }])
    setInput('')
    setIsLoading(true)

    // Local (non-React-state) buffers — the interval below reads/writes
    // these directly so reveal speed is independent of render timing.
    let queue = ''        // characters received but not yet shown
    let displayed = ''    // characters already shown
    let botMessageAdded = false
    let streamDone = false

    const stopTimer = () => {
      if (revealTimerRef.current) {
        clearInterval(revealTimerRef.current)
        revealTimerRef.current = null
      }
    }

    // Reveals a few characters at a time on a fixed clock, regardless
    // of how big/uneven the actual network chunks are.
    revealTimerRef.current = setInterval(() => {
      if (queue.length > 0) {
        const next = queue.slice(0, CHARS_PER_TICK)
        queue = queue.slice(CHARS_PER_TICK)
        displayed += next

        if (!botMessageAdded) {
          setMessages((prev) => [...prev, { sender: 'bot', text: displayed }])
          botMessageAdded = true
          setIsLoading(false)
        } else {
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { sender: 'bot', text: displayed }
            return updated
          })
        }
      } else if (streamDone) {
        stopTimer()
        setIsLoading(false)

        if (!botMessageAdded) {
          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: "I didn't get a response — try again?" },
          ])
        }
      }
    }, TICK_MS)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history }),
      })

      if (!res.ok) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          streamDone = true
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        if (chunk) queue += chunk
      }
      // Don't stop the timer here — let it keep draining `queue`
      // at the typewriter pace even after the network is done.
    } catch (err) {
      stopTimer()
      setIsLoading(false)
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Sorry, I couldn't reach the server." },
      ])
    }
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

      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background-color: currentColor;
          color: #6b7280;
          display: inline-block;
          animation: typing-bounce 1.2s infinite ease-in-out;
        }
        .dark .typing-dot { color: #d4d4d4; }
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      <div className='absolute left-0 right-0 bottom-0 top-[52px] flex flex-col bg-white dark:bg-neutral-900 overflow-hidden'>
        <div className='flex-1 overflow-y-auto space-y-2 p-4'>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <Bot size={18} className='mt-1 shrink-0 dark:text-neutral-300' />
              )}

              {msg.sender === 'bot' ? (
                <div
                  className='px-3 py-2 rounded-2xl text-sm max-w-[75%] bg-gray-200 dark:bg-neutral-700 text-black dark:text-neutral-100 rounded-tl-sm
                    prose prose-sm dark:prose-invert max-w-none
                    prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0
                    prose-strong:font-semibold prose-headings:my-1'
                >
                  <ReactMarkdown>{msg.text || ' '}</ReactMarkdown>
                </div>
              ) : (
                <p className='px-3 py-2 rounded-2xl text-sm max-w-[75%] bg-blue-500 text-white rounded-tr-sm'>
                  {msg.text}
                </p>
              )}

              {msg.sender === 'user' && (
                <User size={18} className='mt-1 shrink-0 dark:text-neutral-300' />
              )}
            </div>
          ))}

          {isLoading && <TypingIndicator />}
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