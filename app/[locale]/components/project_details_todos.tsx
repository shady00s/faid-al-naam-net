
export interface CheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    }
  
  const Checkbox = (props: CheckboxProps) => (
    <div className="mx-1 flex gap-2">
      <input
        className="
          peer relative p-1 appearance-none shrink-0 w-4 h-4 border-2 border-green-200 rounded-sm mt-1 bg-white
          focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-green-100
          checked:bg-[rgba(115,210,216,1)] checked:border-0
          disabled:border-steel-400 disabled:bg-steel-400
        "
        type="checkbox"
        {...props}
      />
      <svg
        className="absolute w-4 h-4 p-[2px] pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
     </div>
  );
  
 
export default function ProjectDetailsTodo({ title, isEnglish,isFinished }: { title: string,isEnglish:boolean,isFinished:boolean }) {
    return (
        <div className={`flex justify-center px-12 ${isEnglish?"items-start text-start":"items-end text-end flex-row-reverse"}`}>
            <Checkbox
            disabled={!isFinished}
            defaultChecked={isFinished}/>
        <h1 className={`px-3 ${isFinished?"line-through text-gray-600":""}`}>{title}</h1>
        </div>
    )
}