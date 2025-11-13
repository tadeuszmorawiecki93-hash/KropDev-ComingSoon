
'use client'; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';


const DELAY_ON_SCREEN_MS = 2500; 
const TRANSITION_DURATION_SEC = 1.5; 


const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1]; 



const screenVariants: Variants = {
    
    enter: { 
        opacity: 0, 
        scale: 0.9, 
        filter: 'blur(10px)'
    },
   
    center: { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        transition: { 
            duration: TRANSITION_DURATION_SEC, 
            ease: easeInOut 
        } 
    },
   
    exit: {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
        transition: { 
            duration: TRANSITION_DURATION_SEC, 
            ease: easeInOut
        }
    }
};




const ScreenMarsz: React.FC = () => (
  <motion.div 
    key="marsz"
    className="screen-content"
    variants={screenVariants}
    initial="enter"
    animate="center"
    exit="exit" 
  >
    <Image
      src="/logobeztła.png" 
      alt="Logo KropDev - K"
      width={350} 
      height={350} 
      priority 
    />
    <motion.p 
        style={{ fontSize: '2rem', marginTop: '40px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }} 
    >
        Nowa Strona już wkrótce
    </motion.p>
  </motion.div>
);


const ScreenKorozja: React.FC = () => (
  <motion.div 
    key="korozja"
    className="screen-content"
    variants={screenVariants}
    initial="enter"
    animate="center"
    exit="exit"
  >
    <Image
      src="/KropDevnapis.png" 
      alt="Logo KropDev - :)"
      width={700} 
      height={200} 
    />
    <motion.p 
        className="slogan-korozja"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5 }}
    >
       Prace Trwają
    </motion.p>
  </motion.div>
);



export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0); 

  useEffect(() => {
   
    const cycleScreen = () => {
      setCurrentScreen(prev => (prev === 0 ? 1 : 0));
    };

  
    const cycleTime = DELAY_ON_SCREEN_MS + (TRANSITION_DURATION_SEC * 1000); 

    const timer = setInterval(cycleScreen, cycleTime);

    return () => clearInterval(timer);
  }, []); 

  return (
    <>
     
      <video className="video-background" autoPlay loop muted playsInline>
          <source src="videos/saberbackgroundblur.mp4" type="video/mp4" />
          Twój browser nie wspiera tagu wideo.
      </video>

      
      <AnimatePresence mode="wait"> 
          <div className="scene">
            {currentScreen === 0 ? (
                <ScreenMarsz key="marsz" /> 
            ) : (
                <ScreenKorozja key="korozja" />
            )}
          </div>
      </AnimatePresence>
    </>
  );
}