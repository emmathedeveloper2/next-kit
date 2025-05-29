"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { handleSignIn } from "@/app/server/actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [state, action, isPending] = useActionState(handleSignIn, undefined)


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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email below to Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button className="w-full">
                  {
                    isPending ?
                      <LoaderIcon className='animate-spin' />
                      :
                      "Sign in"
                  }
                </Button>
                <Button variant="outline" className="w-full">
                  Sign in with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
