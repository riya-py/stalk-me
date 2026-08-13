import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { ExternalLink } from 'lucide-react'

const GITHUB_URL = 'https://github.com/riya-py'

const Github = () => {
  const handleOpenGithub = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div id='window-header'>
        <WindowControls target='github' />
        <h2>GitHub</h2>
      </div>
      <div className='flex flex-col items-center text-center gap-4 p-10'>
        <img src='/images/github.png' alt='GitHub' className='size-14' />
        <div>
          <h3 className='text-lg font-semibold'>Check out my code</h3>
          <p className='text-sm text-gray-500'>github.com/riya-py</p>
        </div>
        <button
          type='button'
          onClick={handleOpenGithub}
          className='flex items-center gap-2 bg-black hover:bg-gray-800 transition text-white text-sm font-medium px-5 py-2.5 rounded-full'
        >
          <ExternalLink size={16} />
          Visit GitHub Profile
        </button>
      </div>
    </>
  )
}

const GithubWindow = WindowWrapper(Github, 'github')

export default GithubWindow