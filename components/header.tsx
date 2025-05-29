"use client";
import { handleSignOut } from '@/app/server/actions';
import { usersTable } from '@/database/schema';
import React, { useActionState } from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRightIcon, LoaderIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  user?: typeof usersTable.$inferSelect
}

export default function Header({ user }: HeaderProps) {

  const pathname = usePathname()

  const [state, signOutAction, isPending] = useActionState(handleSignOut, undefined)

  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 w-[90%] bg-background p-2 rounded-md shadow-lg'>
      <div className='max-width-wrapper flex items-center justify-between'>
        
        <Link href="/">
          <h1 className='text-xl font-bold'>NextKit</h1>
        </Link>

        {
          user && user.verified && !pathname.startsWith('/dashboard') &&
          <Button asChild className='group'>
            <Link href="/dashboard">
              Dashboard

              <div className='rotate-45 group-hover:rotate-0 transition-transform'>
                <ArrowRightIcon />
              </div>
            </Link>
          </Button>
        }

        {
          user && !user.verified &&
          <Button asChild className='group'>
            <Link href="/send-code">
              Verify Email

              <div className='rotate-45 group-hover:rotate-0 transition-transform'>
                <ArrowRightIcon />
              </div>
            </Link>
          </Button>
        }

        {
          !user &&
          <Button asChild className='group'>
            <Link href="/signup">
              Sign Up

              <div className='rotate-45 group-hover:rotate-0 transition-transform'>
                <ArrowRightIcon />
              </div>
            </Link>
          </Button>
        }

        {
          user && user.verified && pathname.startsWith('/dashboard') &&
          <form action={signOutAction}>
            <Button className='group'>
              {
                isPending ?
                  <LoaderIcon className='animate-spin' />
                  :
                  <>
                    Sign Out

                    <div className='rotate-45 group-hover:rotate-0 transition-transform'>
                      <ArrowRightIcon />
                    </div>
                  </>
              }
            </Button>
          </form>
        }
      </div>
    </div>
  )
}