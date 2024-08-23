"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useCallback, useRef, useState } from "react";
  import Footer from "../components/footer";
import instance from "../../utils/axios";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import map from '/public/images/map.svg';
import paperPlane from '/public/images/paper-plane.svg';
import ok from '/public/images/ok.svg';
import envelope from '/public/images/envelope.svg';
import phone from '/public/images/phone.svg';
import location from '/public/images/location.svg';
import Link from "next/link";
export default function ContactUsScreen() {
  const animate = useAnimation();
  const refAttr = useRef<HTMLDivElement>(null);
  const mobRefAttr = useRef<HTMLDivElement>(null);
  const isInView = useInView(refAttr);
  const [response, setResponse] = useState<string>("normal");
  const [data, setData] = useState({ data1: "", data2: "", data3: "" });
  const content = useTranslations("");

  const handleAnimation = useCallback(() => {
    if (isInView) {
      animate.start("visible");
    } else {
      animate.start("hidden");
    }
  }, [isInView]);

  useEffect(() => {
    handleAnimation();
  }, [isInView]);

  const isEnglish = useParams().locale == "en";
  function handleEmailForm(e: any) {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("date", JSON.stringify(Date.now()));
    setResponse(() => "loading");

    instance
      .post("/emails/create-email", form)
      .then(() => {
        setResponse(() => "done");
        setData({ data1: "", data2: "", data3: "" });
        setTimeout(() => {
          setResponse(() => "normal");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // useMetaTags(
  //     {
  //       title: content?.data?.callUs ??"",
  //       description: content?.isEnglish?"Buying or need more information? Visit us or send your inquiry for your assistance.": 'هل ترغب بالشراء أم تحتاج إلى مزيد من المعلومات؟ تفضل بزيارة متجرنا أو أرسل استفسارك لمساعدتك',
  //       charset: "utf8",
  //       lang: content.isEnglish?"en":"ar",
  //       openGraph: {
  //         title: content.data?.partners,
  //         image: logo,
  //         site_name: "Faid Al Naam",
  //       },
  //       twitter: {
  //         card:  content?.isEnglish?"Buying or need more information? Visit us or send your inquiry for your assistance.": 'هل ترغب بالشراء أم تحتاج إلى مزيد من المعلومات؟ تفضل بزيارة متجرنا أو أرسل استفسارك لمساعدتك',
  //         creator: "@you",
  //         title:content?.data?.callUs??"",
  //       },

  //     },

  //     [content.data]
  // //   );
  // const contactUs = loading ?content.isEnglish? 'Loading':'جاري التحميل' : content?.data?.callUs || '';
  // const companyName = content?.data?.companyName || '';
  return (
    <div className="shrink-0   h-auto w-full overflow-hidden">
      {/* <Helmet>
        <link rel="icon" type="image/svg+xml" href={logo} />
        <meta charSet="utf-8" />
        <title>{`${contactUs} | ${companyName}`}</title>
        <link rel="canonical" href="https://faid-el-neam.vercel.app/contact-us" />
        <meta
          name="description"
          content={
            content?.isEnglish?"Buying or need more information? Visit us or send your inquiry for your assistance.":
             'هل ترغب بالشراء أم تحتاج إلى مزيد من المعلومات؟ تفضل بزيارة متجرنا أو أرسل استفسارك لمساعدتك'
          }
        />
        <meta
          property="og:url"
          content="https://faid-el-neam.vercel.app/contact-us"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Faid Al Naam" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="faid-el-neam.vercel.app" />
        <meta
          property="twitter:url"
          content="https://faid-el-neam.vercel.app/contact-us"
        />
        <meta name="twitter:title" content={content?.data?.callUs ?? ""} />
        <meta
          name="twitter:description"
          content={
            content?.isEnglish?"Buying or need more information? Visit us or send your inquiry for your assistance.":
             'هل ترغب بالشراء أم تحتاج إلى مزيد من المعلومات؟ تفضل بزيارة متجرنا أو أرسل استفسارك لمساعدتك'
          }
        />
        <meta name="twitter:image" content={logo} />
      </Helmet> */}

      <section
        ref={refAttr}
        id="contact-us"
        className={` w-full  min-h-[80vh] overflow-x-auto overflow-y-hidden flex flex-col bg-white items-center`}
      >
        <header
          className={` flex flex-col items-center mt-36 justify-center w-full`}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.3, delay: 0.13 }}
            className="text-5xl font-bold  pb-2"
          >
            {content("callUs")}
          </motion.h1>

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
            {content("contactUsSubTitle")}
          </motion.h4>
        </header>

        <div className="w-full  max-w-[1080px] flex justify-evenly flex-wrap p-6 items-start">
          <motion.form
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.3, delay: 0.13 }}
            onSubmit={handleEmailForm}
            action=""
            className="h-full  lg:w-[30%] w-full "
          >
            <input
              value={data.data1}
              onChange={(e) => {
                setData((prev) => ({ ...prev, data1: e.target.value }));
              }}
              name="Email"
              type="email"
              placeholder="Email"
              className="p-2 my-2 w-full drop-shadow-md rounded-md border-2 border-gray"
            />
            <input
              value={data.data2}
              onChange={(e) => {
                setData((prev) => ({ ...prev, data2: e.target.value }));
              }}
              name="title"
              type="text"
              placeholder="Subject"
              className="p-2 my-2 w-full drop-shadow-md rounded-md border-2 border-gray"
            />

            <textarea
              value={data.data3}
              onChange={(e) => {
                setData((prev) => ({ ...prev, data3: e.target.value }));
              }}
              name="body"
              rows={8}
              style={{ resize: "none" }}
              placeholder="Body"
              className="p-2 w-full my-2 drop-shadow-md rounded-md border-2 border-gray"
            />
            <br />
            <button
              type="submit"
              className={` ${
                response == "normal"
                  ? " transition-all bg-[#48afeb]"
                  : "bg-[#afffa9]"
              }  text-white  rounded-md w-[5rem] py-[.3rem] relative flex justify-center items-center right-0 m-3`}
            >
              {response == "normal" ? (
                <Image
                priority={true}

                width={24}
                height={24}
                  alt="ready image"
                  className="relative right-[0.2rem]"
                  src={paperPlane}
                />
              ) : (
                <Image
                priority={true}

                width={24}
                height={24}
                alt="done image"   src={ok} />
              )}
            </button>
            <motion.div></motion.div>
          </motion.form>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -122 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.3, delay: 0.13 }}
            className="flex flex-col h-full relative justify-start items-start lg:w-[50%]  w-full"
          >
            <div className="w-full h-full z-10">
              <Link
                className=""
                href="https://www.google.com/maps/place/119_+121,+N+Teseen,+New+Cairo+1,+Cairo+Governorate+4730114/@30.0189942,31.4219912,17.21z/data=!4m6!3m5!1s0x14583cddef70ddc7:0xe93cffe25150cc72!8m2!3d30.0194487!4d31.4236985!16s%2Fg%2F11gw2xktft?entry=ttu"
                target="_blank"
              >
                <div className="z-30 sm:w-[35rem] px-14 w-full relative object-contain sm:m-auto">
                  <Image 
                   priority={true}
                   className=""
                   alt="map image" src={map}  />
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.3, delay: 0.13 }}
            className=" my-4  flex flex-wrap items-end justify-evenly w-full"
          >
            <div className="p-1 flex sm:w-auto w-full flex-col justify-start items-start">
              <Image
                            priority={true}

                alt="email image"
                src={envelope}
                width={32}
                height={32}
                className="p-1"
              />
              <h2>ali.alsisy@faidalnaamgroup.com</h2>
            </div>
            <div className="flex sm:w-auto w-full flex-col p-1 justify-end items-start">
              <Image
                            priority={true}

                alt="phone number image"
                src={phone}
                width={30}
                height={30}
                className="p-1"
              />
              <h2>+20 2 28123286</h2>
            </div>
            <div className="flex sm:w-auto w-full flex-col p-1 justify-end items-start">
              <Image
                            priority={true}

                alt="location image"
                src={location}
                height={30}
                width={30}
                className="p-1"
              />
              <h2>128 Hanimex mall Fifth settlement </h2>
            </div>
          </motion.div>
        </div>
        <div ref={mobRefAttr}></div>
      </section>
      <Footer />
    </div>
  );
}
