import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  /** baseURL না দিলে browser এর current origin (client নিজেই) ব্যবহার করে,
   *  যেখানে better-auth handler (/api/auth/...) আছে। এতে CORS error ঠেকানো যায়। */
})

export const { signIn, signUp, useSession, getSession, signOut } = authClient