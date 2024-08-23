import { getTranslations } from "next-intl/server";
import ProjectDetailsTitle from "../../components/project_details_title";
import ProjectDetailsTodo from "../../components/project_details_todos"
import ProjectDetailsIndecator from "../../components/project_details_indicator";
import Footer from "../../components/footer";
import Image from "next/image";
import { ProjectCardServerSideComponent } from "../../components/project_card_component";

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
    `http://localhost:3000/api/projectDetails?projectID=${decodedArabic}`
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

      <div className={`flex flex-col ${isEnglish?"justify-end":"items-end"} `}>
        <ProjectDetailsTitle title={content("target")} isEnglish={isEnglish} />
        <div className='h-5'></div>
        <ProjectDetailsIndecator isEnglish={isEnglish} numberOfTodos={data.project.projectStepsEn.sort((a:any,b:any)=>   Number(b.status) - Number(a.status)
        )}/>
        <div className='h-5'></div>
        {isEnglish? data.project.projectStepsEn.map((e:any,index:number)=> <ProjectDetailsTodo key={index} isEnglish={isEnglish} title={e.step} 
        isFinished={e.status}/>):
        data.project.projectStepsAr.map((e:any,index:number)=> 
        <ProjectDetailsTodo key={index} isEnglish={isEnglish} title={e.step} isFinished={e.status}/>)}
      </div>
      <div className="h-24"></div>
      <div className="h-12"></div>
      <div  className={`flex flex-col `}>
        <ProjectDetailsTitle title={content("target")} isEnglish={isEnglish} />
        <div className={`flex items-center h-full m-auto w-[90%] content-center flex-wrap ${isEnglish?"justify-start":"justify-end"}`} >
                       {data.projects.map((e:any,index:number) => (
                              <ProjectCardServerSideComponent
                              key={index}
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

      <Footer/>
    </section>
  );
}
