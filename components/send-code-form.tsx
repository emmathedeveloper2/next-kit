"use client";
import { formatEmail } from '@/lib/helpers'
import { AsteriskSquareIcon, LoaderIcon } from 'lucide-react'
import React, { useActionState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { usersTable } from '@/database/schema'
import { handleSendCode } from '@/app/server/actions'
import Link from 'next/link';

type SendCodeFormProps = {
    user: typeof usersTable.$inferSelect
}

const SendCodeForm = ({ user }: SendCodeFormProps) => {

    const [state, action, isPending] = useActionState(handleSendCode, undefined)

    return (
        <Card className={"w-full md:w-[400px]"}>
            <CardHeader>
                <CardTitle className="text-2xl text-center">Send Code</CardTitle>
                <CardDescription className="text-center">
                    Send a 6 digit code to {formatEmail(user.email)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <input name='email' type="text" defaultValue={user.email} hidden />
                    <Button className='w-full mb-6'>
                        {
                            isPending ?
                                <LoaderIcon className='animate-spin' />
                                :
                                <>
                                    <AsteriskSquareIcon />
                                    Send 6 digit code
                                </>
                        }
                    </Button>
                </form>

                <Button asChild variant={'link'} className='w-full'>
                    <Link href={'/signup'}>
                        Go back to sign up
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default SendCodeForm
