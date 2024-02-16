import React from "react";

export default function BannersHome(BannerName) {
  return (
    <div className="container flex items-center justify-center px-8">
      <div>
        <img src={BannerName.BannerName[0].banners.image}></img>
      </div>
    </div>
  );
}
