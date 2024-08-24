import { useTranslations } from "next-intl";
import {useEffect, useRef, useState } from "react";

import { motion, useAnimation, useInView } from "framer-motion";
import { useParams } from "next/navigation";
export default function ServicesComponent({services}:any) {
    const animate = useAnimation()
    const refAttr = useRef<HTMLDivElement>(null)
    const mobViewRef = useRef<HTMLImageElement>(null)
    const isInView = useInView(refAttr)
    const isInMobView = useInView(mobViewRef)
    const isEnglish = useParams().locale == "en";
    const content = useTranslations("");

    const [servicesData,setServices] = useState([])

    useEffect(()=>{
        setServices(()=>services)
    },[services])
 

    const handleAnimation = () => {
            if (isInView || isInMobView) {
                animate.start("visible")
            } else {
                animate.start("hidden")
            }
        

    }

    useEffect(() => {
        handleAnimation()
    }, [isInView,isInMobView])
    return <section className={`${1 > 0 ? 'w-full h-screen ' : 'w-0 h-0 overflow-hidden '} bg-white min-h-screen flex flex-col items-center `}>
        <div className="p-8" ></div>
        <div  ref={refAttr} className={` flex flex-col p-8 justify-center content-center items-center`}>
            <div className="p-8" ref={mobViewRef}></div>
            <motion.span
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
                initial="hidden"
                animate={animate}
                transition={{ duration: 0.3, delay: 0.23 }}
                className="text-5xl font-bold pl-4 pb-2">{content("servicesTitle")}</motion.span>
            <motion.h4

                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
                initial="hidden"
                animate={animate}
                transition={{ duration: 0.3, delay: 0.25 }}
                className={`text-base pb-4 ${isEnglish?"text-left":"text-right"}`}>{content("servicesSubTitle")}</motion.h4>

        </div>


        <motion.div

            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.3, delay: 0.23 }}
            className="p-4 flex w-full justify-center h-full sm:w-3/5 flex-wrap m-auto">

            {servicesData.map((e: any) => <div key={e._id} className="w-[180px] flex flex-col shadow-md items-center justify-evenly m-2 rounded-md overflow-hidden object-contain h-[160px]">
                <img alt={"services images "+e._id} className="p-2 hover:scale-105 transition-transform rounded-md  " width={140} height={140} src={e.imageUrl} />
                    <span>{isEnglish?e.nameEn:e.nameAr}</span>
            
            </div>)}


        </motion.div>


    </section>


}
