// ```jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  // State for scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  // State for reveal animations
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  // Refs for sections
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  // Scroll progress handler
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - top) / (height + windowHeight)));
        setScrollProgress(progress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === textRef.current && entry.isIntersecting) {
            setIsTextVisible(true);
            observer.unobserve(textRef.current);
          }
          if (entry.target === cardsRef.current && entry.isIntersecting) {
            setIsCardsVisible(true);
            observer.unobserve(cardsRef.current);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of element is visible
    );

    if (textRef.current) observer.observe(textRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="flex flex-col items-center min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative"
      ref={sectionRef}
    >
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-emerald-600"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.3, ease: 'linear' }}
        />
      </div>

      {/* Text Section */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        ref={textRef}
        initial={{ opacity: 0, translateY: 50 }} // On-start: fade in and slide up
        animate={isTextVisible ? { opacity: 1, translateY: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-700 mb-6 tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every Drop Counts
        </motion.h1>
        <div className="space-y-4 text-gray-600">
          {[
            'Our water tracker empowers you to monitor daily water usage, from drinking to showering, helping you make informed choices to conserve water and combat the global water crisis.',
            'At BlueDrop, we’re dedicated to sustainable water management, providing tools that enable communities worldwide to reduce waste and ensure equitable access to this vital resource.',
          ].map((text, index) => (
            <motion.p
              key={index}
              className="text-base sm:text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, translateX: index % 2 === 0 ? -50 : 50 }}
              animate={isTextVisible ? { opacity: 1, translateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Images and Stats Section */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6" ref={cardsRef}>
        {/* Card 1 */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, translateY: 50 }}
          animate={isCardsVisible ? { opacity: 1, translateY: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="bg-blue-200 text-violet-950 rounded-2xl p-6 flex flex-col justify-between h-48 shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isCardsVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold">10L</h2>
            <p className="text-sm sm:text-base">We help to save up to 10L water through our water tracker</p>
          </motion.div>
          <motion.div
            className="h-64 bg-cover bg-center rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url("https://images.hdqwalls.com/wallpapers/water-drop-closeup-macro-4k-1x.jpg")`,
            }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={isCardsVisible ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="h-full bg-cover bg-center rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: `url("https://images.alphacoders.com/739/73931.jpg")`,
          }}
          initial={{ opacity: 0, translateY: 50 }}
          animate={isCardsVisible ? { opacity: 1, translateY: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Card 3 */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, translateY: 50 }}
          animate={isCardsVisible ? { opacity: 1, translateY: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="h-64 bg-cover bg-center rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url("https://tse1.mm.bing.net/th/id/OIP.grjtVHUTZyT7jutyMPmf6wHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3")`,
            }}
            initial={{ opacity: 0, translateX: 50 }}
            animate={isCardsVisible ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
          <motion.div
            className="bg-pink-200 text-violet-950 rounded-2xl p-6 flex flex-col justify-between h-48 shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isCardsVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold">1.5M+</h2>
            <p className="text-sm sm:text-base">We empower 1.5 million+ users worldwide</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;