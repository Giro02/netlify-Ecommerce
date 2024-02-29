import React from "react";
import Image from "next/image";
import banner1 from "../public/images/BannerRET1.png";

export default function BannerBottomHome() {
  return (
    <div className="container flex justify-between">
      <div className="hidden lg:block">
        <Image className="" src={banner1} alt="Bannners"></Image>
      </div>
      <div>
        <Image className="" src={banner1} alt="Bannners"></Image>
      </div>
    </div>
  );
}
