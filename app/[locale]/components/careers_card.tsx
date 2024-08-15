import loc from "/public/location2.svg";
import locPin from "/public/location-pin.svg";
import breifcase from "/public/briefcase.svg";
import { useCurrentLanguage } from "../hooks/get_language";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "../quill_style.css";
 
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
  const [content, setContent] = useState<ContentInterface>({
    isEnglish: false,
    data: null,
  });
  let language = useCurrentLanguage();

  useEffect(() => {
    if (language) {
      setContent({
        isEnglish: language.type === "en",
        data: language.value,
      });
    }
  }, [language]);
  return (
    <>
      <div
        onClick={() => {
          if (onClick) onClick();
        }}
        className={`
          ${content.isEnglish?"items-start":"items-end"}
          flex flex-col
          cursor-pointer rounded-md min-w-[14rem] max-h-32 m-1 overflow-hidden p-3 bg-white border-2 transition-all shadow-md ${
          isActive ? "border-blue-500" : "border-white"
        }`}
      >
        <div className={` flex  w-full overflow-hidden whitespace-nowrap text-ellipsis`}>
          <span className={`w-40 font-bold mx-3 flex ${content.isEnglish?"flex-row":"flex-row-reverse "} overflow-hidden whitespace-nowrap text-ellipsis`}>{title}</span>
        </div>
        <div className={`text-gray-600 mx-4 text-sm flex ${content.isEnglish?"flex-row":"flex-row-reverse "} text-center `}>
          <img  src={loc} className="mx-2 my-1 w-4 object-cover h-4" />
          <span>{jobSiteEn}</span>
        </div>
        <div className={`text-gray-600 mx-4 text-sm flex ${content.isEnglish?"flex-row":"flex-row-reverse "} text-center`}>
          <img src={breifcase} className="mx-2 my-1 m-1 w-4 h-4" />
          <span>{experianceEn}</span>
        </div>
        <div className={`text-gray-600 mx-4 text-sm flex ${content.isEnglish?"flex-row":"flex-row-reverse "} text-center`}>
          <img src={locPin} className="mx-2 my-1 m-1 w-4 h-4" />
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

  let language = useCurrentLanguage();
  const [content, setContent] = useState<ContentInterface>({
    isEnglish: false,
    data: null,
  });
  const ref = useRef< ReactQuill>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.getEditingArea().getElementsByClassName("ql-editor")[0]
      .classList.add( content.isEnglish ? "ql-align-left" : "ql-align-right");
    }
  },[ref.current,content])
  useEffect(() => {
    if (language) {
      setContent({
        isEnglish: language.type === "en",
        data: language.value,
      });
    }
  }, [language]);
  return (
    <div className=" w-screen flex flex-col  border-l-2  border-l-gray-100">
      <div
        className={`flex px-3 w-full justify-between items-center ${
          content.isEnglish ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="rounded-md  w-[14rem]   p-3 bg-white ">
        <div className={` flex  w-full overflow-hidden whitespace-nowrap text-ellipsis`}>
          <span className={`w-40 font-bold mx-3 flex ${content.isEnglish?"flex-row":"flex-row-reverse "} overflow-hidden whitespace-nowrap text-ellipsis`}>{title}</span>
        </div>
          <div className={`text-gray-600 flex ${content.isEnglish?"flex-row":"flex-row-reverse "} ml-4 text-sm flex items-end text-center`}>
            <img src={loc} className="mx-2 my-1 w-4 object-cover h-4" />
            <span>{jobSiteEn}</span>
          </div>
          <div className={`text-gray-600 flex ${content.isEnglish?"flex-row":"flex-row-reverse "} ml-4 text-sm flex items-end text-center`}>
            <img src={breifcase} className="mx-2 my-1 object-cover w-4 h-4" />
            <span>{experianceEn}</span>
          </div>
          <div className={`text-gray-600 flex ${content.isEnglish?"flex-row":"flex-row-reverse "} ml-4 text-sm object-cover flex items-end text-center`}>
            <img src={locPin} className="mx-2 my-1 w-4 h-4" />
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
      className={`p-2  border-0  flex flex-col ${content.isEnglish?"flex-row":"flex-row-reverse "} `}
      readOnly value={summeryEn}/>
      <div
        className={`w-5/6 m-1 px-20 flex ${
          content.isEnglish ? " justify-start" : "justify-end"
        }`}
      >
        <Link
          state={{ id: id, position: title }}
          className="text-blue-600  mt-2 border-2 border-gray-200 px-3 py-1 rounded-2xl shadow-sm"
          to={"/upload-resume"}
        >
          {content.data?.ApplyYourResume}
        </Link>
      </div>
    </div>
  );
}
