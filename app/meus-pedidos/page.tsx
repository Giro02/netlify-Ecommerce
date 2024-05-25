import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import UserForm from "@/components/UserForm";

export default async function page() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("api/auth/signin?callbackUrl=/meus-pedidos");
  }
  return (
    <div>
      <p>{session?.user?.email}</p>
      <UserForm></UserForm>
    </div>
  );
}
