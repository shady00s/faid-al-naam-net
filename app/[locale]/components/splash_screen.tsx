"use client";

import { useEffect, useRef } from "react";
import animation from "./splash_svg_animation";
import Image from "next/image";
import img from '/public/images/logo11.svg'
export default function SplashScreen() {
   /* eslint-disable */
  useEffect(() => {
    animation();
  }, []);
  return (
    
      <div
        className={
          "  bg-black  flex justify-center items-center w-screen h-screen overflow-hidden left-0"
        }
       >
          <Image
                        priority={true}

            alt="loading image"
            src={img}
            width={120}
            height={120}
          />
          {/* <Logo repeatDur={200} width={120} height={120} /> */}
      </div>
    
  );
}
