import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
   // baseURL:process.env.BETTER_AUTH_URL|| "http://localhost:3000",
     baseURL:"https://medicare-hub-client.vercel.app",
})

export const { signIn, signUp, useSession, getSession, signOut } = authClient