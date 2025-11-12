// app/page.tsx
'use client'; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Konfiguracja czasów
const DELAY_ON_SCREEN_MS = 2500; // Czas statycznego wyświetlania ekranu
const TRANSITION_DURATION_SEC = 1.5; // Czas trwania animacji znikania/pojawiania się

// Krzywa Beziera dla "easeInOut"
const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1]; 

// Warianty Framer Motion dla płynnego przejścia
// Jawne przypisanie typu Variants
const screenVariants: Variants = {
    // Stan początkowy (pojawianie się)
    enter: { 
        opacity: 0, 
        scale: 0.9, 
        filter: 'blur(10px)'
    },
    // Stan aktywny (wyświetlanie)
    center: { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        transition: { 
            duration: TRANSITION_DURATION_SEC, 
            ease: easeInOut 
        } 
    },
    // Stan wyjścia (znikanie)
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

// --- KOMPONENTY WIDOKÓW ---

// 1. Ekran Powitalny ("Nowa Strona już wkrótce")
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

// 2. Ekran Korozja ("Prace Trwają")
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


// --- GŁÓWNY KOMPONENT STRONY Z PĘTLĄ ---
export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0); // 0 = Marsz, 1 = Korozja

  useEffect(() => {
    // Funkcja do zmiany ekranu
    const cycleScreen = () => {
      setCurrentScreen(prev => (prev === 0 ? 1 : 0));
    };

    // Uruchomienie pętli
    const cycleTime = DELAY_ON_SCREEN_MS + (TRANSITION_DURATION_SEC * 1000); 

    const timer = setInterval(cycleScreen, cycleTime);

    return () => clearInterval(timer);
  }, []); 

  return (
    <>
      {/* Element Wideo w tle (Pamiętaj o ścieżce!) */}
      <video className="video-background" autoPlay loop muted playsInline>
          <source src="videos/saberbackgroundblur.mp4" type="video/mp4" />
          Twój browser nie wspiera tagu wideo.
      </video>

      {/* AnimatePresence zarządza animacją znikania/pojawiania się komponentów */}
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