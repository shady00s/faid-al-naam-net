import { Ref, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import mission from "/public/images/mission.svg"
interface aboutUsInterface {
  navReff: Ref<HTMLDivElement>;
}
export default function MessionScreen({ navReff }: aboutUsInterface) {
  const animate = useAnimation();

  // const location = useParams();
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll to top on every route change
  // }, [location]);

  const refAttr = useRef<HTMLDivElement>(null);
  const mobViewRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(refAttr);
  const isInMobView = useInView(mobViewRef);

  const content = useTranslations("");

  const handleAnimation = () => {
    if (isInView || isInMobView) {
      animate.start("visible");
    } else {
      animate.start("hidden");
    }
  };

  useEffect(() => {
    handleAnimation();
  }, [isInView, isInMobView]);
  const isEnglish = useParams().locale == "en";

  return (
    <section
      ref={navReff}
      className={` w-full z-20 relative  h-auto min-h-screen  justify-center  items-center   bg-white  flex flex-col p-8  `}
    >
      <div className="h-[10vh]"></div>
      <div ref={refAttr} className="h-[70%]  absolute top-[12%]"></div>

      <div className="max-w-[1080px]">
        <div
          className={` flex flex-col p-8 items-center justify-center w-full`}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.3, delay: 0.33 }}
            className="text-5xl font-bold  pb-2"
          >
            {content("aboutUsTitle")}
          </motion.span>
          <motion.h4
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.3, delay: 0.35 }}
            className={`text-base pb-4 ${
              isEnglish ? "text-left" : "text-right"
            }`}
          >
            {content("ourMessionSubtitle")}
          </motion.h4>
        </div>
        <div className="p-8"></div>

        <div
          className={`flex flex-wrap h-full items-center ${
            isEnglish ? " md:justify-start justify-center" : "justify-end"
          }`}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -21 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.2, delay: 0.42 }}
            className="md:w-[48%] lg:h-[25rem] h-[10rem]  w-5/6 p-2 relative"

          >
            <Image
                          priority={true}

              src={mission}
              alt="our mission image"
              fill={true}
              className=" object-cover "
              object-fit={"contain"}
            />
          </motion.div>
          <div className="h-[80%] flex justify-center items-center text-center md:w-[48%] sm:w-[23rem]  ">
            <motion.p
              variants={{
                hidden: { opacity: 0, x: 51 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={animate}
              transition={{ duration: 0.2, delay: 0.45 }}
              className={` p-4 li  text-base/[2.8rem] text-black  ${
                isEnglish ? " md:text-start text-center" : "text-end"
              } `}
            >
              {content("aboutUsParagraph")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
