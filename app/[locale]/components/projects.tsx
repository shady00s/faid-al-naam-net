import { useCallback, useContext, useEffect, useRef, useState } from "react";
import projectBG from "/public/projectBG.svg";
import { motion, useAnimation, useInView } from "framer-motion";
import { ProjectCardComponent } from "../components/project_card_component";
import {
  ProjectBackgroundContext,
  ProjectDetailsContext,
} from "../context/project";
import ProjectDetailsPopup from "../components/project_details_popup";
import { useCurrentLanguage } from "../hooks/get_language";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import useDataFromApiHook from "../hooks/data_fron_api";
import img from "/public/contact-us-image.svg";
import NavigationComponent from "../components/navigation";
import useLoadingScreenTrigger from "../hooks/loading_trigger";
import Localizations from "../context/localization";
import SplashScreen from "./../components/splash_screen";
import logo from "/public/logo1.svg";
// import { useMetaTags } from "react-metatags-hook";
import { Helmet } from "react-helmet";
export default function ProjectsScreen() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on every route change
  }, [location]);

  let language = useCurrentLanguage();
  const { dataList } = useDataFromApiHook("projects");
  const animate = useAnimation();
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectsRef2 = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string>(projectBG);
  const [projectData, setProjectData] = useState<ProjectCardInterface | null>(
    null
  );
  const [oldImage, setOldImage] = useState<string>(image);
  const refAttr = useRef<HTMLDivElement>(null);
  const isInView = useInView(refAttr);
  const [crossfade, setCrossfade] = useState(false);
  const { language1 } = useContext(Localizations);
  const loading = useLoadingScreenTrigger();

  const [content, setContent] = useState<ContentInterface>({
    isEnglish: false,
    data: null,
  });
  useEffect(() => {
    if (language) {
      setContent({
        isEnglish: language.type === "en",
        data: language.value,
      });
    }
  }, [dataList, language1, loading]);

  const handleAnimation = useCallback(() => {
    if (content.data) {
      animate.start("visible");
    } else {
      animate.start("hidden");
    }
  }, [content.data, loading]);

  const memoizedHandleAnimation = useCallback(handleAnimation, [
    isInView,
    content.data,
  ]);

  useEffect(() => {
    memoizedHandleAnimation();
    productImageAnimation();
  }, [isInView, content.data, language1, image]);

  const memoizedProductImageAnimation = useCallback(() => {
    if (oldImage !== image && content.data) {
      setCrossfade(true);
      setTimeout(() => {
        setOldImage(image);
        setCrossfade(false);
      }, 150);
    }
  }, [image, oldImage, language1, content.data, dataList]);

  useEffect(() => {
    memoizedProductImageAnimation();
  }, [image, oldImage, content.data, dataList]);

  const productImageAnimation = useCallback(() => {
    if (oldImage !== image && content.data) {
      setCrossfade(true);
      setTimeout(() => {
        setOldImage(() => image);
        setCrossfade(false);
      }, 150);
    }
  }, [image]);

  //   useMetaTags(
  //     {
  //       title: content?.data?.OurProjects ?? "",
  //       description: content?.isEnglish
  //         ? "Discover Fiyad Al-Ni'am's projects in Egypt in land reclamation and animal production."
  //         : " تعرف على مشاريع فيض النعم فى مصر فى الاستصلاح الزراعى والانتاج الحيوانى",
  //       charset: "utf8",
  //       lang: content.isEnglish ? "en" : "ar",
  //       openGraph: {
  //         title: content.data?.partners,
  //         image: logo,
  //         site_name: "Faid Al Naam",
  //       },
  //       twitter: {
  //         card: content?.isEnglish
  //           ? "Discover Fiyad Al-Ni'am's projects in Egypt in land reclamation and animal production."
  //           : " تعرف على مشاريع فيض النعم فى مصر فى الاستصلاح الزراعى والانتاج الحيوانى",
  //         creator: "@you",
  //         title: content?.data?.OurProjects ?? "",
  //       },
  //     },

  //     [content.data]
  //   );
  const contactUs = loading ?content.isEnglish? 'Loading':'جاري التحميل' : content?.data?.OurProjects || '';
  const companyName = content?.data?.companyName || '';
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={logo} />
        <meta charSet="utf-8" />
        <title>{`${contactUs} | ${companyName}`}</title>

        <link rel="canonical" href="https://faid-el-neam.vercel.app/projects" />
        <meta
          name="description"
          content={
            content?.isEnglish
              ? "Discover Fiyad Al-Ni'am's projects in Egypt in land reclamation and animal production."
              : " تعرف على مشاريع فيض النعم فى مصر فى الاستصلاح الزراعى والانتاج الحيوانى"
          }
        />
        <meta
          property="og:url"
          content="https://faid-el-neam.vercel.app/projects"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Faid Al Naam" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="faid-el-neam.vercel.app" />
        <meta
          property="twitter:url"
          content="https://faid-el-neam.vercel.app/projects"
        />
        <meta name="twitter:title" content={content?.data?.OurProjects ?? ""} />
        <meta
          name="twitter:description"
          content={
            content?.isEnglish
              ? "Discover Fiyad Al-Ni'am's projects in Egypt in land reclamation and animal production."
              : " تعرف على مشاريع فيض النعم فى مصر فى الاستصلاح الزراعى والانتاج الحيوانى"
          }
        />
        <meta name="twitter:image" content={logo} />
      </Helmet>
      
      <div
        id="our-projects"
        className={`shrink-0  w-full  min-h-screen  overflow-hidden relative flex flex-col bg-black ${
          content.isEnglish ? "items-start" : "items-end"
        } `}
      >
        {loading ? (
          <SplashScreen />
        ) : (
          <>
            <section ref={refAttr} className="w-full  min-h-screen">
              <NavigationComponent />
              <div className="h-12 "></div>

              <div
                className={`w-full   overflow-hidden relative flex flex-col justify-center ${
                  content.isEnglish ? "items-start" : "items-end"
                } sm:p-8 sm:py-12 p-4`}
              >
                <ProjectBackgroundContext.Provider value={{ image, setImage }}>
                  <motion.img
                    alt="project background"
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    animate={crossfade ? "hidden" : "visible"}
                    transition={{ duration: 0.9 }}
                    src={oldImage}
                    className="filter  h-full  blur-sm blu absolute w-full  top-0 left-0 object-cover"
                  />

                  {content.data ? (
                    <>
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
                          {content.data.OurProjects}
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
                            content.isEnglish ? "text-left" : "text-right"
                          }`}
                        >
                          {content.data.projectsTitle}
                        </motion.h4>
                      </header>

                      <ProjectDetailsContext.Provider
                        value={{ projectData, setProjectData }}
                      >
                        <ProjectDetailsPopup />

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
                          className="w-full m-auto z-20 max-w-[1080px] h-screen  "
                        >
                          <div
                            ref={projectsRef2}
                            className={`flex items-center  content-center flex-wrap  h-full w-full  `}
                          >
                            {dataList.map((e) => (
                              <ProjectCardComponent
                                key={e._id}
                                imagePath={e.media}
                                title={e.projectNameEn ?? e.projectNameAr}
                                subTitle={e.discreptionEn ?? e.discreptionAr}
                                startDate={e.startDate}
                                endDate={e.endDate}
                                todos={e.projectStepsEn ?? e.projectStepsAr}
                                content={content}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </ProjectDetailsContext.Provider>
                    </>
                  ) : (
                    <></>
                  )}
                </ProjectBackgroundContext.Provider>
              </div>

              <div
                className={` w-full flex flex-col ${
                  content.isEnglish ? "items-start" : "items-end"
                }`}
              >
              </div>
                <div className="flex justify-center relative items-center flex-col w-full h-[21rem]">
                  <img
                    alt="sub nav image"
                    src={img}
                    style={{ objectFit: "cover" }}
                    className=" absolute top-0 left-0 w-screen h-full bg-no-repeat bg-center "
                  />
                  <h1 className="text-4xl font-bold text-white mb-3 z-20">
                    {content.isEnglish
                      ? "Ready to get started?"
                      : "جاهز للبدء؟"}
                  </h1>
                  <Link
                    style={{ backgroundColor: "rgba(0,19,85,0.56) " }}
                    className="py-3 px-2 z-20 m-1 cursor-pointer rounded-md  hover:text-white  text-sm font-bold text-gray-200 border-2  transition-all"
                    to={"/contact-us"}
                  >
                    <h4>{content?.data?.subNavContactUs ?? ""}</h4>
                  </Link>
                </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
