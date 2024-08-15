import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useCallback, useRef, useState } from "react";
import CardComponent from "../components/card_component";
import { useCurrentLanguage } from "../hooks/get_language";
import Footer from "../components/footer";
import useDataFromApiHook from "../hooks/data_fron_api";
import NavigationComponent from "../components/navigation";
import useLoadingScreenTrigger from "../hooks/loading_trigger";
import SplashScreen from "../components/splash_screen";
import { useLocation } from "react-router";
//import { useMetaTags } from "react-metatags-hook";
import logo from "/public/logo1.svg"
import { Helmet } from "react-helmet";

export default function WhoWeAreScreen() {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on every route change
    }, [location]);


    const { dataList } = useDataFromApiHook('employees')
    let language = useCurrentLanguage()
    const refAttr = useRef<HTMLDivElement>(null)
    const animate = useAnimation()

    const [content, setContent] = useState<ContentInterface>({
        isEnglish: false,
        data: null,
    });
    const loading = useLoadingScreenTrigger()
    const isInView = useInView(refAttr)

    const handleAnimation = useCallback(() => {
        if ( content.data) {
            animate.start("visible")
        } else {
            animate.start("hidden")
        }
    }, [content.data,loading,isInView])
    useEffect(() => {
        if (language) {
            setContent({
                isEnglish: language.type === "en",
                data: language.value,
            });
        }
    }, [language]);



    useEffect(() => {
        handleAnimation()
    }, [isInView, content.data,loading])



    // useMetaTags(
    //     {
    //       title: content?.data?.WhoWeAre ??"",
    //       description: content?.isEnglish?"Meet the passionate team behind Faid Al-Naam": 'تعرف على الفريق وراء فيض النعم',
    //       charset: "utf8",
    //       lang: content.isEnglish?"en":"ar",
    //       openGraph: {
    //         title: content.data?.WhoWeAre,
    //         image: logo,
    //         site_name: "Faid Al Naam",
    //       },
    //       twitter: {
    //         card:  content?.isEnglish?"Meet the passionate team behind Faid Al-Naam": 'تعرف على الفريق وراء فيض النعم',
    //         creator: "@you",
    //         title:content?.data?.WhoWeAre??"",
    //       },
          
    //     },
        
    //     [content.data]
    //   );
    const contactUs = loading ?content.isEnglish? 'Loading':'جاري التحميل' : content?.data?.WhoWeAre || '';
    const companyName = content?.data?.companyName || '';

    return <>         
    <Helmet>
        <link rel="icon" type="image/svg+xml" href={logo} />
        <meta charSet="utf-8" />
        <title>{`${contactUs} | ${companyName}`}</title>
        <link rel="canonical" href="https://faid-el-neam.vercel.app/our-team" />
        <meta
          name="description"
          content={
            content?.isEnglish?"Meet the passionate team behind Faid Al-Naam": 'تعرف على الفريق وراء فيض النعم'
          }
        />
        <meta
          property="og:url"
          content="https://faid-el-neam.vercel.app/our-team"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Faid Al Naam" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="faid-el-neam.vercel.app" />
        <meta
          property="twitter:url"
          content="https://faid-el-neam.vercel.app/our-team"
        />
        <meta name="twitter:title" content={content?.data?.WhoWeAre ?? ""} />
        <meta
          name="twitter:description"
          content={
            content?.isEnglish?"Meet the passionate team behind Faid Al-Naam": 'تعرف على الفريق وراء فيض النعم'
          }
        />
        <meta name="twitter:image" content={logo} />
      </Helmet>
    
    
    {loading ? <SplashScreen /> : <>
    <div ref={refAttr} className="shrink-0  h-auto w-full overflow-hidden">
        <NavigationComponent />

        <section id="who_we_are" className={` w-screen min-h-[100vh] overflow-x-auto overflow-y-hidden flex flex-col bg-white ${content.isEnglish ? "items-start" : "items-end"}`}>

              
                    <div className={` flex flex-col p-8 ${content.isEnglish ? "items-start" : "items-end"} w-full`}>
                        <div className="p-8"></div>

                        <header className={` flex flex-col p-8 items-center justify-center w-full`}>
                            <motion.h1
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 },
                                }}
                                initial="hidden"
                                animate={animate}
                                transition={{ duration: 0.3, delay: 0.13 }}
                                className="text-5xl font-bold  pb-2">{content.data?.WhoWeAre??''}</motion.h1>
                            <motion.h2
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 },
                                }}
                                initial="hidden"
                                animate={animate}
                                transition={{ duration: 0.3, delay: 0.15 }}
                                className={`text-base pb-4 ${content.isEnglish?"text-left":"text-right"}`}>{content.data?.aboutUsSubTitle??''}</motion.h2>
                        </header>

                    </div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -112 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        animate={animate}
                        transition={{ duration: 0.3, delay: 0.13 }}

                        className="p-1 md:p-3 max-w-[1080px]  justify-center  items-start flex md:w-4/5 flex-wrap m-auto w-full">
                        {dataList.map((e) => <CardComponent key={e._id} name={content.isEnglish ? e.nameEn : e.nameAr} imageUrl={e.imageUrl} title={content.isEnglish ? e.titleEn : e.titleAr} facebookUrl={e.facebookUrl} linkedInUrl={e.linkedInUrl} xUrl={e.xUrl} summary={content.isEnglish ? e.summaryEn : e.summaryAr} content={content} />)}

                    </motion.div>



                <div className="  h-24"></div>

        </section>
            

        <Footer />
    </div>
    </>}


    </> 
}