import { authorize } from '@/app/server/actions'
import EnterCodeForm from '@/components/enter-code-form'
import React from 'react'

async function EnterCodePage() {

  const { user } = await authorize()

  return (
    <div className='flex flex-col items-center justify-center size-full'>
      <EnterCodeForm user={user}/>
    </div>
  )
}

export default EnterCodePage