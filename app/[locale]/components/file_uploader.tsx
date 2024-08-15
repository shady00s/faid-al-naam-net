import { useRef, useState } from "react";
import word from "/public/word.svg";
import pdf from "/public/pdf.svg";
interface fileUploader {
  disabled: boolean;
  title: string;
  subTitle: string;
}
export default function FileUploader({ disabled,title,subTitle }: fileUploader) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
   const handleClick = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
        inputRef.current.click();
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      {file ? (
        <div className="border-2 border-gray-200 bg-gray-50 p-4 w-full h-[14rem] m-2 flex flex-col items-center  justify-center rounded-md">
          <div className="flex bg-white rounded-md  p-3 shadow-sm">
            <img
              width={53}
              height={53}
              src={file.type == "application/pdf" ? pdf : word}
              alt=""
            />
            <div className="flex flex-col p-1">
              <span>{file.name}</span>
              <span>{Math.round(file.size / 1024)} MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-gray-200 p-4 w-full h-[14rem] m-2 flex flex-col items-center  justify-center rounded-md">
          <span className="text-gray-400 text-sm">{subTitle}</span>
        </div>
      )}
      <input
         required
        onChange={(data) => {
          if (data.target.files) {
            setFile(() => data.target.files![0]);
          }
        }}
        multiple={false}
        ref={inputRef}
        disabled={disabled}
        type="file"
        id="resumeMedia"
        name="resumeMedia"
        accept=".pdf, .DOC, .DOCS"
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
