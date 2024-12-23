import { motion } from 'framer-motion';

export const ScrollingText = () => {
  return (
    <div className="flex w-full text-center overflow-hidden py-5 text-[40px] md:text-[80px] bg-primary text-white">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="whitespace-nowrap"
      >
        <p className="inline-block mx-3">
          VIAJÁ INTELIGENTE<span className="font-bold"> VIVÍ ARGENTINA </span>
        </p>
        <p className="inline-block mx-3">
          VIAJÁ INTELIGENTE<span className="font-bold"> VIVÍ ARGENTINA </span>
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="whitespace-nowrap"
      >
        <p className="inline-block mx-3">
          VIAJÁ INTELIGENTE<span className="font-bold"> VIVÍ ARGENTINA </span>
        </p>
        <p className="inline-block mx-3">
          VIAJÁ INTELIGENTE<span className="font-bold"> VIVÍ ARGENTINA </span>
        </p>
      </motion.div>
    </div>
  );
};
