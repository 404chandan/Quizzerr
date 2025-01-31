import React from 'react'

const RequiredError = ({ children }) => {
    return (
        <span className='text-sm text-red-400 pt-1 text-end'>{children}</span>
    )
}

export default RequiredError