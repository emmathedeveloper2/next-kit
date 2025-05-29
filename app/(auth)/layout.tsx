import React from 'react'

function AuthLayout({ children } : { children: React.ReactNode }) {
  return (
    <div className='size-full'>
        {children}
    </div>
  )
}

export default AuthLayout