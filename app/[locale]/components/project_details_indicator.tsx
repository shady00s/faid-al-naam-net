import React from "react";

export default function ProjectDetailsIndecator({
  isEnglish,
  numberOfTodos,
}: {
  isEnglish: boolean;
  numberOfTodos: [];
}) {
  return (
    <div className={`w-full `}>
      <div
        className={`flex items-center ${isEnglish?"":"flex-row-reverse"} justify-between px-1 w-[90%] m-auto divide-x relative h-4 rounded-md`}
      >
        {numberOfTodos.map(
          (todo: { isFinished: any }, index: React.Key | null | undefined) => {
            return (
              <div
                key={index}
                className={`h-3 w-full m-0 p-0 b-0 flex items-center justify-start ${isEnglish?"":"flex-row-reverse"}`}
              >
                {todo.isFinished ? (
                  <div
                    className={`bg-[rgba(111,158,172,1)]  md:h-3 h-2 m-0 p-0 b-0  flex justify-end items-center `}
                    style={{ width: "100%" }}
                  >
                   
                  </div>
                ) : (
                  <div
                    className={`bg-[rgba(242,242,242,1)] m-0 p-0 b-0 md:h-3 h-2 flex justify-end items-center `}
                    style={{ width: "100%" }}
                  >
                   
                   
                    
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
