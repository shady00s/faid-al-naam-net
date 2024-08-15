import { useEffect, useState } from "react"

interface increamentInterface {
    component:JSX.Element
}
export default function IncreamentingInputWidget({component}:increamentInterface){
    const [components,setComponent] = useState<JSX.Element[]>([])
        useEffect(()=>{
            setComponent(()=>[<div key={Math.random()}>{component}</div>])          
        },[component])

        function addNewComponent(){
            setComponent((prev)=> [...prev,<div key={Math.random()}>{component}</div>])
        }    
    return <div className="flex items-end w-full">
            <div className="flex flex-col  w-full">
                {components.map((e)=>e)}
            </div>

            <button className="px-3 pb-1 text-center rounded-sm   text-white text-2xl bg-blue-400 my-1 mx-2 " onClick={(e)=>{
                e.preventDefault();
                addNewComponent();
                
                }}>+</button>
    </div>

}