import WindowWrapper from '#hoc/WindowWrapper'
import React from 'react'

export const Contact = () => {
  return (
    <>
    <div id="window-header">
        <h2>Contact me</h2>
    </div>
    <div className='p-5 space-y-5'>
        
    </div>
    </>
  )
}

const ContactWindow=WindowWrapper(Contact, "contact")

export default ContactWindow
