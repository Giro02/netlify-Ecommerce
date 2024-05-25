
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
                    const foundUser = await checkEmailExists(credentials.email)
                    if(foundUser){
                        const match = await bcrypt.compare(credentials.password, foundUser.password);
                        if(match){
                            delete foundUser.password;
                            foundUser["role"] = "Unverified Email";
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
            // Adding roles
            async profile(profile){
                // console.log("Profile Google", profile);
                let userRole = "Google User";
                if(profile?.email == "pedroarendt02@hotmail.com"){
                    userRole = "admin";
                }
                const existingUser = await checkEmailExists(profile.email);
                console.log(existingUser)

                if(!existingUser){ 
                    // Se o email n esxiste no DB é criado um novo usuario com as info que retornam da api do google
                    try {
                        const newUser = new Users({
                            name: profile.name,
                            email: profile.email,
                            password: '', 
                        });
                        console.log(newUser)
                        await newUser.save();
                        newUser.role = "Google User";
                        return newUser;
                    } catch (error) {
                        console.error("Error creating new user:", error);
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
    
    // Callback customizada para ter certeza que os roles vao funcionar
    callbacks:{
        async jwt({token,user}){
            if(user) token.role = user.role;
            return token;
        },
        async session({session, token}){
            if(session?.user) session.user.role = token.role;
            return session;
        },
    },
    pages: {
        signIn: '/costumer/account/login',
        newUser: '/costumer/account/register', 
      }             
};
