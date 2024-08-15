import { useEffect, useRef, useState } from "react";
import {
  AnimationControls,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function TestimonialsComponent() {
  const animate = useAnimation();
  const refAttr = useRef<HTMLDivElement>(null);
  const mobViewRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(refAttr);
  const isInMobView = useInView(mobViewRef);

  const [data, setData] = useState<any>({
    index: 0,
    name: "",
    testimonial: "",
    position: "",
  });
  const [showData, setShowData] = useState<any>({
    index: 0,
    name: "",
    testimonial: "",
    position: "",
  });
  const content = useTranslations("");
  const isEnglish = useParams().locale == "en";

  // useEffect(() => {
  //     if (dataList.length > 0) {
  //         setShowData({ index: 0, name: isEnglish ? dataList[0].nameEn : dataList[0].nameAr, testimonial: isEnglish ? dataList[0].testimonialEn : dataList[0].testimonialAr, position: isEnglish ? dataList[0].positionEn : dataList[0].positionAr })
  //         setData({ index: 0, name: isEnglish ? dataList[0].nameEn : dataList[0].nameAr, testimonial: isEnglish ? dataList[0].testimonialEn : dataList[0].testimonialAr, position: isEnglish ? dataList[0].positionEn : dataList[0].positionAr })
  //     }
  // }, [dataList,isInView])

  useEffect(() => {
    if (refAttr.current) {
      animate.start("hideText").then(() => {
        setShowData(data);
        setTimeout(() => {
          animate.start("showText");
        }, 100);
      });
    }
  }, [data, refAttr.current]);

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
  return (
    <section
      ref={refAttr}
      className={`${
        3 > 0 ? "w-full min-h-screen " : "w-0 h-0 overflow-hidden "
      } justify-between flex flex-col items-center bg-white`}
    >
      <div className="p-8"></div>
      <div
        className={` flex flex-col p-8 justify-center w-full h-2/4 content-center items-center`}
      >
        <div className="p-8" ref={mobViewRef}></div>
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={animate}
          transition={{ duration: 0.3, delay: 0.23 }}
          className={`text-5xl font-bold pl-4 pb-2 text-center`}
        >
          {content("testimonials")}
        </motion.span>
        <motion.h4
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={animate}
          transition={{ duration: 0.3, delay: 0.25 }}
          className={`text-base pb-4 ${isEnglish ? "text-left" : "text-right"}`}
        >
          {content("testimonialsSubTitle")}
        </motion.h4>
      </div>

      <div className="h-full w-screen flex  items-center justify-center bg-slate-900">
        <div className="w-full max-w-[1908px] p-4  flex-col h-full  mt-8  flex justify-between items-center">
          <div className="min-h-[17rem] w-full flex-col flex justify-center  items-center ">
            <div className="flex-col flex justify-center items-start ">
              <motion.div
                variants={{
                  hideText: { opacity: 0 },
                  showText: { opacity: 1 },
                }}
                initial="hideText"
                animate={animate}
                transition={{ duration: 0.3, delay: 0.33 }}
                className="relative left-3"
              >
                <Image
                  src="/images/qoute.svg"
                  layout="fill"
                  alt="testimonials icon"
                  objectFit="cover"
                />
              </motion.div>
              <motion.span
                variants={{
                  hideText: { opacity: 0 },
                  showText: { opacity: 1 },
                }}
                initial="hideText"
                animate={animate}
                transition={{ duration: 0.3, delay: 0.33 }}
                className={`md:text-3xl   text-2xl w-full break-words text-white p-4 ${
                  isEnglish ? "text-left" : "text-right"
                }`}
              >
                {showData?.testimonial ?? ""}
              </motion.span>
            </div>

            <motion.span
              variants={{
                hideText: { opacity: 0 },
                showText: { opacity: 1 },
              }}
              initial="hidden"
              animate={animate}
              transition={{ duration: 0.3 }}
              className="text-slate-400 text-xl mx-auto"
            >
              {showData?.name ?? ""}
            </motion.span>
            <motion.span
              variants={{
                hideText: { opacity: 0 },
                showText: { opacity: 1 },
              }}
              initial="hidden"
              animate={animate}
              transition={{ duration: 0.3, delay: 0.33 }}
              className="text-slate-600 text mx-auto"
            >
              {showData?.position ?? ""}
            </motion.span>
          </div>
          <div
            className={`w-[95vw] max-w-[1908px]  px-5 h-22 overflow-hidden overflow-x-auto p-1 mt-16 flex  ${
              isEnglish ? "justify-start" : "justify-end"
            }`}
          >
            {/* {dataList.map((e: any, index) => <TestimonialButton key={e._id} animate={animate} onCLick={function (): void {
                        setData({ index: index, name: isEnglish ? e.nameEn : e.nameAr, testimonial: isEnglish ? e.testimonialEn : e.testimonialAr, position: isEnglish ? e.positionEn : e.positionAr });
                    }} name={isEnglish ? e.nameEn : e.nameAr} title={isEnglish ? e.positionEn : e.positionAr} testimonial={isEnglish ? e.testimonialEn : e.testimonialAr} selected={data.index == index} />)} */}
          </div>
        </div>
      </div>
    </section>
  );
}
interface data {
  animate: AnimationControls;
  onCLick: () => void;
  name: string;
  title: string;
  testimonial: string;
  selected: boolean;
}
function TestimonialButton({ name, title, animate, onCLick, selected }: data) {
  return (
    <div
      onClick={onCLick}
      className={` h-12 p-3 m-1 whitespace-nowrap  ${
        selected ? "bg-slate-600" : "bg-slate-800 "
      }  min-w-36 flex flex-col items-center justify-center text-center rounded-sm hover:bg-slate-500 transition-colors cursor-pointer `}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={animate}
        transition={{ duration: 0.3, delay: 0.63 }}
        className="text-slate-300 text-sm mx-auto"
      >
        {name}
      </motion.span>

      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={animate}
        transition={{ duration: 0.3, delay: 0.63 }}
        className="text-slate-400 text-xs mx-auto"
      >
        {title}
      </motion.span>
    </div>
  );
}
