"use server";

import db from "@/database";
import { usersTable, sessionsTable } from "@/database/schema";
import { ERRORS } from "@/lib/types";
import { eq } from "drizzle-orm";
import { getCookie } from "./actions";
import { getCurrentSession } from "./session.server";

export const createUser = async (data: typeof usersTable.$inferInsert) => {

    data.verified = false

    return (await db.insert(usersTable).values(data).returning() as any as Array<typeof usersTable.$inferSelect>)[0]
}

export const getUserByEmail = async (email: string) => {

    return (await db.select().from(usersTable).where(eq(usersTable.email , email)) as any as Array<typeof usersTable.$inferInsert>)[0]
}

export const getUserById = async (id: string) => {

    try {
        const users = await db.select().from(usersTable).where(eq(usersTable.id , id)) as any as Array<typeof usersTable.$inferInsert>

        if(!users[0]) {
            const err = new Error()

            err.message = "User not found"

            throw err
        }

        return users[0] as typeof usersTable.$inferSelect
    }catch (e) {
        throw e
    }
}

export const getCurrentUser = async () => {

    try{
        
        const session = await getCurrentSession()

        return await getUserById(session.userId)
    }catch (e) {
        throw e
    }
}