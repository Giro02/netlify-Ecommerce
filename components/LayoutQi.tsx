"use client";
import { usePathname } from "next/navigation";
import DBLayout from "./DataBaseLayout";
import { createContext } from "react";
import { ProductPreviewArray } from "@/types";

export const ProductContext = createContext<ProductPreviewArray>([]);

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
