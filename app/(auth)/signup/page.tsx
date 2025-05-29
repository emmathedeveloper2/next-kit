import SignUpForm from '@/components/signup-form'
import React from 'react'

function SignUpPage() {
  return (
    <div className='flex flex-col items-center justify-center size-full'>
        <SignUpForm className='w-full md:w-[400px]'/>
    </div>
  )
}

export default SignUpPage