import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authSingIn } from "@/helper/cognito";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Cognito",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const result = await authSingIn({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    console.log("authSingIn result successful:", !!result?.accessToken);

                    if (result?.accessToken) {
                        return {
                            id: credentials.email as string,
                            email: credentials.email as string,
                            accessToken: result.accessToken,
                            // idToken: result.idToken,
                            // refreshToken: result.refreshToken,
                        } as any;
                    }
                    return null;
                } catch (error: any) {
                    console.error("Cognito login failed:", error);
                    throw new Error(error?.message || "Invalid credentials.");
                }
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken;
                // token.idToken = (user as any).idToken;
                // token.refreshToken = (user as any).refreshToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session as any).accessToken = token.accessToken;
                // (session as any).idToken = token.idToken;
                // (session as any).refreshToken = token.refreshToken;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
