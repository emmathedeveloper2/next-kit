"use client";
import { formatEmail } from '@/lib/helpers'
import React, { useActionState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './ui/input-otp'
import { usersTable } from '@/database/schema'
import { handleVerifyCode } from '@/app/server/actions'
import { LoaderIcon } from 'lucide-react'
import { toast } from 'sonner';

type EnterCodeFormProps = {
    user: typeof usersTable.$inferSelect
}

const EnterCodeForm = ({ user } : EnterCodeFormProps) => {

  const [state, action, isPending] = useActionState(handleVerifyCode, undefined)

  useEffect(() => {
    if (state && !state.success) {
      toast.error(
        state.message,
        {
          style: {
              backgroundColor: "var(--destructive)",
              color: "var(--destructive-foreground)",
              fontFamily: "Bricolage Grotesque",
          }
        }
      )
    }
  }, [state])

  return (
    <Card className={"w-full md:w-[400px]"}>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Enter Code</CardTitle>
          <CardDescription className="text-center">
            Enter the 6 digit code we sent to {formatEmail(user.email)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col items-center gap-6">
              
              <InputOTP maxLength={6} name='code'>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <div className="flex flex-col gap-3 w-full">
                <Button className="w-full">
                  {
                    isPending ?
                      <LoaderIcon className='animate-spin' />
                      :
                      "Verify Code"
                  }
                </Button>
                {
                  !isPending &&
                  <Button variant="outline" className="w-full">
                    Resend Code
                  </Button>
                }
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
  )
}

export default EnterCodeForm