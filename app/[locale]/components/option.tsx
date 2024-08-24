"use client"
import { useState } from "react";

interface optionsInterface {
  optionsList: string[];
  onChange?: (onChange: string) => void;
  name: string;
  title: string;
  isObject?: boolean;
  isEnglish?:boolean
}

export default function OptionsComponent({
  onChange,
  optionsList,
  name,
  title,
  isObject,isEnglish
}: optionsInterface) {
  const [val, setVal] = useState<string>("");
  return (
    <div className="flex  px-1 flex-col items-center">
        <span className="p-1 inline-block">{title}</span>
        <select
        className="py-2 px-1 bg-white border-2  border-gray-200 rounded-md border-b-blue-400"
        value={val}
        name={name}
        onChange={(event) => {
            if (onChange) {
            onChange(event.target.value);
            }
             setVal(event.target.value);
        }}
        >
        {optionsList.map((e:any,index:number) => (
            <option value={e._id} key={index} className="p-2 ">{isObject? isEnglish? e.nameEn:e.nameAr :e}</option>
        ))}
        </select>

    </div>
  );
}
