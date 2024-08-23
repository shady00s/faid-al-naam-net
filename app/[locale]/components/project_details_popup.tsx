'use client';
import { motion, useAnimation } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { ProjectDetailsContext } from "../context/project";
import { ProjectProgressComponent } from "./project_card_component";
 import YouTubePlayer from "react-player/youtube";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function ProjectDetailsPopup() {
     const isEnglish = useParams().locale === "en";
    const animate = useAnimation();
    const ref = useRef<HTMLDivElement>(null)
    const { projectData, } = useContext(ProjectDetailsContext)
    const [selectedMedia,setSelectedMedia] = useState('')
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    function checkForData() {
        if (projectData) {
            animate.start("visible")
        }
    }

    function close() {
        animate.start("hidden").then(()=>{setSelectedMedia('')})
        
    }
    useEffect(() => {
        checkForData()
    }, [projectData])


    return <motion.div

        id="bg"
        ref={ref}
        className=" z-30 bg-[rgba(0,0,0,0.41)] top-0 left-0 w-screen h-screen fixed"
        variants={{
            hidden: { opacity: 0, zIndex: -20 },
            visible: { opacity: 1, zIndex: 90 },
        }}
        initial="hidden"
        animate={animate}
        transition={{ duration: 0.3 }}>
        <div className="w-full h-full bg-transparent flex justify-center items-center ">

            <div className="md:w-[67%] w-full sm:h-[34rem] h-[90%] max-w-[1080px] overflow-hidden m-2 bg-white rounded-md">
                <div className={`flex justify-between items-center p-4 ${isEnglish ? "flex-row" : "flex-row-reverse"}`}>
                    <h1 className={`text-xl font-bold w-5/6 ${isEnglish?'text-start':'text-end'}`}>{projectData?.title}</h1>
                    <Image 
                                  priority={true}

                    src="images/close.svg" width={14} height={14} alt="close image" className="hover:scale-105 transition-transform ease-out cursor-pointer" onClick={() => { close() }}/>
                    {/* <img alt="project details image" width={14} className="hover:scale-105 transition-transform ease-out cursor-pointer" src={closeSvg} onClick={() => { close() }} /> */}
                </div>

                <div className={`flex overflow-y-auto h-[95%] sm:h-full  flex-wrap ${isEnglish ? "flex-row-reverse" : "flex-row"} px-4`}>
                    {/* images */}
                    <div className="w-full lg:w-[55%] sm:m-4 px-4 py-2">
                     {youtubeRegex.test(selectedMedia==''?projectData?.imagePath[0]:selectedMedia)? <YouTubePlayer controls  url={selectedMedia==''?projectData?.imagePath[0]:selectedMedia} width={'100%'} height={'54%'}/>:<img alt="image" src={selectedMedia==''?projectData?.imagePath[0]:selectedMedia}  className=" transition-all  w-full h-[54%] rounded-md" />}
                        <div className="flex w-full transition-all h-1/3 flex-wrap justify-center items-center space-x-2 overflow-y-auto">
                          
                          {projectData?.imagePath.map((e:string)=>youtubeRegex.test(e)? <div onClick={()=>{setSelectedMedia(e)}} className={`${selectedMedia == e ? 'border-2 border-cyan-300 p-1 ':""} w-24 m-2 rounded-md bg-black flex items-center justify-center`}> <Image alt="image" className="" src={"/images/youtube.svg"}/> </div> :  <Image alt="image" onClick={()=>{setSelectedMedia(e)}} src={e}  className={`${selectedMedia == e ? 'border-2 border-cyan-300 p-1 ':""} w-24 m-2 rounded-md`} /> )}
 
                        </div>
                    </div>
                    {/* content */}
                    <div className={`w-full lg:w-[35%] sm:m-4 px-4 py-2 h-[75%] overflow-y-auto flex flex-col ${isEnglish ? "items-start" : "items-end"}`}>
                        <div className="w-full">
                            <ProjectProgressComponent percentage={projectData?.todos.filter((e:any)=>e.status == true).length /projectData?.todos.length * 100} endDate={projectData?.endDate} startDate={projectData?.startDate} />
                        </div>
                        <h2 className="font-bold">{isEnglish?"Project Objective:":' هدف المشروع'}</h2>
                        <p className={`m-2 text-[0.90rem] ${isEnglish ? "text-left" : "text-right"}`}>{projectData?.subTitle}</p>
                        <h2 className="font-bold">{isEnglish?"Project steps:":'خطوات المشروع'}</h2>

                        {projectData?.todos.map((e: any) => <ProjectTodos e={e}/>)}


                    </div>
                </div>
            </div>

        </div>


    </motion.div>

}

function ProjectTodos(e:any) {
     const isEnglish = useParams().locale == "en";
    return <ul >
        <li className={`${e.e.status?'line-through  text-gray-600 ':" "} w-full m-1 flex items-start justify-start  ${isEnglish ? "flex-row  " : "flex-row-reverse"}`}><div className={`${e.e.status?'bg-green-600':"bg-blue-400"} w-4 h-4 m-1  rounded-sm`}></div> <span  style={{direction:isEnglish ? "ltr":'rtl'}}>{e.e.step}</span> </li>
    </ul>

}
