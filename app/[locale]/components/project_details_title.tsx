export default function ProjectDetailsTitle({ title, isEnglish }: { title: string,isEnglish:boolean }) {
    return (
        <div
        className={`flex ${
          isEnglish ? " justify-start  " : "  justify-end"
        } items-center w-screen py-3 px-10`}
      >
        <div
          className={`flex items-center ${
            isEnglish ? " justify-start  " : "  justify-end flex-row-reverse"
          }`}
        >
          <div className={"h-8 w-1 rounded-md mx-1 bg-[rgba(0,163,173,1)]"}></div>
          <h2 className="font-bold text-2xl">{title}</h2>
        </div>
      </div>    
    
    )}