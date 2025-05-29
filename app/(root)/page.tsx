import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, Mic2Icon } from "lucide-react";
import { getUser } from "../server/actions";


export default async function HomePage() {

  const user = await getUser()

  return (
    <div className={"size-full flex flex-col items-center justify-center"}>
      <div className="max-width-wrapper flex flex-col gap-4 md:gap-8">
        <h1 className="text-xl md:text-5xl lg:text-7xl font-black">NextKit</h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light">The ultimate Next.js auth starter powered by TailwindCSS, shadcn/ui, Drizzle ORM, and PostgreSQL.
        </p>

        <div className="w-full md:w-[300px]">
          {
            user && user.verified &&
            <Button asChild className='group w-full'>
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
            <Button asChild className='group w-full'>
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
            <Button asChild className='group w-full'>
              <Link href="/signup">
                Sign Up

                <div className='rotate-45 group-hover:rotate-0 transition-transform'>
                  <ArrowRightIcon />
                </div>
              </Link>
            </Button>

          }
        </div>
      </div>
    </div>
  )
}