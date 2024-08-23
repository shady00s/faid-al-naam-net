import { RefObject } from "react";

export default function navigateHandeler(ref:RefObject<HTMLDivElement>){
    if(ref.current){
        ref.current.scrollIntoView({behavior:"smooth"})
    }
}