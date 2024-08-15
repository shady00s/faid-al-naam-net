import { Link } from 'react-router-dom';
import fb from '/public/facebook-f.svg';
import ln from '/public/linkedin-in.svg';
import x from '/public/x.svg';

interface employeeInterface {
    name: string,
    imageUrl: string,
    title: string,
    facebookUrl: string,
    linkedInUrl: string,
    xUrl: string,
    summary: string,
    content: ContentInterface
}
export default function CardComponent({ facebookUrl, imageUrl, linkedInUrl, name, title, xUrl, summary, content }: employeeInterface) {


    return (

        <div className={`w-[18rem] ${content.isEnglish ? 'items-start' : 'items-end '} p-4 shadow-md shadow-gray-100 drop-shadow-sm  flex flex-col overflow-hidden rounded-md bg-slate-50`}>

            <img

                alt="image" src={imageUrl} width={160} height={160} />

            <h3 className="text-black relative m-1 mt-3 text-sm font-bold">{name}</h3>
            <h4 className="text-gray-600 relative m-1 text-xs font-bold">{title}</h4>

            <p className={`text-gray-800 text-sm mt-4 ${content.isEnglish?'text-start':'text-end'}`}>{summary}</p>

            <div className={`flex w-full  items-center mt-4 `}>
                {facebookUrl.length > 0 ? <Link target="_blank" to={facebookUrl}> <img alt="facebook image logo" src={fb} className='m-2 cursor-pointer hover:hover:scale-110 transition-transform ' width={17} height={17} /> </Link> : null}
                {linkedInUrl.length > 0 ? <Link target="_blank" to={linkedInUrl}> <img alt="linkedin image logo" src={ln} className='m-2 cursor-pointer hover:scale-110 transition-transform ' width={17} height={17} /> </Link> : null}
                {xUrl.length > 0 ? <Link target="_blank" to={xUrl}>  <img alt="x image logo" src={x} className='m-2 cursor-pointer hover:scale-110 transition-transform' width={15} height={15} /> </Link> : null}

            </div>


        </div>
    );

}