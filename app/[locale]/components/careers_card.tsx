'use client';

import loc from "/public/images/location2.svg";
import locPin from "/public/images/location-pin.svg";
import breifcase from "/public/images/briefcase.svg";
 import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from 'next/image'
import ReactQuill from "react-quill";
import "./quill_style.css";
 
interface careers {
  id: string;
  title: string;
  locationEn: string;
  experianceEn: string;
  jobSiteEn: string;
  summeryEn?: string;
  isActive?: boolean;
  onClick?: () => void;
  onCloseDetails?: () => void;
}

export function   CareersCard({
  title,
  locationEn,
  experianceEn,
  jobSiteEn,
  isActive,
  onClick,
}: careers) {
  const content = useTranslations('')
  const isEnglish = useParams().locale == "en";

 ;
  return (
    <>
      <div
        onClick={() => {
          if (onClick) onClick();
        }}
        className={`
          ${isEnglish?"items-start":"items-end"}
          flex flex-col
          cursor-pointer rounded-md min-w-[14rem] max-h-32 m-1 overflow-hidden p-3 bg-white border-2 transition-all shadow-md ${
          isActive ? "border-blue-500" : "border-white"
        }`}
      >
        <div className={` flex  w-full overflow-hidden whitespace-nowrap text-ellipsis`}>
          <span className={`w-40 font-bold mx-3 flex ${isEnglish?"flex-row":"flex-row-reverse "} overflow-hidden whitespace-nowrap text-ellipsis`}>{title}</span>
        </div>
        <div className={`text-gray-600 mx-4 text-sm flex ${isEnglish?"flex-row":"flex-row-reverse "} text-center `}>
          <Image width={24} height={24}  src={loc} className="mx-2 my-1 w-4 object-cover h-4" alt="location" />
          <span>{jobSiteEn}</span>
        </div>
        <div className={`text-gray-600 mx-4 text-sm flex ${isEnglish?"flex-row":"flex-row-reverse "} text-center`}>
          <Image width={24} height={24}  src={breifcase} className="mx-2 my-1 m-1 w-4 h-4" alt="icon"/>
          <span>{experianceEn}</span>
        </div>
        <div className={`text-gray-600 mx-4 text-sm flex ${isEnglish?"flex-row":"flex-row-reverse "} text-center`}>
          <Image width={24} height={24}  src={locPin} className="mx-2 my-1 m-1 w-4 h-4"  alt="location pin icon"/>
          <span>{locationEn}</span>
        </div>
      </div>
    </>
  );
}

export function CareersDetails({
  id,
  title,
  locationEn,
  experianceEn,
  jobSiteEn,
  summeryEn,
  onCloseDetails,
}: careers) {
  const modules = {
    toolbar: [],
  };
  const customStyles= {
    ".ql-editor": {
      border: 'none',
    },
  } as React.CSSProperties;
  const content = useTranslations('')
  const isEnglish = useParams().locale == "en";
  
  const ref = useRef< ReactQuill>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.getEditingArea().getElementsByClassName("ql-editor")[0]
      .classList.add( isEnglish ? "ql-align-left" : "ql-align-right");
    }
  },[ref.current])

  return (
    <div className=" w-screen flex flex-col  border-l-2  border-l-gray-100">
      <div
        className={`flex px-3 w-full justify-between items-center ${
          isEnglish ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="rounded-md  w-[14rem]   p-3 bg-white ">
        <div className={` flex  w-full overflow-hidden whitespace-nowrap text-ellipsis`}>
          <span className={`w-40 font-bold mx-3 flex ${isEnglish?"flex-row":"flex-row-reverse "} overflow-hidden whitespace-nowrap text-ellipsis`}>{title}</span>
        </div>
          <div className={`text-gray-600 flex ${isEnglish?"flex-row":"flex-row-reverse "} ml-4 text-sm flex items-end text-center`}>
            <Image src={loc} className="mx-2 my-1 w-4 object-cover h-4" width={14} height={14} alt={"location icon 2"}/>
            <span>{jobSiteEn}</span>
          </div>
          <div className={`text-gray-600 flex ${isEnglish?"flex-row":"flex-row-reverse "} ml-4 text-sm flex items-end text-center`}>
            <Image src={breifcase} className="mx-2 my-1 object-cover w-4 h-4" width={14} height={14} alt={"location icon 3"}/>
            <span>{experianceEn}</span>
          </div>
          <div className={`text-gray-600 flex ${isEnglish?"flex-row":"flex-row-reverse "} ml-4 text-sm object-cover flex items-end text-center`}>
            <Image src={locPin} className="mx-2 my-1 w-4 h-4" width={14} height={14} alt={"location icon 4  "}/>
            <span>{locationEn}</span>
          </div>
        </div>
        <i onClick={onCloseDetails} className="lg:hidden visible fa fa-times cursor-pointer "></i>
        {/* <div className="sm:hidden visible" onClick={onCloseDetails}>close </div> */}
      </div>

       
 
      <ReactQuill
      ref={ref}
      formats={[  "rtl",  "header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"]}
      defaultValue={summeryEn}
         style={customStyles}
      modules={modules}
      theme="snow"
      className={`p-2  border-0  flex flex-col ${isEnglish?"flex-row":"flex-row-reverse "} `}
      readOnly value={summeryEn}/>
      <div
        className={`w-5/6 m-1 px-20 flex ${
          isEnglish ? " justify-start" : "justify-end"
        }`}
      >
        <Link
          // state={{ id: id, position: title }}
          className="text-blue-600  mt-2 border-2 border-gray-200 px-3 py-1 rounded-2xl shadow-sm"
          href={{pathname:"/upload-resume",query:{availableJob:id,jobName:title}}}
        >
          {content("ApplyYourResume")}
        </Link>
      </div>
    </div>
  );
}
