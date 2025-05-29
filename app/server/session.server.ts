import { JWT_SECRET, JWT_EXPIRES_IN } from "@/config/env.config";
import db from "@/database";
import { sessionsTable } from "@/database/schema";
import { ERRORS } from "@/lib/types";
import jwt from "jsonwebtoken";
import { getCookie } from "./actions";


export const generateSessionToken = () => {
    let code = ""

    for(let i = 0; i < 6; i++){
        code += Math.floor(Math.random() * 9).toString()
    }

    const signedToken = jwt.sign({ code } , JWT_SECRET as any , { expiresIn: JWT_EXPIRES_IN as any })

    return {
        signedToken,
        unsignedToken: code
    }
}

export const createSession = async (userId: string, token: string | null) => {

    "use server";

    const data = {
        userId,
        token
    }

    return (await db.insert(sessionsTable).values(data).returning() as any as Array<typeof sessionsTable.$inferSelect>)[0]
}

export const getCurrentSession = async () => {
    
    "use server";
    
    try {

        const session = await getCookie("session")

        if(!session){
            throw new Error(ERRORS.UNAUTHORIZED)
        }

        return JSON.parse(session as any) as typeof sessionsTable.$inferSelect
    }catch (e) {
        throw e
    }
}