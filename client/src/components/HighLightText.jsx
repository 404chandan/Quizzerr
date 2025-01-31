import React from 'react'

const HighLightText = ({ children }) => {
  return (
    <span className='mx-3  bg-gradient-to-b from-green-400 px-4 h-max text-xl to-green-800 rounded-full '>{children}</span>
  )
}

export default HighLightText