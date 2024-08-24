"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useCallback, useRef, useState } from "react";
 import Footer from "../components/footer";
 import { CareersCard, CareersDetails } from "../components/careers_card";
import useWindowSize from "../hooks/window-size";
import Link from 'next/link'
import careersLogo from '../../../public/images/careers_bk.svg'
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
 import useGetData from "@/app/utils/getData";
 import SplashScreen from './splash_screen'
 export default function CareersScreen() {
const dataList = useGetData('careers'); 
    const refAttr = useRef<HTMLDivElement>(null);
  const careersRef = useRef<HTMLDivElement>(null);
  const animate = useAnimation();
  const [active, setActive] = useState<string>("");
  const content = useTranslations("")
  const isInView = useInView(refAttr);
  const isCareerInView = useInView(careersRef);
const isEnglish = useParams().locale == "en";
  const { width } = useWindowSize();
  const [closed, setIsClosed] = useState<boolean>(false);
  const [isClicked, setIsisClicked] = useState<boolean>(false);
  const handleAnimation = useCallback(() => {
     if (isInView) {
      animate.start("visible");
    } else {
      animate.start("hidden");
    }
  }, [isInView,dataList]);
  

  useEffect(() => {
    if (careersRef.current) {
      animate.start("showCareers");
    } else {
      animate.start("hideCareers");
    }
  }, [isCareerInView,dataList, careersRef.current]);

  useEffect(() => {
    if (width <= 930 && !isClicked) {
      setIsClosed(true);

      animate.start("hideDetails");
    } else {
      setIsClosed(false);

      animate.start("showDetails");
    }
  }, [width, dataList]);
  useEffect(() => {
    handleAnimation();
  }, [isInView,dataList]);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (dataList?.careers?.length > 0) {
      setData(dataList[0]);
      setActive(dataList[0]?._id ?? "");
    }
  }, [dataList]);
  return (
        <>
          <div
            className="shrink-0  h-auto w-full overflow-hidden"
          >
              <section
               id="careers"
              className={`relative w-screen   overflow-x-auto  flex flex-col bg-white ${
                isEnglish ? "items-start" : "items-end"
              }`}
            >
               <div ref={refAttr}  className=" h-64 absolute top-10" />

              { dataList && dataList?.careers? 
<>
              <div
                className={` flex flex-col p-8 ${
                  isEnglish ? "items-start" : "items-end"
                } w-full`}
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${careersLogo.src })`,
                }}
              >
                <div   className="p-8"></div>
               
                <header
                  className={`flex flex-col w-full p-8 items-center justify-center `}
                >
                  <motion.h1
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    initial="hidden"
                    animate={animate}
                    transition={{ duration: 0.3, delay: 0.13 }}
                    className="text-5xl z-10 font-bold  pb-2"
                  >
                    {content("careers")}
                  </motion.h1>
                  <motion.h2
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    initial="hidden"
                    animate={animate}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className={`  z-10 text-base pb-4 ${
                      isEnglish ? "text-left" : "text-right"
                    }`}
                  >
                    {content("aboutUsSubTitle")}
                  </motion.h2>

                </header>
                <div className="flex flex-col z-10 m-auto max-w-[1080px] justify-center items-center">
                  <motion.p
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    initial="hidden"
                    animate={animate}
                    transition={{ duration: 0.3, delay: 0.13 }}
                    className="w-4/5"
                  >
                    {content("careersParagraph")}
                  </motion.p>

                  <motion.button

                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    initial="hidden"
                    animate={animate}
                    transition={{ duration: 0.3, delay: 0.13 }}
                    onClick={() => {
                      if (dataList?.careers?.length > 0) {
                        careersRef.current!.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="p-2 bg-red-500 mt-4 text-white"
                  >
                    {dataList&& dataList?.careers?.length > 0
                      ? content("CheckForAvailableJobs")
                      : content("UploadYourResume")}
                  </motion.button>
                </div>
              </div>

              <div
                className={`w-screen flex flex-col ${
                  isEnglish ? "" : "items-start"
                }}`}
              >
                <motion.div
                  variants={{
                    hideCareers: { opacity: 0 },
                    showCareers: { opacity: 1 },
                  }}
                  initial="hideCareers"
                  animate={animate}
                  transition={{ duration: 0.3, delay: 0.33 }}
                  className="p-1  max-w-[1580px]   min-h-screen justify-center  items-start flex   flex-wrap   w-full"
                >
                  {dataList?.careers?.length > 0 ? (
                    <div className="w-screen max-w-[1580px] items-center  m-auto ">
                      <div className="w-full flex items-center h-[45vh]">
                        <motion.p
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                          }}
                          initial="hidden"
                          animate={animate}
                          transition={{ duration: 0.3, delay: 0.33 }}
                          className="p-2 w-4/6 m-auto  text-center"
                        >
                          {content("careersSubP")}
                        </motion.p>
                      </div>

                      <div ref={careersRef}></div>
                      <motion.h3
                        variants={{
                          hideCareers: { opacity: 0 },
                          showCareers: { opacity: 1 },
                        }}
                        initial="hideCareers"
                        animate={animate}
                        transition={{ duration: 0.3, delay: 0.13 }}
                        className="text-2xl text-center font-bold"
                      >
                        {content("availableJobs")}
                      </motion.h3>
                      <div className="h-20"></div>

                      <div
                        className={`flex w-screen  h-full overflow-hidden relative transition-all`}
                      >
                        {/* jobs card */}
                        <div className=" transition-all  h-full w-screen  sm:items-center  items-start justify-start p-2 flex flex-wrap ">
                          {dataList?.careers?.map((e: any) => (
                            <CareersCard
                              id={e._id}
                              key={e._id}
                              isActive={e._id == active}
                              onClick={() => {
                                setData(e);
                                setActive(e._id);
                                setIsisClicked(() => true);
                                if (width <= 720 || isClicked) {
                                  animate
                                    .start("showDetails")
                                    .then(() => setIsClosed(false));
                                }
                              }}
                              title={isEnglish?e.nameEn : e.nameAr}
                              locationEn={isEnglish?e.locationEn : e.locationAr}
                              experianceEn={isEnglish?e.experianceEn : e.experianceAr}
                              jobSiteEn={isEnglish?e.jobSiteEn : e.jobSiteAr}
                            />
                          ))}
                        </div>
                        {/* job details */}
                        <motion.div
                          variants={{
                            hideDetails: {
                              left: "99vw",
                              opacity: 0,
                              width: 0,
                              height: 0,
                            },
                            showDetails: {
                              left: 0,
                              opacity: 1,
                              width: "100%",
                              height: "100%",
                            },
                          }}
                          initial="hideDetails"
                          animate={animate}
                          transition={{ duration: 0.3, delay: 0.13 }}
                          className="
                             bg-white overflow-y-auto overflow-x-hidden w-screen   lg:relative flex absolute "
                        >
                           {data && !closed ? (
                            <CareersDetails
                              onCloseDetails={() => {
                                setIsClosed(true);
                                animate.start("hideDetails");
                              }}
                              id={data._id}
                              title={isEnglish? data.nameEn : data.nameAr}
                              locationEn={isEnglish?data.locationEn : data.locationAr}
                              experianceEn={
                                data.experianceEn ?? data.experianceAr
                              }
                              jobSiteEn={isEnglish? data.jobSiteEn : data.jobSiteAr}
                              summeryEn={isEnglish?data.summaryEn : data.summaryAr}
                            />
                          ) : (
                            <></>
                          )}
                        </motion.div>
                      </div>

                      <div className="max-w-[1080px] mt-36 mb-10 flex flex-col items-center justify-center m-auto ">
                        <p className="w-4/5 text-center">
                          {content("didntFindJobP")}
                        </p>
                        <Link
                           href={{pathname:"/upload-resume", query: { availableJob: 'false' }}}
                          className="p-2 mt-6 bg-red-500  text-white"
                        >
                          {content("UploadYourResume")}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex  w-screen max-w-[1080px] p-3 h-screen flex-col items-center justify-center">
                      <div ref={careersRef}></div>

                      <p className="w-4/5 text-center">{content("NoCareersP")}</p>
                      <Link
                         href={{pathname:"/upload-resume",
                          query: { name: 'test' },}  }
                        className="p-2 mt-6 bg-red-500  text-white"
                      >
                        {content("UploadYourResume")}
                      </Link>
                    </div>
                  )}
                  {/* jobs */}
                </motion.div>
              </div>

              <div className="  h-24"></div>
              </>
              :<SplashScreen/>}
            </section>
            <Footer />
            
            
          </div>
        </>
     
    );
    
}
