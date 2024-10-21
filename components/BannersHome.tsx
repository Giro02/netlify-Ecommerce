import React from "react";

export default function BannersHome(BannerName) {
  return (
    <div className=" hidden lg:flex items-center justify-center px-8">
      <div>
        <img src={BannerName.BannerName[0].banners.image}></img>
      </div>
    </div>
  );
}
