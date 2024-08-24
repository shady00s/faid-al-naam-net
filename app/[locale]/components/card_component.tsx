import Link  from 'next/link';
import fb from '/public/images/facebook-f.svg';
import ln from '/public/images/linkedin-in.svg';
import x from '/public/images/x.svg';
import Image from 'next/image';

interface employeeInterface {
    name: string,
    imageUrl: string,
    title: string,
    facebookUrl: string,
    linkedInUrl: string,
    xUrl: string,
    summary: string,
    isEnglish:boolean
 }
export default function CardComponent({ facebookUrl, imageUrl, linkedInUrl, name, title, xUrl, summary,isEnglish }: employeeInterface) {


    return (

        <div className={`w-[18rem] ${isEnglish ? 'items-start' : 'items-end '} p-4 shadow-md shadow-gray-100 drop-shadow-sm  flex flex-col overflow-hidden rounded-md bg-slate-50`}>

            <img

                alt="image" src={imageUrl} width={160} height={160} />

            <h3 className="text-black relative m-1 mt-3 text-sm font-bold">{name}</h3>
            <h4 className="text-gray-600 relative m-1 text-xs font-bold">{title}</h4>

            <p className={`text-gray-800 text-sm mt-4 ${isEnglish?'text-start':'text-end'}`}>{summary}</p>

            <div className={`flex w-full  items-center mt-4 `}>
                {facebookUrl.length > 0 ? <Link target="_blank" href={facebookUrl}> <Image alt="facebook image logo" src={fb} className='m-2 cursor-pointer hover:hover:scale-110 transition-transform ' width={17} height={17} /> </Link> : null}
                {linkedInUrl.length > 0 ? <Link target="_blank" href={linkedInUrl}> <Image alt="linkedin image logo" src={ln} className='m-2 cursor-pointer hover:scale-110 transition-transform ' width={17} height={17} /> </Link> : null}
                {xUrl.length > 0 ? <Link target="_blank" href={xUrl}>  <Image alt="x image logo" src={x} className='m-2 cursor-pointer hover:scale-110 transition-transform' width={15} height={15} /> </Link> : null}

            </div>


        </div>
    );

}