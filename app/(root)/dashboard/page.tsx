import { authorize } from '@/app/server/actions'
import React, { use } from 'react'

export default async function DashboardPage() {

  const { user } = await authorize()

  return (
    <div className='size-full flex flex-col items-center justify-center'>
        <p>Welcome {user.username}</p>
        <p>Your email is {user.email}</p>
        {
          user.verified ?
          <p>Your account is verified</p>
          :
          <p>Your account is not verified</p>
        }
    </div>
  )
}