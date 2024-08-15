import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useCallback, useRef, useState } from "react";
import NavigationComponent from "../components/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
 
export default function PartnersScreen() {
    const refAttr1 = useRef<HTMLDivElement>(null)
    const animate = useAnimation()
    const mobViewRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(refAttr1)
    const isInMobView = useInView(mobViewRef)
    const content = useTranslations("");
    const isEnglish = useParams().locale == "en";



    const handleAnimation = useCallback(() => {
        if (isInView) {
            animate.start("visible")
        } else {
            animate.start("hidden")
        }
    }, [isInView])


    useEffect(() => {
        handleAnimation()
    }, [isInView, isInMobView])


    return <section id="partners" ref={refAttr1} className={` w-full  mt-20 relative ${1 > 0 ? ' min-h-[100vh]  overflow-x-auto overflow-y-hidden' : 'h-0 overflow-hidden'}  flex flex-col bg-white ${isEnglish ? "items-start" : "items-end"}`}>

            <div className='h-[70%] absolute top-[8%]'>
            </div>
            <div className='h-[4vh] sm:h-[8vh]'>
            </div>

                <div className={` flex flex-col p-8 items-center justify-center w-full`}>
                    <div className="p-8" ref={mobViewRef}></div>
                    <motion.span
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        initial="hidden"
                        animate={animate}
                        transition={{ duration: 0.3, delay: 0.23 }}
                        className="text-5xl font-bold  pb-2">{content("partners")}</motion.span>
                    <motion.h4

                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        initial="hidden"
                        animate={animate}
                        transition={{ duration: 0.3, delay: 0.25 }}
                        className="text-base pb-4">{content("partnersSubtitle")}</motion.h4>

                </div>


                <motion.div

                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    initial="hidden"
                    animate={animate}
                    transition={{ duration: 0.3, delay: 0.43 }}
                    className="p-4 max-w-[1080px] flex w-full justify-center h-full lg:w-4/5 flex-wrap m-auto">

                    {/* {dataList.map((e: any) => <div key={e._id} className="md:w-[250px] w-full m-3 rounded-md flex justify-center items-center overflow-hidden object-cover h-[160px]">
                        <img alt={"partiners images "+e._id} className="p-2  hover:scale-105 w-full object-contain transition-transform rounded-md  " src={e.imageUrl} />
                    </div>)} */}


                </motion.div>


        </section> 
}