"use client";
import {useState} from 'react'
import { useParams ,useRouter} from "next/navigation";
import Image from "next/image";
import glope from "/public/images/globe.svg";
   export default function SetLanguageComponent() {
    const currentLang = useParams().locale;
    const [selectedLang,setSelectedLang] = useState(currentLang)
    const router = useRouter()

     return <div className="cursor-pointer flex ">
        <Image 
                      priority={true}

        alt="language image" src={glope} width={20} height={20}  className="w-4 h-4 m-1"/>
        <select value={selectedLang}  onChange={(e) => {
                setSelectedLang(e.target.value)
                router.push(`/${e.target.value}/${window.location.pathname.split('/')[2]??''}`)
        }} className="bg-black text-gray-500 p-1 text-sm" name="" id="">
            <option value="en">English</option>
            <option value="ar">العربية</option>
        </select>
    </div>
}