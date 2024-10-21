"use client";

import { useState, useEffect } from "react";

const IsScreenLg = () => {
  const [isLargerThanLG, setIsLargerThanLG] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargerThanLG(window.innerWidth >= 1024);
    };

    // Call the function once after initial render
    checkScreenSize();

    // Add event listener for resize and clean up
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return isLargerThanLG;
};

export default IsScreenLg;

// import { useState, useEffect } from "react";

// const IsScreenLg = () => {
//   const [isLargerThanLG, setIsLargerThanLG] = useState(
//     () => window.innerWidth >= 1024
//   );

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsLargerThanLG(window.innerWidth >= 1024);
//     };

//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   return isLargerThanLG;
// };
// export default IsScreenLg;
