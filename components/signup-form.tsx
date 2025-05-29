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
import { handleSignUp } from "@/app/server/actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { LoaderIcon } from "lucide-react";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {


  const [state, action, isPending] = useActionState(handleSignUp, undefined)


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
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="John Doe"
                  required
                />
              </div>

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
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required name="password" />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {
                    isPending ?
                      <LoaderIcon className='animate-spin' />
                      :
                      "Sign Up"
                  }
                </Button>
                <Button variant="outline" className="w-full">
                  Sign Up with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
