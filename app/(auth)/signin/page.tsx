import SignInForm from '@/components/signin-form'
import React from 'react'

function SignInPage() {
  return (
    <div className='size-full flex flex-col items-center justify-center'>
        <SignInForm className="w-full md:w-[400px]"/>
    </div>
  )
}

export default SignInPage