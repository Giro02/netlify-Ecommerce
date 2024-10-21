import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Myaccount from "@/components/Account/Myaccount";

const Page = async () => {
  const session = await getServerSession(options);

  if (!session) {
    const callbackUrl = encodeURIComponent("/costumer/account");
    redirect(`/costumer/account/login?callbackUrl=${callbackUrl}`);
  }

  return (
    <div className="bg-color-4/40">
      <Myaccount session={session}></Myaccount>
    </div>
  );
};

export default Page;
