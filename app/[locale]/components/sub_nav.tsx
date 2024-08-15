import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import  Image  from 'next/image';
export default function SubNavComponent() {
  const animate = useAnimation()

  const refAttr = useRef<HTMLDivElement>(null)
  const mobViewRef = useRef<HTMLImageElement>(null)
  const isInView = useInView(refAttr)
  const isInMobView = useInView(mobViewRef)
   const content = useTranslations("")
   const isEnglish = useParams().locale == "en";

  const handleAnimation = () => {
       if (isInView || isInMobView) {
        animate.start("visible")
      } else {
        animate.start("hidden")
      }
 
  }

  useEffect(() => {
    handleAnimation()
  }, [isInView, isInMobView])
  return <section ref={refAttr} className={` w-full flex flex-col ${isEnglish ? 'items-start' : 'items-end'}`}>
    <div className="flex justify-center relative items-center flex-col w-full h-[21rem]">     
     <div className=" absolute top-0 left-0 w-screen h-full bg-no-repeat bg-center " >
      <Image src="/images/contact-us-image.svg" alt="contact us image" layout="fill"
              objectFit="cover" /> 
     </div>
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={animate}
        transition={{ duration: 0.3, delay: 0.23 }}

        className="text-4xl font-bold text-white mb-3 z-20">{isEnglish ? 'Ready to get started?' : "جاهز للبدء؟"}</motion.span>
      <Link style={{ backgroundColor: 'rgba(15,15,15,0.56)' }} className="py-3 px-2 z-20 m-1 cursor-pointer rounded-md  hover:text-white  text-sm font-bold text-gray-200 border-2  transition-all" href={'/projects'}> <h4>{content("subNavProjects")}</h4></Link>

      <span className="text-white text-sm   font-semibold z-20">OR</span>

      <Link style={{ backgroundColor: 'rgba(0,19,85,0.56) ' }} className="py-3 px-2 z-20 m-1 cursor-pointer rounded-md  hover:text-white  text-sm font-bold text-gray-200 border-2  transition-all" href={'/contact-us'}><h4>{content("subNavContactUs")}</h4></Link>

    </div>
  </section>
}