import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Stack, TextField } from '@mui/material';

const Footer = () => {
  // State for reveal animations
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isLinksVisible, setIsLinksVisible] = useState(false);
  const infoRef = useRef(null);
  const linksRef = useRef(null);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === infoRef.current && entry.isIntersecting) {
            setIsInfoVisible(true);
            observer.unobserve(infoRef.current);
          }
          if (entry.target === linksRef.current && entry.isIntersecting) {
            setIsLinksVisible(true);
            observer.unobserve(linksRef.current);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of element is visible
    );

    if (infoRef.current) observer.observe(infoRef.current);
    if (linksRef.current) observer.observe(linksRef.current);

    return () => observer.disconnect();
  }, []);

  // Navigation links
  const navLinks = ['Home', 'About', 'Features', 'Tips', 'Blog'];
  // Support links (replacing duplicate Quick Links)
  const supportLinks = ['Contact', 'Support', 'FAQ', 'Terms', 'Privacy'];

  return (
    <motion.section
      className="w-full min-h-[auto] bg-gray-900 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 flex flex-col gap-6"
      initial={{ opacity: 0, translateY: 50 }} // On-start: fade in and slide up
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Upper Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start py-4 w-full max-w-7xl mx-auto border-b-2 border-b-gray-600 gap-6 md:gap-8"
        ref={infoRef}
        initial={{ opacity: 0, translateY: 30 }}
        animate={isInfoVisible ? { opacity: 1, translateY: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Benton Info and Form */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <motion.h1
            className="text-white text-2xl sm:text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, translateX: -30 }}
            animate={isInfoVisible ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            BlueDrop
          </motion.h1>
          <motion.p
            className="text-white text-sm sm:text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, translateX: -30 }}
            animate={isInfoVisible ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Delivers water tracking platform 
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInfoVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <TextField
              placeholder="Your Email Address"
              variant="outlined"
              InputProps={{
                style: { color: 'white', fontSize: '0.875rem' }, // Responsive text size
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                  width: { xs: '100%', sm: '70%' }, // Responsive width
                },
                input: { color: 'white' },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#10b981', // emerald-500
                color: 'white',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Responsive font size
                textTransform: 'none',
                '&:hover': { backgroundColor: '#059669' }, // emerald-600
                padding: { xs: '8px 16px', sm: '10px 20px' },
              }}
            >
              Subscribe
            </Button>
          </motion.div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 w-full md:w-1/4">
          <motion.h1
            className="text-white text-lg sm:text-xl md:text-2xl font-semibold"
            initial={{ opacity: 0, translateX: 30 }}
            animate={isInfoVisible ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Quick Links
          </motion.h1>
          <div className="flex flex-col gap-2 text-white text-sm sm:text-base">
            {navLinks.map((link, index) => (
              <motion.p
                key={index}
                className="hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
                initial={{ opacity: 0, translateX: 30 }}
                animate={isInfoVisible ? { opacity: 1, translateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                {link}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-4 w-full md:w-1/4" ref={linksRef}>
          <motion.h1
            className="text-white text-lg sm:text-xl md:text-2xl font-semibold"
            initial={{ opacity: 0, translateX: 30 }}
            animate={isLinksVisible ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Support
          </motion.h1>
          <div className="flex flex-col gap-2 text-white text-sm sm:text-base">
            {supportLinks.map((link, index) => (
              <motion.p
                key={index}
                className="hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
                initial={{ opacity: 0, translateX: 30 }}
                animate={isLinksVisible ? { opacity: 1, translateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                {link}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lower Section */}
      <motion.div
        className="w-fit mx-auto text-center"
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <p className="text-white text-sm sm:text-base">
          @Team <span className="text-emerald-400">Sabers</span>
        </p>
      </motion.div>
    </motion.section>
  );
};

export default Footer;