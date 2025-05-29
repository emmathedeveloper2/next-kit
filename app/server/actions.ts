"use server";

import { safeTry } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { sendCode, signInWithEmailAndPassword, signUpWithEmailAndPassword, verifyCode } from "./auth.server";
import { cookies } from "next/headers";
import { getCurrentUser } from "./user.server";
import { getCurrentSession } from "./session.server";

export const setCookie = async (name: string , cookie: string) => {

    const cookieStore = await cookies()

    cookieStore.set(name , cookie)
}

export const getCookie = async(name: string) => {

    const cookieStore = await cookies()

    return cookieStore.get(name)?.value
}

export const handleSignUp = async (initialState?: any , formData?: FormData) => {

        if(!formData) return {
            success: false,
            message: "Form data not found"
        }

        //Parse data from request
        const { username , email, password }: any = Object.fromEntries(formData)

        const [ success , session , message ] = await safeTry(signUpWithEmailAndPassword(username , email, password))
    
        if(!success) return {
            success,
            message
        }

        await setCookie("session" , JSON.stringify(session))
    
        return redirect('/send-code')
}

export const handleSignIn = async (initialState?: any , formData?: FormData) => {

    if(!formData) return {
        success: false,
        message: "Form data not found"
    }

    const { email , password } = Object.fromEntries(formData) as Record<string , string>

    const [ success , data ] = await safeTry(signInWithEmailAndPassword(email , password))

    if(!success) return { success , message: data.message }

    await setCookie("session" , JSON.stringify(data))

    return redirect('/dashboard')
}

export const handleSendCode = async (initialState?: any , formData?: FormData) => {

    if(!formData) return {
        success: false,
        message: "Form data not found"
    }

    const [sesssionSuccess, session , sessionMessage] = await safeTry(getCurrentSession())

    if(!sesssionSuccess || !session) return {
        success: false,
        message: sessionMessage
    }

    const { email } = Object.fromEntries(formData)

    const [ success , data ] = await safeTry(sendCode(session , email as string))

    if(!success) return { success , message: data.message }

    setCookie("session" , JSON.stringify(data))

    return redirect('/enter-code')
}

export const handleVerifyCode = async (initialState?: any , formData?: FormData) => {

    if(!formData) return {
        success: false,
        message: "Form data not found"
    }

    const { code } = Object.fromEntries(formData)

    const [ success , data ] = await safeTry(verifyCode(code as string))

    if(!success) return { success , message: data.message }

    return redirect('/dashboard')
}

export const handleSignOut = async (initialState?: any) => {

    await setCookie("session" , "")

    return redirect('/')
}

export const authorize = async () => {

    const [success, user] = await safeTry(getCurrentUser())

    if (!success || !user){
        setCookie("session" , JSON.stringify(''))

        return redirect('/signup') 
    } 

    return { user }
}

export const getUser = async () => {

    const [success, user] = await safeTry(getCurrentUser())

    if (!user || !success) return

    return user
}