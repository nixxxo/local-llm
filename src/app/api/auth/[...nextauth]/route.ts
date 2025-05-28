import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import logger from "@/utils/logger";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    events: {
        signIn: async ({ user, account, profile }) => {
            const timestamp = new Date();
            logger.info(`User signed in: ${user.email} on ${timestamp.toDateString()} at ${timestamp.toTimeString()}`, {
                email: user.email,
                date: timestamp.toDateString(),
                time: timestamp.toTimeString(),
            });
        },
    },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
