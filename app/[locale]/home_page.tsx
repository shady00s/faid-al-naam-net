"use client";
import Image from "next/image";
import "./App.css";
import { useParams } from "next/navigation";
import SplashScreen from "./components/splash_screen";
import bg from '/public/images/background.svg'

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import IndicationComponent from "./components/indicators";
import Footer from "./components/footer";
import PartnersScreen from "./components/partners";
import AboutUsScreen from "./components/mession";
import instance from '../utils/axios'
import ServicesComponent from "./components/services";
import SubNavComponent from "./components/sub_nav";
import TestimonialsComponent from "./components/testimonials";
 export default function HomePage() {
  const content = useTranslations("");
  const params = useParams();
  const currentLang = params.locale;
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bottomStatRef = useRef<HTMLDivElement>(null);
  const refAttr = useRef<HTMLDivElement>(null);
  const mobRefAttr = useRef<HTMLDivElement>(null);
  const animate = useAnimation();
  const isInView = useInView(refAttr);
  const [isLoading,setLoading] = useState(false)
  const [statistics,setStatistics] = useState([])
  const [partners,setPartners] = useState([])
  const [services,setServices] = useState([])
  const [testimonials,setTestimonials] = useState([])
  const clientData = instance.get("/client",{ params: { language: currentLang} })
   const handleAnimation = useCallback(() => {
    if (isInView && statistics.length > 0) {
      animate.start("visible");
    } else {
      animate.start("hidden");
    }
  }, [isInView,statistics]);

  const aboutRef = useRef<HTMLDivElement>(null);
  const isEnglish = useParams().locale == "en";

  const handleAboutUsRef = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleAnimation();
  }, [isInView,statistics]);

  useEffect(() => {
    if(statistics.length == 0 || testimonials.length == 0 || partners.length ==0 || services.length == 0){
      setLoading(true)
      clientData.then((res) => {
        if(res.status == 200)
          setStatistics(()=>res.data.response.statstics)
          setPartners(()=>res.data.response.partners)
          setTestimonials(()=>res.data.response.testimonials)
          setServices(()=>res.data.response.services)
        setLoading(false)
       }).catch((e)=>{
        setLoading(false)
      })
      
    }
  },[statistics])
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x: number = event.clientX / 90;
      const y: number = event.clientY / 90;
      imageRef.current!.style.transform = `translate(${x}px, ${y}px) `;
      imageRef.current!.style.transition = "translate 0.06s ease-in-out";
    };
    if (imageRef.current && imageContainerRef.current) {
      imageContainerRef.current.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      if (imageRef.current) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [imageRef.current, imageContainerRef.current]);

   return (

    <div className="relative h-full"> 
       <div
         className="absolute top-[13%] w-12 bg-green z-10"
         ref={refAttr}
       ></div>
      {isLoading? <SplashScreen/> : 
      
     <div className={` w-full h overflow-x-hidden bg-white  relative  flex flex-col p-0`}>
      <section
        ref={imageContainerRef}
        className={` w-full h-screen  overflow-x-hidden overflow-y-hidden bg-black  relative  flex flex-col p-0`}
      >

      
        <div className="w-full bg-black  min-h-screen  relative top-16 ">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.3, delay: 0.23 }}
          >
            <Image
              src={bg}
              ref={imageRef}
              priority={true}
              alt="Home image"
              width={1920}
              height={1080}
              className={`home-background   scale-x-[1]`}
            />
          </motion.div>
        </div>
        <div
          className={`w-full max-w-[2208px] absolute  h-3/6 z-10 flex  justify-end`}
        >
          <header className=" md:mt-auto  -mb-[3.5rem]  w-[22rem]  lg:w-[42rem] md:w-[41rem] my-auto p-12">
            <motion.h2
              ref={titleRef}
              variants={{
                hidden: { opacity: 0, x: 32 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={animate}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`text-white relative ${isEnglish ? "text-left" : "text-right"}   text-3xl/[3.2rem] font-bold`}
            >
              {content("intro")}
            </motion.h2>

            <motion.div
              ref={btnsRef}
              variants={{
                hidden: { opacity: 0, x: 32 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={animate}
              transition={{ duration: 0.3, delay: 0.15 }}
              className={`flex md:mt-auto mt-16  w-[18rem] md:w-auto  z-10 md:top-12 relative   items-end  justify-center`}
            >
              <Link
                href={`/${currentLang}/contact-us`}
                className=" bg-red-700 hover:bg-white  hover:text-black  transition-colors ease-in-out  lg:px-20 sm:px-8 py-[0.4rem] sm:py-[0.45rem] px-5  rounded-md text-sm font-semibold text-white"
              >
                {content("callUs")}
              </Link>
              <button
                onClick={() => {
                  handleAboutUsRef();
                }}
                className=" text-black bg-white hover:bg-gray-500  hover:text-white  transition-colors ease-in-out  rounded-md px-8 py-[0.4rem] sm:py-[0.45rem] mx-2 text-sm font-semibold"
              >
                {content("OurMession")}
              </button>
            </motion.div>
          </header>
        </div>
        <motion.div
          ref={bottomStatRef}
          variants={{
            hidden: { y: 410 },
            visible: { y: 70 },
          }}
          initial="hidden"
          animate={animate}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="w-full md:min-h-[7rem]  flex-wrap absolute bottom-[4.4rem] items-center flex justify-evenly bg-[rgba(6,6,6,0.51)]"
        >
          <div ref={mobRefAttr}></div>

            {statistics.map((data:any)=><IndicationComponent
            key={data._id}
            title={!isEnglish? data.titleAr:data.titleEn}
            number={data.value}
            isLoaded={isInView}
          /> )}
          
         
        </motion.div>
      </section>
      <section>
        <AboutUsScreen navReff={aboutRef} />
        <ServicesComponent services={services} />
        <PartnersScreen partners={partners} />
        <TestimonialsComponent testimonials={testimonials} />
        <SubNavComponent />
        <Footer />
      </section>
    </div>
      
      }
      </div>
  );
}
