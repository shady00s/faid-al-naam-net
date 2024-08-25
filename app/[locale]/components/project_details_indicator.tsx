import React from "react";

export default function ProjectDetailsIndecator({
  isEnglish,
  numberOfTodos,
}: {
  isEnglish: boolean;
  numberOfTodos: [];
}) {
  const width = Math.round((numberOfTodos.filter((e: any) => e.status == true).length) / numberOfTodos.length * 100);
  console.log(width)
  return (
    <div className={`w-full `}>
      <div
        className={`flex items-center ${isEnglish?"":"flex-row-reverse"} justify-between px-1 w-[90%] m-auto divide-x relative h-4 rounded-md`}
      >
                    <div
                    className={`bg-[rgba(242,242,242,1)] m-0 p-0 b-0 md:h-3 h-2 flex justify-end items-center w-full rounded-md ${isEnglish?"flex-row-reverse":""}`}>
                   
                   <div
                    className={`bg-[rgba(111,158,172,1)] 
                      transition-all
                       md:h-3 h-2 m-0 p-0 b-0  flex justify-end items-center rounded-md `}
                      style={{width: `${width}%`}}
                   >
                    
                  </div>
              </div>
            
 
      </div>
    </div>
  );
}
