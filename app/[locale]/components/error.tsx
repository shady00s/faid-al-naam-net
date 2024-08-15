import {motion, useAnimation} from 'framer-motion'
import { useEffect } from 'react'


interface errorInterface {
    error:string
}
export default function ErrorComponent({error}:errorInterface){
    const animate = useAnimation()
    useEffect(()=>{
        if(error.length == 0){
            animate.start('hidden')
        }else{
            animate.start('visible')
        }
    },[error]) 
    return <>

        <motion.div 
        variants={{
            visible:{height:128,opacity:1,padding:"12px"},
            hidden:{height:0,opacity:0,padding:0}
        }}
        initial={"hidden"}
        animate={animate}
        transition={{ duration: .3 }} 
        className='bg-red-400 p-3 m-3 rounded-md overflow-hidden'>
            <h1 className='text-white font-bold'>Error</h1>
            <span className='text-white'>{error}</span>
        </motion.div>
    </>
}