import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { Mail as MailIcon, Send } from 'lucide-react'

const EMAIL = 'riya.rk006@gmail.com'

const Mail = () => {
  const handleOpenMail = () => {
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`
    window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div id='window-header'>
        <WindowControls target='mail' />
        <h2>Mail</h2>
      </div>
      <div className='flex flex-col items-center text-center gap-4 p-10'>
        <MailIcon size={48} className='text-blue-500' />
        <div>
          <h3 className='text-lg font-semibold'>Let's talk</h3>
          <p className='text-sm text-gray-500'>{EMAIL}</p>
        </div>
        <button
          type='button'
          onClick={handleOpenMail}
          className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition text-white text-sm font-medium px-5 py-2.5 rounded-full'
        >
          <Send size={16} />
          Open in Mail App
        </button>
      </div>
    </>
  )
}

const MailWindow = WindowWrapper(Mail, 'mail')

export default MailWindow