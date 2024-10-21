import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import MyOrders from "@/components/Account/MyOrders";
import User, { checkOrdersExists } from "@/app/(modules)/Users";

const Page = async () => {
  const session = await getServerSession(options);
  if (!session) {
    const callbackUrl = encodeURIComponent("/costumer/account");
    redirect(`/costumer/account/login?callbackUrl=${callbackUrl}`);
  }
  const orders = await checkOrdersExists(session.user.email);

  return (
    <div className="bg-color-4/40">
      <MyOrders session={session} orders={orders.orders}></MyOrders>
    </div>
  );
};

export default Page;
