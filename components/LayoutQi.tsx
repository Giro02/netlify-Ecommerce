"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import DBLayout from "./DataBaseLayout";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const studio = pathName.startsWith("/studio");
  if (studio) {
    return <>{children}</>;
  } else {
    return (
      <>
        <DBLayout>{children}</DBLayout>
      </>
    );
  }
}
