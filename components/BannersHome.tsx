import React from "react";

export default function BannersHome(BannerName) {
  return (
    <div className=" flex items-center justify-center ">
      <div>
        <img src={BannerName.BannerName[0].banners.image}></img>
      </div>
    </div>
  );
}
