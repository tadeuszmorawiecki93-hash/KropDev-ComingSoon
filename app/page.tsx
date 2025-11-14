'use client'; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- Ustawienia Czasowe ---
const LOGO_ENTRY_DURATION_SEC = 1.0; 
const SLOW_FADE_DURATION_SEC = 3.0; 
const TRANSITION_DURATION_SEC = 1.5; 

const TEXT_START_DELAY_SEC = LOGO_ENTRY_DURATION_SEC * 0.4; 
const TEXT_WORD_STAGGER_SEC = 0.3; 

const WORD_ENTRY_DURATION_SEC = 1.0; 

// Obliczenia dla Timera
const TEXT_ANIMATION_DURATION = WORD_ENTRY_DURATION_SEC + (3 * TEXT_WORD_STAGGER_SEC); // 1.0s + 0.9s = 1.9s
const CONTENT_WAIT_DURATION_SEC = 3.0; // Bufor oczekiwania

// CAŁKOWITY CZAS CYKLU: Długi, aby animacja znikania (3s) działała poprawnie.
const CYCLE_DURATION_SEC = (TEXT_START_DELAY_SEC + TEXT_ANIMATION_DURATION + CONTENT_WAIT_DURATION_SEC + SLOW_FADE_DURATION_SEC + 0.5); 
// W przybliżeniu: 8.8 sekundy

const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1]; 
const textEntryEase: [number, number, number, number] = [0, 0.18, 0.37, 0.98]; 

// --- Warianty Całego Ekranu ---
const screenVariants: Variants = {
    enter: { 
        opacity: 0, 
        scale: 1.05,
        transition: { 
            duration: TRANSITION_DURATION_SEC, 
            ease: easeInOut,
            delayChildren: 0.1,
        } 
    },
    center: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: TRANSITION_DURATION_SEC, ease: easeInOut } 
    },
    exit: { 
        opacity: 0,
        scale: 0.95,
        transition: { duration: TRANSITION_DURATION_SEC, ease: easeInOut }
    }
};

// --- LOGO (Zanikanie 3s) ---
const imageVariants: Variants = {
    enter: { opacity: 0, y: 30, scale: 0.95 }, 
    center: { opacity: 1, y: 0, scale: 1, transition: { duration: LOGO_ENTRY_DURATION_SEC, ease: [0.2, 0.5, 0.1, 1.0] } },
    exit: { 
        opacity: 0, 
        y: -100, 
        scale: 0.8,
        transition: { 
            duration: SLOW_FADE_DURATION_SEC, 
            ease: easeInOut,
            delay: 0.15 
        } 
    } 
};


// --- TEKST (Zanikanie 3s) ---
const wordContainer: Variants = {
    enter: { opacity: 0 },
    center: {
        opacity: 1,
        transition: {
            delay: TEXT_START_DELAY_SEC, 
            staggerChildren: TEXT_WORD_STAGGER_SEC, 
        },
    },
    exit: { 
        opacity: 0, 
        y: -50, 
        scale: 0.9,
        transition: { 
            duration: SLOW_FADE_DURATION_SEC, 
            ease: easeInOut 
        } 
    }
};

// --- Warianty Pojedynczego Słowa (POPRAWIONA WYSOKOŚĆ) ---
const wordChild: Variants = {
    enter: { 
        opacity: 0, 
        y: 20, // Startuje nisko
        filter: "blur(10px)" 
    },
    center: { 
        opacity: 1, 
        // ZMIENIONE: Wskakuje na idealną pozycję (-20px od centrum)
        y: -20, 
        filter: "blur(0px)",
        transition: { 
            duration: WORD_ENTRY_DURATION_SEC, 
            ease: textEntryEase
        } 
    },
};

// --- Komponenty ekranów ---

const ScreenMarsz: React.FC = () => (
  <motion.div 
    key="marsz"
    className="screen-content"
    variants={screenVariants}
    initial="enter"
    animate="center"
    exit="exit" 
  >
    {/* OBRAZ */}
    <motion.div variants={imageVariants} initial="enter" animate="center" exit="exit">
      <Image
        src="/logobeztła.png" 
        alt="Logo KropDev - K"
        width={350} 
        height={350} 
        priority 
      />
    </motion.div>
    
    {/* TEKST */}
    <motion.p 
        style={{ fontSize: '2rem', marginTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        variants={wordContainer}
        initial="enter"
        animate="center"
        exit="exit"
    >
        {"Nowa Strona już wkrótce".split(" ").map((word, index) => (
            <motion.span 
                key={index}
                variants={wordChild}
                style={{ marginRight: '0.5rem', display: 'inline-block' }}
            >
                {word}
            </motion.span>
        ))}
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
    {/* OBRAZ */}
    <motion.div variants={imageVariants} initial="enter" animate="center" exit="exit">
      <Image
        src="/KropDevnapis.png" 
        alt="Logo KropDev - :)"
        width={700} 
        height={200} 
      />
    </motion.div>
    
    {/* TEKST */}
    <motion.p 
        className="slogan-korozja"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        variants={wordContainer}
        initial="enter"
        animate="center"
        exit="exit"
    >
        {"Prace Trwają".split(" ").map((word, index) => (
            <motion.span 
                key={index}
                variants={wordChild}
                style={{ marginRight: '0.5rem', display: 'inline-block' }}
            >
                {word}
            </motion.span>
        ))}
    </motion.p>
  </motion.div>
);

// --- Główny Komponent ---

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0); 

  useEffect(() => {
   
    const cycleScreen = () => {
      setCurrentScreen(prev => (prev === 0 ? 1 : 0));
    };

    const cycleTime = CYCLE_DURATION_SEC * 1000; 

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