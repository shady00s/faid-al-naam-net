"use client";
import { useRef, useState } from "react";
import word from "/public/images/word.svg";
import pdf from "/public/images/pdf.svg";
import Image from "next/image";

interface fileUploader {
  disabled: boolean;
  title: string;
  subTitle: string;
}

export default function FileUploader({ disabled, title, subTitle }: fileUploader) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cachedFile, setCachedFile] = useState<File | null>(null);
  const [displayedFile, setDisplayedFile] = useState<File | null>(null);

  const handleClick = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];

    // Update cached file only if a new file is selected
    if (newFile) {
      setCachedFile(newFile);
      setDisplayedFile(newFile); // Initially display the new file
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      {displayedFile ? ( // Display the file (cached or currently selected)
        <div className="border-2 border-gray-200 bg-gray-50 p-4 w-full h-[14rem] m-2 flex flex-col items-center  justify-center rounded-md">
          <div className="flex bg-white rounded-md  p-3 shadow-sm">
            {/* Display the appropriate image based on file type */}
            <Image
              src={displayedFile.type === "application/pdf" ? pdf : word}
              alt="file type icon"
              width={53}
              height={53} // Adjust image dimensions as needed
            />
            <div className="flex flex-col p-1">
              <span>{displayedFile.name}</span>
              <span>{Math.round(displayedFile.size / 1024)} MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-gray-200 p-4 w-full h-[14rem] m-2 flex flex-col items-center  justify-center rounded-md">
          <span className="text-gray-400 text-sm">{subTitle}</span>
        </div>
      )}
      <input
        required
        value={cachedFile?.name || ''}
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