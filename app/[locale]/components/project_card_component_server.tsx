import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";
interface ProjectCardInterface {
    imagePath: any,
   title: string,
   subTitle: string,
   startDate: string,
   endDate: string,
   todos: [],
   isEnglish:boolean
}

interface progressInterface {
    percentage: number,
    endDate: string,
    startDate: string,
    isEnglish:boolean
}

function ProjectProgressComponent({ percentage, endDate, startDate ,isEnglish}: progressInterface) {

     
    return (
        <div className={`flex flex-col ${isEnglish ? "items-start" : "items-end"} h-full`}>
            <h1 className="font-bold text-xs mx-1">{Math.round(percentage) }%</h1>

            <div className="m-1 mb-2 w-[90%] h-[0.35rem] bg-[#F0F0F0] rounded-sm">
                <div style={{
                    width: percentage + "%"
                }} className={` h-[0.35rem] bg-[#67C4E1] rounded-sm`}></div>

            </div>
            <div className={`${isEnglish?' flex-row':'flex-row-reverse'} flex  justify-between p-1 items-center`}>
                <span className="text-xs my-1 font-bold text-gray-700 mr-1">{isEnglish?"Starts:":'يبتدي في '}</span>
                <h3 className="text-xs m-1"> {new Date(startDate).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })}</h3>
            </div>
            <div className={`${isEnglish?' flex-row':'flex-row-reverse'} flex  justify-between p-1 items-center`}>
                <span className="text-xs  font-bold text-gray-700 mr-1">{isEnglish?"Ends:":'ينتهي في'}</span>
                <h3 className="text-xs m-1">{new Date(endDate).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })}</h3>
            </div>

    

        </div>
    );
}

const ProjectCardServerSideComponent: FC<ProjectCardInterface> = function ({ imagePath, title, subTitle, endDate, startDate, todos, isEnglish }) {
    
    const percentage = Math.round((todos.filter((e: any) => e.status == true).length) / todos.length * 100)

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

   

    return (
        <Link href={`/${useParams().locale}/projects/${title.replace(" ","-")}`}>
        <div id="projectCard"  className=" md:max-w-[324px] cursor-pointer w-[85vw] shadow-md  overflow-hidden  hover:mx-1  transition-all  m-2  h-[26rem] rounded-md bg-white">
            <img alt={"project background image"+title} src={`${imagePath.find((e: string) => !youtubeRegex.test(e))}`}   className="w-full h-[52%] rounded-md object-cover" />
            <div className={`p-1 flex flex-col ${isEnglish ? "items-start" : "items-end"} w-full`}>
                <h1 className={` font-semibold mx-2 w-[312px] overflow-hidden break-words  h-[3.5rem] text-ellipsis ${isEnglish?'text-start':'text-end'}`}>{title}</h1>
                <div className={`flex mt-2 w-full justify-between  mx-1 ${isEnglish ? "items-start" : "items-end"}`}>
                    <div className="w-[43%] h-full">
                        <ProjectProgressComponent percentage={percentage} endDate={endDate} startDate={startDate} isEnglish={isEnglish} />

                    </div>
                    <div className={`h-[5.4rem] w-[57%] mx-2 `}>

                        <p className={`w-full h-full text-[0.81rem] `} style={{
                            display: 'block',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: '4.8em',
                            lineHeight: '1.6em',
                            direction: isEnglish ? 'ltr' : 'rtl'

                        }} > {subTitle}</p>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
}

export default ProjectCardServerSideComponent