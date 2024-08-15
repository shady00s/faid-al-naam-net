import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useCallback, useRef, useState } from "react";
// import CardComponent from "../components/card_component";
import { useCurrentLanguage } from "../hooks/get_language";
import Footer from "../components/footer";
// import useDataFromApiHook from "../hooks/data_fron_api";
import NavigationComponent from "../components/navigation";
import useLoadingScreenTrigger from "../hooks/loading_trigger";
import SplashScreen from "../components/splash_screen";
import { useLocation } from "react-router";
//import { useMetaTags } from "react-metatags-hook";
import logo from "/public/logo1.svg";
import { Helmet } from "react-helmet";
import useDataFromApiHook from "../hooks/data_fron_api";
 import { CareersCard, CareersDetails } from "../components/careers_card";
import useWindowSize from "../hooks/window-size";
import { Link } from "react-router-dom";
export default function CareersScreen() {
  const { dataList } = useDataFromApiHook("careers");
  const { dataList: dataList2 } = useDataFromApiHook("availableJobs");
  const location = useLocation();
  const careersLogo = "/public/careers_bk.svg";
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on every route change
  }, [location]);

  // const { dataList } = useDataFromApiHook('careers')
  let language = useCurrentLanguage();
  const refAttr = useRef<HTMLDivElement>(null);
  const careersRef = useRef<HTMLDivElement>(null);
  const animate = useAnimation();
  const [active, setActive] = useState<string>("");
  const [content, setContent] = useState<ContentInterface>({
    isEnglish: false,
    data: null,
  });
  const loading = useLoadingScreenTrigger();
  const isInView = useInView(refAttr);
  const isCareerInView = useInView(careersRef);

  const { width } = useWindowSize();
  const [closed, setIsClosed] = useState<boolean>(false);
  const [isClicked, setIsisClicked] = useState<boolean>(false);
  const handleAnimation = useCallback(() => {
    if (content.data) {
      animate.start("visible");
    } else {
      animate.start("hidden");
    }
  }, [content.data, loading, isInView]);
  useEffect(() => {
    if (language) {
      setContent({
        isEnglish: language.type === "en",
        data: language.value,
      });
    }
  }, [language]);

  useEffect(() => {
    if (careersRef.current) {
      animate.start("showCareers");
    } else {
      animate.start("hideCareers");
    }
  }, [isCareerInView, careersRef.current]);

  useEffect(() => {
    if (width <= 930 && !isClicked) {
      setIsClosed(true);

      animate.start("hideDetails");
    } else {
      setIsClosed(false);

      animate.start("showDetails");
    }
  }, [width, content]);
  useEffect(() => {
    handleAnimation();
  }, [isInView, content.data, loading]);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (dataList) {
      setData(dataList[0]);
      setActive(dataList[0]?._id ?? "");
    }
  }, [dataList]);
  const careers = loading ?content.isEnglish? 'Loading':'جاري التحميل' : content?.data?.careers || '';
  const companyName = content?.data?.companyName || '';
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={logo} />
        <meta charSet="utf-8" />
        <title>
          {`${careers} | ${companyName}`}
        </title>
        <link rel="canonical" href="https://faid-el-neam.vercel.app/careers" />
        <meta
          name="description"
          content={
            content?.isEnglish
              ? "Join our passionate team in Faid Al-Naam"
              : "انضم الي فريق فيض النعم"
          }
        />
        <meta
          property="og:url"
          content="https://faid-el-neam.vercel.app/careers"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Faid Al Naam" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="faid-el-neam.vercel.app" />
        <meta
          property="twitter:url"
          content="https://faid-el-neam.vercel.app/careers"
        />
        <meta name="twitter:title" content={content?.data?.careers ?? ""} />
        <meta
          name="twitter:description"
          content={
            content?.isEnglish
              ? "Join our passionate team in Faid Al-Naam"
              : "انضم الي فريق فيض النعم"
          }
        />
        <meta name="twitter:image" content={logo} />
      </Helmet>

      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <div
            ref={refAttr}
            className="shrink-0  h-auto w-full overflow-hidden"
          >
            <NavigationComponent />

            <section
              id="careers"
              className={`relative w-screen   overflow-x-auto  flex flex-col bg-white ${
                content.isEnglish ? "items-start" : "items-end"
              }`}
            >
              <div
                className={` flex flex-col p-8 ${
                  content.isEnglish ? "items-start" : "items-end"
                } w-full`}
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${careersLogo})`,
                }}
              >
                <div className="p-8"></div>

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
                    transition={{ duration: 0.3, delay: 0.13 }}
                    className="text-5xl z-10 font-bold  pb-2"
                  >
                    {content.data?.careers ?? ""}
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
                      content.isEnglish ? "text-left" : "text-right"
                    }`}
                  >
                    {content.data?.aboutUsSubTitle ?? ""}
                  </motion.h2>
                </header>
                <div className="flex flex-col m-auto max-w-[1080px] justify-center items-center">
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
                    {content.data?.careersParagraph ?? ""}
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
                      if (dataList.length > 0) {
                        careersRef.current!.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="p-2 bg-red-500 mt-4 text-white"
                  >
                    {dataList.length > 0
                      ? content.data?.CheckForAvailableJobs ?? ""
                      : content.data?.UploadYourResume ?? ""}
                  </motion.button>
                </div>
              </div>

              <div
                className={`w-screen flex flex-col ${
                  content.isEnglish ? "" : "items-start"
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
                  {dataList.length > 0 ? (
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
                          {content.data?.careersSubP ?? ""}
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
                        {content.data?.availableJobs ?? ""}
                      </motion.h3>
                      <div className="h-20"></div>

                      <div
                        className={`flex w-screen  h-full overflow-hidden relative transition-all`}
                      >
                        {/* jobs card */}
                        <div className=" transition-all  h-full w-screen  sm:items-center  items-start justify-start p-2 flex flex-wrap ">
                          {dataList?.map((e) => (
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
                              title={e.nameEn ?? e.nameAr}
                              locationEn={e.locationEn ?? e.locationAr}
                              experianceEn={e.experianceEn ?? e.experianceAr}
                              jobSiteEn={e.jobSiteEn ?? e.jobSiteAr}
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
                          {/* h-full w-3/6  lg:w-screen  bg-white overflow-y-auto overflow-x-hidden    lg:relative flex absolute  */}
                          {data && !closed ? (
                            <CareersDetails
                              onCloseDetails={() => {
                                setIsClosed(true);
                                animate.start("hideDetails");
                              }}
                              id={data._id}
                              title={data.nameEn ?? data.nameAr}
                              locationEn={data.locationEn ?? data.locationAr}
                              experianceEn={
                                data.experianceEn ?? data.experianceAr
                              }
                              jobSiteEn={data.jobSiteEn ?? data.jobSiteAr}
                              summeryEn={data.summaryEn ?? data.summaryAr}
                            />
                          ) : (
                            <></>
                          )}
                        </motion.div>
                      </div>

                      <div className="max-w-[1080px] mt-36 mb-10 flex flex-col items-center justify-center m-auto ">
                        <p className="w-4/5 text-center">
                          {content.data?.didntFindJobP}
                        </p>
                        <Link
                          state={{ availableJobs: dataList2 ?? [] }}
                          to="/upload-resume"
                          className="p-2 mt-6 bg-red-500  text-white"
                        >
                          {content.data?.UploadYourResume ?? ""}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex  w-screen max-w-[1080px] p-3 h-screen flex-col items-center justify-center">
                      <div ref={careersRef}></div>

                      <p className="w-4/5 text-center">{content.data?.NoCareersP}</p>
                      <Link
                        state={{ availableJobs: dataList2 ?? [] }}
                        to="/upload-resume"
                        className="p-2 mt-6 bg-red-500  text-white"
                      >
                        {content.data?.UploadYourResume ?? ""}
                      </Link>
                    </div>
                  )}
                  {/* jobs */}
                </motion.div>
              </div>

              <div className="  h-24"></div>
            </section>

            <Footer />
          </div>
        </>
      )}
    </>
  );
}
