"use client";
import React ,{ useRef, useState, useMemo,FC, memo } from "react";
import word from "/public/images/word.svg";
import pdf from "/public/images/pdf.svg";
import Image from "next/image";

interface fileUploader {
  disabled: boolean;
  title: string;
  subTitle: string;
  onSelect:(file:File)=>void
}

const  FileUploader = ({ disabled, title, subTitle,onSelect }: fileUploader) =>{
  const inputRef = useRef<HTMLInputElement>(null);
  const [cachedFile, setCachedFile] = useState<File | null>(null);

  const displayedFileType = useMemo(() => {
    return cachedFile?.type;
  }, [cachedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];

    if (newFile) {
      setCachedFile(newFile);
      onSelect(newFile)
    }
  };
  const handleClick = (e: any) => {
    
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.click();
        }
      };
  const displayedFileIcon = useMemo(() => {
    return displayedFileType === "application/pdf" ? pdf : word;
  }, [displayedFileType]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      {cachedFile ? ( // Display the file (cached)
        <div className="border-2 border-gray-200 bg-gray-50 p-4 w-full h-[14rem] m-2 flex flex-col items-center justify-center rounded-md">
          <div className="flex bg-white rounded-md p-3 shadow-sm">
            {/* Display the appropriate image based on file type */}
            <Image
              src={displayedFileIcon}
              alt="file type icon"
              width={53}
              height={53} // Adjust image dimensions as needed
            />
            <div className="flex flex-col p-1">
              <span>{cachedFile.name}</span>
              <span>{Math.round(cachedFile.size / 1024)} MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-gray-200 p-4 w-full h-[14rem] m-2 flex flex-col items-center justify-center rounded-md">
          <span className="text-gray-400 text-sm">{subTitle}</span>
        </div>
      )}
      <input
        required
        onChange={handleFileChange} // Use separate handler for clarity
        multiple={false}
        ref={inputRef}
        disabled={disabled}
        type="file"
        id="resumeMedia"
        name="resumeMedia"
        accept=".pdf, .DOC, .DOCX"
        className="opacity-0"
      />
      <button
        disabled={disabled}
        type="button"
        className="p-2 bg-blue-400 rounded-sm text-white "
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
}

export default memo(FileUploader)