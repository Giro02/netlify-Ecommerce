import { NextResponse } from "next/server";
import User from "../../(modules)/Users";
import bcrypt from "bcrypt"




//Adicionar validação de email

export async function POST(req){
    try{
        const body = await req.json()
        const userData = body.formData
        const userEmail = userData.email.toLowerCase()
        const validCPF = isValidCPF(userData.cpf)

        // if(!validCPF){
        //     return NextResponse.json({message:"CPF Inválido"},{status:401}) 
        // }

        //Confirmar que o ususario existe
        if(!userEmail || !userData.password){
            return NextResponse.json({message:"Algo está faltando"},{status:400})
        }

        //Checar por emails duplicados 
        
        const duplicate = await User.findOne({email: userEmail})
        .lean()
        .exec()
        if(duplicate){
            return NextResponse.json({message:"Email já existe"},{status:409})
        }
        const hashPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashPassword

        await User.create(userData)
        return NextResponse.json({message:"Usuario criado"},{status:201})
    }catch(error){
        return NextResponse.json({message:"Error", err},{status:500})
    }
}