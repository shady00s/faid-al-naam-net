"use client";
import { useAnimation, motion } from "framer-motion";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import SetLanguageComponent from "./set_language";
import Image from "next/image";
import { useParams } from "next/navigation";
import img from "/public/images/main-logo.svg";

export default function MobileNavComponent({ isEnglish, langVal }: any) {
  const animate = useAnimation();
  const [navClose, setNavClose] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState("/");
  const regex = /^\/(ar|en)\/projects\/(?:%[0-9A-Fa-f]{2}|[-._~!$&'()*+,;=:@]|[a-zA-Z0-9])*$/;

  let currentLang = useParams().locale;
  useEffect(() => {
    getActiveLink(window.location.pathname);
  });
  useEffect(() => {
    if (!navClose) {
      animate.start("hidden");
    } else {
      animate.start("show");
    }
  }, [navClose]);
  function getActiveLink(link: string) {
    if(regex.test(link)){
     setCurrentLocation("/projects");

   }
   else{
     switch (link) {
       case "/" + currentLang:
         setCurrentLocation("/");
         break;
       case "/" + currentLang + "/our-team":
         setCurrentLocation("/our-team");
         break;
       case "/" + currentLang + "/contact-us":
         setCurrentLocation("/contact-us");
         break;
       case "/" + currentLang + "/careers":
         setCurrentLocation("/careers");
         break;
       case "/" + currentLang + "/upload-resume":
         setCurrentLocation("/careers");
         break;
         case "/" + currentLang + "/projects":
         setCurrentLocation("/projects");
         break;

        
     }

   }
 }


  const toogleMobNav = () => {
    setNavClose((prev) => !prev);
  };

  return (
    <nav
      className={` 
    drop-shadow-lg 
    overflow-hidden
    fixed top-0
    z-50
    justify-between
    flex
    flex-col
    px-2
     w-screen bg-black`}
    >
      <div className={`flex w-full justify-between items-center`}>
        <Link
          href={`/${currentLang}`}
          onClick={() => {
            setCurrentLocation("/");
          }}
        >
          <Image
            priority={true}
            alt="faid al naam image"
            src={img}
            width="80"
            height="80"
            className="p-1  h-16"
          />
        </Link>

        <Hamburger
          toggled={navClose}
          toggle={toogleMobNav}
          color="white"
          size={18}
        />
      </div>
      <motion.ul
        variants={{
          show: { height: "15rem" },
          hidden: { height: 0 },
        }}
        initial={"hidden"}
        animate={animate}
        transition={{ duration: 0.12 }}
        className={`flex-col flex ${
          isEnglish ? "items-start " : "items-end"
        }  overflow-hidden justify-evenly  w-full  `}
      >
        <li className="cursor-pointer">
          <Link
            style={{
              color: currentLocation == "/" ? "red" : "white",
            }}
            href={`/${currentLang}`}
            onClick={() => {
              animate.start("hidden").then(() => {
                setNavClose(false);
                setCurrentLocation("/");
              });
            }}
            className="text-white hover:text-red-500"
          >
            {langVal("Home")}
          </Link>
        </li>

        <li className="cursor-pointer">
          <Link
            style={{
              color: currentLocation == "/projects" ? "red" : "white",
            }}
            href={`/${currentLang}/projects`}
            onClick={() => {
              animate.start("hidden").then(() => {
                setNavClose(false);
                setCurrentLocation("/projects");
              });
            }}
            className="text-white  hover:text-red-500"
          >
            {langVal("OurProjects")}
          </Link>
        </li>

        <li className="cursor-pointer">
          <Link
            style={{
              color: currentLocation == "/our-team" ? "red" : "white",
            }}
            href={`/${currentLang}/our-team`}
            onClick={() => {
              animate.start("hidden").then(() => {
                setNavClose(false);
                setCurrentLocation("/our-team");
              });
            }}
            className="text-white  hover:text-red-500"
          >
            {langVal("WhoWeAre")}
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link
            style={{
              color: currentLocation == "/contact-us" ? "red" : "white",
            }}
            href={`/${currentLang}/contact-us`}
            onClick={() => {
              animate.start("hidden").then(() => {
                setNavClose(false);
                setCurrentLocation("/contact-us");
              });
            }}
            className="text-white  hover:text-red-500"
          >
            {langVal("callUs")}
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link
            style={{
              color: currentLocation == "/careers" ? "red" : "white",
            }}
            href={`/${currentLang}/careers`}
            onClick={() => {
              animate.start("hidden").then(() => {
                setNavClose(false);
                setCurrentLocation("/careers");
              });
            }}
            className="text-white  hover:text-red-500"
          >
            {langVal("careers")}
          </Link>
        </li>
        <li className="cursor-pointer flex  m-1">
          <SetLanguageComponent />
        </li>
      </motion.ul>
    </nav>
  );
}
