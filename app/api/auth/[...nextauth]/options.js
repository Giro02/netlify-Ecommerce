import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/app/(modules)/Users";
import bcrypt from "bcrypt";
import { checkEmailExists } from "@/app/(modules)/Users";

export const options = {
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                try{
                    const foundUser = await checkEmailExists(credentials.email);
                    if(foundUser){
                        const match = await bcrypt.compare(credentials.password, foundUser.password);
                        if(match){
                            delete foundUser.password;
                            return foundUser;
                        }
                    }
                }catch (error){
                    console.log(error);
                }
                return null;
            },
        }),
        GoogleProvider({
            async profile(profile){
                let userRole = "Google User";
                if(profile?.email == "pedroarendt02@hotmail.com"){
                    userRole = "admin";
                }
                const existingUser = await checkEmailExists(profile.email);
                
                if(!existingUser){
                    console.log("usuario nao existe")
                    try {
                        const newUser = new Users({
                            name: profile.name,
                            email: profile.email,
                            orders:"",
                            role:"Google User"
                        });
                        console.log("Salvando usuario do google")
                        await newUser.save();
                        newUser.role = "Google User";
                        return newUser;
                    } catch (error) {
                        console.error("Deu erro criando o usuario:", error);
                    }
                }
                if(profile){
                    return {
                        ...profile,
                        id: profile.sub,
                        role: userRole,
                    };
                }
                return null;
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
    pages: {
        signIn: '/costumer/account/login',
        newUser: '/costumer/account/register',
    }
};
