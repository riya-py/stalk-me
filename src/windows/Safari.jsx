import { WindowControls } from '#components'
import React from 'react'

const Safari = () => {
  return (
    <>
    <div id='window-header'>
        <WindowControls/>
    </div>
    </>
  )
}

const SafariWindow=WindowWrapper(Safari, "Safari");

export default Safari