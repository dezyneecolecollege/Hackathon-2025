// ```jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const Tips = () => {
  // State for reveal animations
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isTipsVisible, setIsTipsVisible] = useState([false, false, false]);
  // Refs for sections
  const headingRef = useRef(null);
  const tipRefs = useRef([useRef(null), useRef(null), useRef(null)]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headingRef.current && entry.isIntersecting) {
            setIsHeadingVisible(true);
            observer.unobserve(headingRef.current);
          }
          tipRefs.current.forEach((ref, index) => {
            if (entry.target === ref.current && entry.isIntersecting) {
              setIsTipsVisible((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
              observer.unobserve(ref.current);
            }
          });
        });
      },
      { threshold: 0.2 } // Trigger when 20% of element is visible
    );

    if (headingRef.current) observer.observe(headingRef.current);
    tipRefs.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const tips = [
    {
      title: 'Reduce Shower Time',
      description:
        'Cut your shower time by a few minutes to save gallons of water daily. Use a low-flow showerhead to maximize efficiency.',
      image: 'https://www.tolosauna.com/wp-content/uploads/2019/12/rain-shower-3-1.jpg',
    },
    {
      title: 'Fix Leaks Promptly',
      description:
        'A small leak can waste hundreds of liters monthly. Regularly check faucets and pipes to ensure every drop is conserved.',
      image: 'https://pugetsoundplumbing.com/wp-content/uploads/2018/06/Water-running-from-faucet.jpg',
    },
    {
      title: 'Use Efficient Appliances',
      description:
        'Choose water-efficient dishwashers and washing machines to reduce usage while maintaining performance for daily tasks.',
      image: 'https://tse1.mm.bing.net/th/id/OIP.fdBe_Lc0YlXy0JdZYl9_5QHaEH?r=0&w=900&h=500&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
  ];

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
          Core Water Conservation Tips
        </h1>
        <p className="mx-auto max-w-3xl text-center text-base sm:text-lg text-gray-600 mb-5">
          Discover practical ways to reduce water usage and contribute to a sustainable future with our actionable tips.
        </p>
      </motion.div>

      {/* Tips Container */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 mb-12">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            ref={tipRefs.current[index]}
            className="w-full p-4 h-auto min-h-[10rem] flex flex-col md:flex-row justify-between items-center gap-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, translateY: 50 }}
            animate={isTipsVisible[index] ? { opacity: 1, translateY: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div
              className={`w-full ${
                index % 2 === 0 ? 'md:w-[60%]' : 'md:w-[40%] order-last md:order-first'
              } p-4`}
            >
              <h2 className="my-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-900">
                {tip.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">{tip.description}</p>
            </div>
            <div
              className={`w-full ${
                index % 2 === 0 ? 'md:w-[40%]' : 'md:w-[60%]'
              } h-32 sm:h-40 bg-cover bg-center rounded-xl shadow-md hover:scale-105 transition-transform duration-300`}
              style={{ backgroundImage: `url("${tip.image}")` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Tips;