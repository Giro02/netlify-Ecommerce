import { NextResponse } from "next/server";
import User from "../../(modules)/Users";
import bcrypt from "bcrypt"


//Verificação do CPF
function isValidCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

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