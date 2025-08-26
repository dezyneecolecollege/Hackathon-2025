// ```jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  // State for reveal animations
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isTopSectionVisible, setIsTopSectionVisible] = useState(false);
  const [isBottomSectionVisible, setIsBottomSectionVisible] = useState(false);
  // Refs for sections
  const headingRef = useRef(null);
  const topSectionRef = useRef(null);
  const bottomSectionRef = useRef(null);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headingRef.current && entry.isIntersecting) {
            setIsHeadingVisible(true);
            observer.unobserve(headingRef.current);
          }
          if (entry.target === topSectionRef.current && entry.isIntersecting) {
            setIsTopSectionVisible(true);
            observer.unobserve(topSectionRef.current);
          }
          if (entry.target === bottomSectionRef.current && entry.isIntersecting) {
            setIsBottomSectionVisible(true);
            observer.unobserve(bottomSectionRef.current);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of element is visible
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (topSectionRef.current) observer.observe(topSectionRef.current);
    if (bottomSectionRef.current) observer.observe(bottomSectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Heading Section */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, translateY: 50 }}
        animate={isHeadingVisible ? { opacity: 1, translateY: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-blue-900 mb-7">
          Innovative Water Solutions
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-emerald-700 mb-5">
          For a Sustainable Future
        </h1>
      </motion.div>

      {/* Gallery Container */}
      <motion.div
        className="flex flex-col justify-between p-4 w-full max-w-5xl mx-auto rounded-xl mb-12"
        initial={{ opacity: 0 }}
        animate={isTopSectionVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Top Section: Text and Image */}
        <div
          className="flex flex-col md:flex-row justify-between p-4 h-auto min-h-[12rem] gap-4 rounded-xl " 
          ref={topSectionRef}
        >
          <motion.div
            className="flex flex-col px-6 w-full md:w-[50%] shadow-md bg-white rounded-xl py-4"
            initial={{ opacity: 0, translateX: -50 }}
            animate={isTopSectionVisible ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="my-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-900">
              Water Purification
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Our advanced filtration systems remove contaminants, ensuring safe drinking water for communities worldwide.
            </p>
            <h2 className="my-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-900">
              Smart Monitoring
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Real-time sensors track water quality and usage, empowering users to make data-driven conservation decisions.
            </p>
            <h2 className="my-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-900">
              Conservation Tools
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              AI-driven analytics optimize water distribution, reducing waste and promoting equitable access.
            </p>
          </motion.div>
          <motion.div
            className="w-full md:w-[50%] bg-cover bg-center rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url("https://5.imimg.com/data5/RT/UJ/MY-5455890/real-time-water-quality-monitoring-system--500x500.jpg")`,
            }}
            initial={{ opacity: 0, translateX: 50 }}
            animate={isTopSectionVisible ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Bottom Section: Image Gallery */}
        <div
          className="flex flex-col sm:flex-row justify-around p-4 h-[20vmin] sm:h-[50vmin] gap-4 rounded-xl"
          ref={bottomSectionRef}
        >
          <motion.div
            className="w-full sm:w-[33%] bg-cover  bg-center rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url("https://tse2.mm.bing.net/th/id/OIP.DGH1f8k2fJ3DHhBk3TnA7AHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3")`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isBottomSectionVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="w-full sm:w-[33%] bg-cover bg-center rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url("https://th.bing.com/th/id/R.1cbd2e63e265c6343de8b19c08b640de?rik=sQYUMo04skhv4g&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f04%2fNature-Water-Wallpapers-Desktop-download.jpg&ehk=AQf%2bX%2bpslN4pvCpGHvybOW0CgyFpq7Ur%2bvp2HaQmW9c%3d&risl=&pid=ImgRaw&r=0")`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isBottomSectionVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.div
            className="w-full sm:w-[33%] bg-cover bg-center rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url("https://tse4.mm.bing.net/th/id/OIP.d8ppNfHucFcvb69ZVail8AHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3")`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isBottomSectionVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Gallery;