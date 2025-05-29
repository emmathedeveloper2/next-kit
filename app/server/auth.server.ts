"use server";

import { sendVerificationEmail } from "@/config/email/email.config";
import { JWT_EXPIRES_IN, JWT_SECRET } from "@/config/env.config";
import db from "@/database";
import { sessionsTable, usersTable } from "@/database/schema";
import { ERRORS } from "@/lib/types";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { getCurrentSession } from "./session.server";
import { safeTry } from "@/lib/helpers";
import { generateSessionToken } from "./session.server";

export const sendCode = async (
  session: typeof sessionsTable.$inferSelect,
  email: string
) => {
  try {
    const { signedToken, unsignedToken } = generateSessionToken();

    const updatedSessions = await db
      .update(sessionsTable)
      .set({ code: signedToken })
      .where(eq(sessionsTable.id, session.id))
      .returning();

    await sendVerificationEmail(email, unsignedToken);

    return updatedSessions[0];
  } catch (e) {
    throw e;
  }
};

export const verifyCode = async (code: string) => {
  try {
    const session = await getCurrentSession();

    const { code: expectedCode } = jwt.verify(
      session.code as string,
      JWT_SECRET!
    ) as { code: string };

    if (code == expectedCode) {
      const [sessionSuccess, updatedSessions, msg1] = await safeTry(
        db
          .update(sessionsTable)
          .set({ code: null })
          .where(eq(sessionsTable.id, session.id))
          .returning()
      );

      if (!sessionSuccess || updatedSessions.length < 1) throw new Error(msg1);

      const [updatedUserSuccess, _, msg2] = await safeTry(
        db
          .update(usersTable)
          .set({ verified: true })
          .where(eq(usersTable.id, updatedSessions[0].userId))
          .returning()
      );

      if (!updatedUserSuccess) throw new Error(msg2);

      return updatedSessions[0];
    } else {
      throw new Error("Invalid code");
    }
  } catch (e) {
    throw e;
  }
};

export const signUpWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser) throw new Error(ERRORS.EMAIL_TAKEN);

    const salt = await bcrypt.genSalt(10);

    const hashed = await bcrypt.hash(password, salt);

    const [user] = await db
      .insert(usersTable)
      .values({ username, email, password: hashed, verified: false })
      .returning();

    if (!user) throw new Error(ERRORS.USER_CREATION_ERROR);

    const [session] = await db
      .insert(sessionsTable)
      .values({ userId: user.id, code: null })
      .returning();

    if (!session) throw new Error(ERRORS.SESSION_CREATION_ERROR);

    return session;
  } catch (e) {
    throw e;
  }
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    //check that the user exists
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) throw new Error(ERRORS.ACCOUNT_NOT_FOUND);

    //check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw new Error(ERRORS.INCORRECT_PASSWORD);

    //get the users session

    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.userId, user.id));

    if (!session) throw new Error(ERRORS.SESSION_NOT_FOUND);

    return session;
  } catch (e) {
    throw e;
  }
};
