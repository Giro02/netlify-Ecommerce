import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import AddressesForm from "@/components/Account/AdressesFirst";
import { checkEmailExists } from "@/app/(modules)/Users";
import Addresses, { findAddresses } from "@/app/(modules)/Addresses";
import AddressesShow from "@/components/Account/AddressesShow";

const Page = async () => {
  const session = await getServerSession(options);

  if (!session) {
    const callbackUrl = encodeURIComponent("/costumer/account");

    redirect(`/costumer/orders/login?callbackUrl=${callbackUrl}`);

    return null;
  }

  const userId = await checkEmailExists(session.user.email);
  const userAddress = await findAddresses(userId._id);

  const userIdString = userId._id.toString();
  const userAddressSerialized = JSON.stringify(userAddress);

  if (!userAddress) {
    return (
      <div className="bg-color-4/50">
        <AddressesForm session={session} userId={userIdString}></AddressesForm>
      </div>
    );
  }

  if (userAddress) {
    return (
      <div className="bg-color-4/50">
        <AddressesShow
          userAddress={userAddressSerialized}
          userId={userIdString}
        ></AddressesShow>
      </div>
    );
  }
};

export default Page;
