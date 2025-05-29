import Header from '@/components/header'
import React from 'react'
import { getUser } from '../server/actions'

async function MainLayout({ children } : { children: React.ReactNode }) {

  const user = await getUser()

  return (
    <div className='size-full'>
        <Header user={user}/>
        {children}
    </div>
  )
}

export default MainLayout