interface ButtonInterface {
    loading: boolean;
    title?: string;
    onCLick?: () => any
  }
  
  import { motion, useAnimation } from 'framer-motion';
  import rotate from '/public/rotate.svg';
  import { useEffect } from 'react';
  
  export function SubmitButtonComponent({ loading,title }: ButtonInterface) {
    const animate = useAnimation();
    useEffect(() => {
      animate.start(loading ? 'loading' : 'idle');
    }, [loading]);
  
    return (
      <div className='w-full relative'>
        <motion.div
          variants={{
            idle: { opacity: 1,height:'28px' },
            loading: { opacity: 0,height:0 },
          }}
          initial="idle"
          animate={animate}
  
        >
          <button
            type="submit"
            value="submit"
            disabled={loading}
            className="p-1 rounded-md  bg-blue-500 w-full text-white"
          >
           {title??"Submit"}  
          </button>
        </motion.div>
  
        <motion.div
          className='w-full bg-blue-400 absolute top-0 flex justify-center p-1 rounded-md '
          variants={{
            idle: { opacity: 0,height:0 },
            loading: { opacity: 1,height:'28px' },
          }}
          initial="idle"
          animate={animate}
        >
          <img src={rotate} className="" />
        </motion.div>
      </div>
    );
  }