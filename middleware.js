import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


// O middleware da run antes de qualquer request ser feita, com isso é possivel modificar as regras de redirecionamento
// Importante manter o código limpo e simples para não causar delay na renderização
// Não realizar operações de manipulação de banco de dados (Post, Get)
export default withAuth(
    function middleware(req){
        // Caso o usuario tentar acessar a url /quem-somos e não fo o admin ele será redirecionado para a pagina not-found
        if(req.nextUrl.pathname.startsWith("/quem-somos") && req.nextauth.token.role != "admin"){
            return NextResponse.rewrite(new URL("/not-found", req.url))
        }
    },
    // Caso o usuario tenha o role de admin ele terá um token e vai ser autorizado a entrar
    {   
        callbacks:{
            authorized:({token}) => !!token,
        },
    }
    
)




// O matcher e responsavel 
export const config = { matcher: ["/quem-somos",]}