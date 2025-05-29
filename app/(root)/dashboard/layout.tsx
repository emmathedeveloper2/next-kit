import { authorize } from '@/app/server/actions'



export default async function DashboardLayout({ children } : { children: React.ReactNode }) {

  await authorize()

  return (
    <div className='size-full flex flex-col items-center justify-center'>
      {children}
    </div>
  )
}