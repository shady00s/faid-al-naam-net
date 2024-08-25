"use client";

import Image from "next/image";
import logo from '/public/images/main-logo.svg'
import { motion, useAnimation } from "framer-motion";
import useWindowSize from "../hooks/window-size";
import MobileNavComponent from "./mob_navigation";
import SetLanguageComponent from "./set_language";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const NavigationComponent: React.FC = () => {
  const animate = useAnimation();
  let params =  useParams().locale; 
  const isEnglish = params == "en";

   const langVal = useTranslations("");
  const { width } = useWindowSize();

  const [currentLocation, setCurrentLocation] = useState("/");
  const regex = /^\/(ar|en)\/projects\/(?:%[0-9A-Fa-f]{2}|[-._~!$&'()*+,;=:@]|[a-zA-Z0-9])*$/;
  
  useEffect(() => {
    getActiveLink(window.location.pathname);
  });

  useEffect(() => {
    if (width > 950) {
      animate.start("show");
      animate.start("hideMob");
    } else {
      animate.start("hide");
      animate.start("showMob");
    }
  }, [width]);
  function getActiveLink(link: string) {
     if(regex.test(link)){
      setCurrentLocation("/projects");

    }
    else{
      switch (link) {
        case "/" + params:
          setCurrentLocation("/");
          break;
        case "/" + params + "/our-team":
          setCurrentLocation("/our-team");
          break;
        case "/" + params + "/contact-us":
          setCurrentLocation("/contact-us");
          break;
        case "/" + params + "/careers":
          setCurrentLocation("/careers");
          break;
          case "/" + params + "/careers":
          setCurrentLocation("/upload-resume");
          break;
          case "/" + params + "/projects":
          setCurrentLocation("/projects");
          break;

         
      }

    }
  }

  return (
    <div>
      <motion.nav
        variants={{
          hide: { opacity: 0, x: 1132 },
          show: { opacity: 1, x: 0 },
        }}
        initial="hide"
        animate={animate}
        transition={{ duration: 0.2 }}
        className={` 
          fixed top-0
           z-50
       ${isEnglish ? "flex-row-reverse" : "flex-row"}
         px-2
        items-center
        justify-between
        flex w-screen bg-black h-20 drop-shadow-lg `}
      >
        <Link
          href="/"
          onClick={() => {
            setCurrentLocation("/");
          }}
        >
          <Image
                        priority={true}

            alt="faid al naam image"
            src={logo}
            width="80"
            height="80"
            className="p-1  h-16"
          />
        </Link>

        <ul
          className={`items-center flex ${
            isEnglish ? "flex-row" : "flex-row-reverse"
          } w-[48rem] justify-evenly`}
        >
          <li>
            <Link
              style={{
                color: currentLocation == "/" ? "red" : "white",
              }}
              className={`text-white cursor-pointer transition-all hover:text-red-500 `}
              onClick={() => {
                setCurrentLocation("/");
              }}
              href={`/${params}`}
            >
              {langVal("Home")}
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: currentLocation == "/projects" ? "red" : "white",
              }}
              onClick={() => {
                setCurrentLocation("/projects");
              }}
              href={`/${params}/projects`}
              className={`text-white cursor-pointer hover:text-red-500 ${
                currentLocation == "/projects" ? "text-red-500" : "text-white"
              }`}
            >
              {langVal("OurProjects")}
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: currentLocation == "/our-team" ? "red" : "white",
              }}
              onClick={() => {
                setCurrentLocation("/our-team");
              }}
              href={`/${params}/our-team`}
              className={`text-white cursor-pointer hover:text-red-500`}
            >
              {langVal("WhoWeAre")}
            </Link>
          </li>

          <li>
            <Link
              style={{
                color: currentLocation == "/contact-us" ? "red" : "white",
              }}
              onClick={() => {
                setCurrentLocation("/contact-us");
              }}
              href={`/${params}/contact-us`}
              className={`text-white cursor-pointerhover:text-red-500`}
            >
              {langVal("callUs")}
            </Link>
          </li>
          <li>
            <Link
              style={{
                color: currentLocation == "/careers" ? "red" : "white",
              }}
              onClick={() => {
                setCurrentLocation("/careers");
              }}
              href={`/${params}/careers`}
              className={`text-white cursor-pointer hover:text-red-500`}
            >
              {langVal("careers")}
            </Link>
          </li>

          <li className="cursor-pointer flex ">
            <SetLanguageComponent />
          </li>
        </ul>
      </motion.nav>
      <motion.div
        variants={{
          hideMob: { opacity: 0, x: 3132 },
          showMob: { opacity: 1, x: 0 },
        }}
        initial="show"
        animate={animate}
        transition={{ duration: 0.3 }}
      >
        <MobileNavComponent isEnglish={isEnglish} langVal={langVal} />
      </motion.div>
    </div>
  );
};

export default NavigationComponent;
