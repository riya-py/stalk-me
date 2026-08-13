import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { ExternalLink } from 'lucide-react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/riyark006'

const Linkedin = () => {
  const handleOpenLinkedin = () => {
    window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div id='window-header'>
        <WindowControls target='linkedin' />
        <h2>LinkedIn</h2>
      </div>
      <div className='flex flex-col items-center text-center gap-4 p-10'>
        <svg viewBox="0 0 448 512" className="w-12 h-12" fill="#0A66C2">
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
        </svg>
        <div>
          <h3 className='text-lg font-semibold'>Let's connect</h3>
          <p className='text-sm text-gray-500'>linkedin.com/in/riyark006</p>
        </div>
        <button
          type='button'
          onClick={handleOpenLinkedin}
          className='flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] transition text-white text-sm font-medium px-5 py-2.5 rounded-full'
        >
          <ExternalLink size={16} />
          View LinkedIn Profile
        </button>
      </div>
    </>
  )
}

const LinkedinWindow = WindowWrapper(Linkedin, 'linkedin')

export default LinkedinWindow