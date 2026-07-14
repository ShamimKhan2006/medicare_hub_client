import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";


import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db();

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://medicare-hub-client.vercel.app",
  ],

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_KEY!,
    },
  },
});