"use client";
 
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ProjectBackgroundContext,
  ProjectDetailsContext,
} from "../context/project";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SplashScreen from "./splash_screen";
 import oldImageData from '/public/images/projectBG.svg';
import contactUs from '/public/images/contactUsImage.svg';
 import { ProjectCardComponent } from "./project_card_component";
import useGetData from "@/app/utils/getData";
export default function ProjectsScreen() {

  const animate = useAnimation();
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectsRef2 = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string>(oldImageData);

  const [oldImage, setOldImage] = useState<string>(image);
  const refAttr = useRef<HTMLDivElement>(null);
  const isInView = useInView(refAttr);
  const [crossfade, setCrossfade] = useState(false);
  const isEnglish = useParams().locale == "en";
  const content = useTranslations("");
  const projects = useGetData('projects')

  const handleAnimation = useCallback(() => {
     if (isInView) {
      animate.start("visible");
    } else {
      animate.start("hidden");
    }
  }, [isInView,projects]);

  const memoizedHandleAnimation = useCallback(handleAnimation, [isInView]);
  useEffect(() => {
    memoizedHandleAnimation();
    productImageAnimation();
  }, [isInView, image,projects]);
 
  const memoizedProductImageAnimation = useCallback(() => {
    if (oldImage !== image) {
      setCrossfade(true);
      setTimeout(() => {
        setOldImage(image);
        setCrossfade(false);
      }, 150);
    }
  }, [image, oldImage]);

  useEffect(() => {
    memoizedProductImageAnimation();
  }, [image, oldImage]);

  const productImageAnimation = useCallback(() => {
    if (oldImage !== image) {
      setCrossfade(true);
      setTimeout(() => {
        setOldImage(() => image);
        setCrossfade(false);
      }, 150);
    }
  }, [image]);

  return (
    <>
 
          <div
            id="our-projects"
            className={`shrink-0 overflow-y-hidden w-screen   relative flex flex-col bg-black ${
              isEnglish ? "items-start" : "items-end"
            } `}
            >
            <section ref={refAttr} className=" w-full h-full max-w-[2080px] relative">
              <div className="h-12 "></div>
                {projects.length == 0 ? <SplashScreen/>:
                <>
                <div
                className={`w-full relative h-full flex flex-col justify-center ${
                  isEnglish ? "items-start" : "items-end"
                } sm:p-8 sm:py-12 p-4`}
              >
                <ProjectBackgroundContext.Provider value={{ image, setImage }}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    animate={crossfade ? "hidden" : "visible"}
                    transition={{ duration: 0.9 }}
                    className="filter   blur-sm blu absolute w-full h-full  top-0 left-0 object-cover"
                  >
                    <Image
                      priority={true}
                      alt="project background"
                      src={oldImage}
                      fill
                    />
                  </motion.div>

                  <div className="p-8 "></div>
                  <header
                    className={` flex flex-col p-8 items-center justify-center w-full`}
                  >
                    <motion.h1
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                      initial="hidden"
                      animate={animate}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="text-5xl font-bold  pb-2 text-white z-20"
                    >
                      {content("OurProjects")}
                    </motion.h1>
                    <motion.h4
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                      initial="hidden"
                      animate={animate}
                      transition={{ duration: 0.3, delay: 0.45 }}
                      className={`text-base pb-4 text-white z-20 ${
                        isEnglish ? "text-left" : "text-right"
                      }`}
                    >
                      {content("projectsTitle")}
                    </motion.h4>
                  </header>

                    <motion.div
                      id="projects"
                      variants={{
                        hidden: { opacity: 0, y: 221 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      initial="hidden"
                      animate={animate}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      style={{ overflowAnchor: "none" }}
                      ref={projectsRef}
                      className="w-full m-auto z-20 max-w-[1080px]  "
                    >
                      <div
                        ref={projectsRef2}
                        className={`flex items-center h-full  content-center flex-wrap   w-full  `}
                       >
                       {projects.map((e:any) => (
                              <ProjectCardComponent
                              isEnglish={isEnglish}
                                key={e._id}
                                imagePath={e.media}
                                title={isEnglish? e.projectNameEn : e.projectNameAr}
                                subTitle={isEnglish? e.discreptionEn : e.discreptionAr}
                                startDate={e.startDate}
                                endDate={e.endDate}
                                todos={isEnglish? e.projectStepsEn : e.projectStepsAr}
                               />
                            ))}
                      </div>

                    </motion.div>
                 </ProjectBackgroundContext.Provider>
                 
              </div>
 
               
              <div className="flex justify-center  relative items-center flex-col w-full h-[21rem]">
                <Image
                  priority={true}
                  alt="sub nav image"
                  src={contactUs}
                  style={{ objectFit: "cover" }}
                  className="  bg-no-repeat bg-center "
                  fill={true}
                />
                <h1 className="text-4xl font-bold text-white mb-3 z-20">
                  {isEnglish ? "Ready to get started?" : "جاهز للبدء؟"}
                </h1>
                <Link
                  style={{ backgroundColor: "rgba(0,19,85,0.56) " }}
                  className="py-3 px-2 z-20 m-1 cursor-pointer rounded-md  hover:text-white  text-sm font-bold text-gray-200 border-2  transition-all"
                  href={"/contact-us"}
                >
                  <h4>{content("subNavContactUs")}</h4>
                </Link>
              </div>
                </>}
           
              
              
            </section>
          </div>
          <Footer />
         </>

   );
}
