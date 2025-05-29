import { authorize } from '@/app/server/actions'
import SendCodeForm from '@/components/send-code-form'
import React from 'react'


async function SendCodePage() {

  const { user } = await authorize()

  return (
    <div className='flex flex-col items-center justify-center size-full p-4'>
        <SendCodeForm user={user}/>
    </div>
  )
}

export default SendCodePage