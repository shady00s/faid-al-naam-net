
import Image from 'next/image';
export default function SplashScreen() {
    
    return <>
        <section
           
            className={"shrink-0 bg-black z-[55] flex justify-center items-center w-screen h-screen overflow-hidden left-0"}>
            <div>
 
<Image alt='loading image' src="/images/logo11.svg?react" width={120} height={120} />
{/* <Logo repeatDur={200} width={120} height={120} /> */}

            </div>
        </section>
    </>
}