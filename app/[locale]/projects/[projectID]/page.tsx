import { getTranslations } from "next-intl/server";
import ProjectDetailsTitle from "../../components/project_details_title";
import ProjectDetailsTodo from "../../components/project_details_todos"
import ProjectDetailsIndecator from "../../components/project_details_indicator";
import Footer from "../../components/footer";
import Image from "next/image";
 import contactUs from '/public/images/contactUsImage.svg';
import Link from 'next/link'
import { Metadata } from "next";
import ProjectCardServerSideComponent from "../../components/project_card_component_server";

export async function generateMetadata({
  params: { locale,projectID
  },
}: any): Promise<Metadata> {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

  const decodedArabic = decodeURIComponent(projectID);
   const res = await fetch(
    `${process.env.BASE_URL}api/projectDetails?projectID=${decodedArabic}`
  );
  const data = await res.json();

  return {
    metadataBase:new URL('http://localehost:3000'),
    alternates: {
        canonical: '/',
        languages: {
          'en-US': '/en-US',
          'ar-AR': '/ar-AR',
        },
      },
    icons: {
      icon: "../../../public/images/logo1.svg",
      shortcut: "../../../public/images/logo1.svg",
    },

    title:
      locale === "en"
        ? data.project.projectNameEn
        : data.project.projectNameAr,
    description:
      locale === "en"
      ? data.project.discreptionEn
      : data.project.discreptionAr,
    // Open Graph properties
    openGraph: {
      title:
      locale === "en"
        ? data.project.projectNameEn
        : data.project.projectNameAr,
    description:
      locale === "en"
      ? data.project.discreptionEn
      : data.project.discreptionAr,
      images: {
        url: data.project.media.filter((e:string)=> youtubeRegex.test(e))[0],
        alt: "Faid Al-Naam For Food Security",
        type: "image/svg",
      },
    },
    // Twitter Card properties
    twitter: {
      card: "summary_large_image",
      images: {
        url: data.project.media.filter((e:string)=> youtubeRegex.test(e))[0],
        alt: "Faid Al-Naam For Food Security",
        type: "image/svg",
      },
      title:
      locale === "en"
        ? data.project.projectNameEn
        : data.project.projectNameAr,
    description:
      locale === "en"
      ? data.project.discreptionEn
      : data.project.discreptionAr,
    },
  };
}


export default async function Page({
  params,
}: {
  params: {
    locale: string;
    projectID: string;
  };
}) {
  const content = await getTranslations("");
  const decodedArabic = decodeURIComponent(params.projectID);
  const isEnglish = params.locale == "en";
  const res = await fetch(
    `${process.env.BASE_URL}/api/projectDetails?projectID=${decodedArabic}`
  );

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

  const data = await res.json();
  return (
    <section
      className={
        "text-center flex items-start w-screen  overflow-x-hidden flex-col justify-start h-full"
      }
    >
      <div className="h-12"></div>
      {/* Image with title */}
      <div className="w-screen h-[24rem] relative flex items-center justify-center">
        <Image
          className="blur-sm backdrop-blur-sm bg-black/30"
          src={data.project.media.find((e: string) => !youtubeRegex.test(e))}
          priority={true}
          fill={true}
          alt="project main image"
        />
        <h1 className="z-10 text-white font-bold text-3xl">
          {isEnglish ? data.project.projectNameEn : data.project.projectNameAr}
        </h1>
      </div>
{/* project target */}
      <div className="h-12"></div>
      <div>
        <ProjectDetailsTitle title={content("target")} isEnglish={isEnglish} />
        <p className={`px-14 py-4 ${isEnglish ? "text-start" : "text-end"}`}>
          {isEnglish ? data.project.discreptionEn : data.project.discreptionAr}
        </p>
      </div>

      <div className="h-12"></div>

      <div className={`flex flex-col ${isEnglish?"justify-end":"items-end"}`}>
        <ProjectDetailsTitle title={content("steps")} isEnglish={isEnglish} />
        <div className='h-5'></div>
        <ProjectDetailsIndecator isEnglish={isEnglish} numberOfTodos={data.project.projectStepsEn.sort((a:any,b:any)=>   Number(b.status) - Number(a.status)
        )}/>
        <div className='h-5'></div>
        {isEnglish? data.project.projectStepsEn.sort((a:any,b:any)=>   Number(b.status) - Number(a.status)).map((e:any,index:number)=> <ProjectDetailsTodo key={index} isEnglish={isEnglish} title={e.step} 
        isFinished={e.status}/>):
        data.project.projectStepsAr.sort((a:any,b:any)=>   Number(b.status) - Number(a.status)).map((e:any,index:number)=> 
        <ProjectDetailsTodo key={index} isEnglish={isEnglish} title={e.step} isFinished={e.status}/>)}
      </div>
      <div className="h-24"></div>
      <div className="h-12"></div>
      <div className={"flex flex-col"}>
      <ProjectDetailsTitle title={content("media")} isEnglish={isEnglish} />
      <div className={"w-full  flex justify-center flex-wrap p-4"}>
        {data.project.media.map((e:string)=>  youtubeRegex.test(e)? 
        <iframe
        key={e} 
        className="m-1 w-full  md:w-2/5   h-[20rem] md:h-[21rem]"
         src={e.replace("watch?v=","embed/")} 
         title="" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          ></iframe>
        :<Image 
        key={e}
        className="m-1" src={e} width={1000} height={1000} alt={"project image"}/>)}

      </div>
        </div>
      <div className="h-24"></div>
      <div className="h-12"></div>
      <div  className={`flex flex-col `}>
        <ProjectDetailsTitle title={content("seeAlso")} isEnglish={isEnglish} />
        <div className={`flex items-center h-full m-auto w-[90%] content-center flex-wrap ${isEnglish?"justify-start":"justify-end"}`} >
                       {data.projects.map((e:any) => (
                              <ProjectCardServerSideComponent
                               isEnglish={isEnglish}
                                key={e._id}
                                imagePath={e.media}
                                title={isEnglish? e.projectNameEn : e.projectNameAr}
                                subTitle={isEnglish? e.discreptionEn : e.discreptionAr}
                                startDate={e.startDate}
                                endDate={e.endDate}
                                todos={isEnglish? e.projectStepsEn : e.projectStepsAr}
                               />
                            ))}
                      </div>
      </div>
      <div className="h-24"></div>
      <div className="flex justify-center  relative items-center flex-col w-full h-[28rem]">
                <Image
                  priority={true}
                  alt="sub nav image"
                  src={contactUs}
                  style={{ objectFit: "cover" }}
                  className="  bg-no-repeat bg-center "
                  fill={true}
                />
                <h1 className="text-4xl font-bold text-white mb-3 z-20">
                  {isEnglish ? "Ready to get started?" : "جاهز للبدء؟"}
                </h1>
                <Link
                  style={{ backgroundColor: "rgba(0,19,85,0.56) " }}
                  className="py-3 px-2 z-20 m-1 cursor-pointer rounded-md  hover:text-white  text-sm font-bold text-gray-200 border-2  transition-all"
                  href={"/contact-us"}
                >
                  <h4>{content("subNavContactUs")}</h4>
                </Link>
              </div>
 
      <Footer/>
    </section>
  );
}
