import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { LuUser } from "react-icons/lu";
import LoggedMenu from "./LoggedMenu";
import { SessionProvider } from "next-auth/react";

const LoginBtn = async () => {
  const session = await getServerSession(options);
  return session ? (
    <LoggedMenu session={session}></LoggedMenu>
  ) : (
    <div className=" flex justify-end">
      <Link href="/api/auth/signin">
        <div className="flex items-center gap-2  hover:text-color-1 cursor-pointer">
          <LuUser className="ml-11 sm:ml-0 stroke-[1.5]" size={28}></LuUser>
          <p className=" xl:hidden hidden sm:block">Entrar</p>
          <div className="hidden xl:block">
            <p className="text-[12px] text-sm font-thin">Bem-Vindo!</p>
            <p className="text-[13px] font-normal mt-[-6px]">
              Entre na sua conta
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LoginBtn;
