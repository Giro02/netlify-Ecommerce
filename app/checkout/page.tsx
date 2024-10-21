import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import CheckOut from "@/components/CheckOut";
import Addresses, { findAddresses } from "@/app/(modules)/Addresses";
import { checkEmailExists } from "@/app/(modules)/Users";

export default async function page() {
  const session = await getServerSession(options);
  const userId = await checkEmailExists(session.user.email);
  const userAddress = await findAddresses(userId._id);

  const userAddressSerialized = JSON.stringify(userAddress);
  const userIdString = userId._id.toString();

  if (!session) {
    redirect("api/auth/signin?callbackUrl=/checkout");
  }

  return (
    <div>
      <CheckOut
        userAddress={userAddressSerialized}
        userId={userIdString}
      ></CheckOut>
    </div>
  );
}
