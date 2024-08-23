'use client';

import SetLanguageComponent from "./set_language";
 import Link from "next/link";
import Image from "next/image";
import img from '/public/images/main-logo.svg'
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
export default function Footer() {
    const currentLang = useParams().locale;
    const isEnglish = useParams().locale == "en";

   const langVal = useTranslations("");

  return (
    <footer className=" shrink-0 w-full h-[24vh] p-3 bg-black flex flex-col items-center justify-center  ">
      <div className="h-[20rem] sm:h-[40rem]"></div>

      <div className="flex w-full items-center justify-center max-w-[1908px]">
        <div className="w-[10rem] flex justify-center items-center h-full">
          <Link href="/">
            <Image
                          priority={true}

              alt="faid al naam image"
              src={img}
              width="80"
              height="80"
              className="p-1  h-16"
            />
          </Link> 
        </div>
        <div
          className={` flex flex-col p-2 w-full items-center h-full text-gray-200`}
        >
          <div
            className={` ${
              isEnglish ? "flex-row" : "flex-row-reverse"
            }  max-w-[1908px]  flex-wrap flex items-center justify-evenly w-full h-full text-sm `}
          >
            <Link href={`/${currentLang}/`}>
              <span className="p-1">{langVal("Home")}</span>
            </Link>
            <Link href={`/${currentLang}/projects`}>
              
              <span className="p-1">{langVal("OurProjects")}</span>
            </Link>
            <Link href={` /${currentLang}/our-team`}>
              
              <span className="p-1">{langVal("WhoWeAre")} </span>
            </Link>
            <Link href={` /${currentLang}/contact-us`}>
              <span className="p-1">{langVal("callUs")}</span>
            </Link>
            <SetLanguageComponent />
          </div>
        </div>
      </div>
      <p className="p-2 text-slate-400 text-xs">
        Made with &#10084;, All rights recived.
      </p>
      <a
        target="_blank"
        className="text-slate-200  text-xs"
        href="https://ssk-eta.vercel.app/"
      >
        SSK For Software Solutions
      </a>
    </footer>
  );
}
