// ```jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Typography, Box } from '@mui/material';

const Contact = () => {
  // State for reveal animations
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  // Refs for sections
  const headingRef = useRef(null);
  const formRef = useRef(null);
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headingRef.current && entry.isIntersecting) {
            setIsHeadingVisible(true);
            observer.unobserve(headingRef.current);
          }
          if (entry.target === formRef.current && entry.isIntersecting) {
            setIsFormVisible(true);
            observer.unobserve(formRef.current);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of element is visible
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with API call if needed)
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000); // Reset message after 3s
  };

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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-blue-900 mb-5">
          Get in Touch
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold text-emerald-700 mb-5">
          About Water Conservation
        </h1>
      </motion.div>

      {/* Contact Form Container */}
      <motion.div
        ref={formRef}
        className="w-full max-w-3xl mx-auto p-6 flex flex-col gap-6 mb-12 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, translateY: 50 }}
        animate={isFormVisible ? { opacity: 1, translateY: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {submitted ? (
          <Typography
            variant="h6"
            sx={{ color: '#059669', textAlign: 'center', mb: 4 }}
          >
            Thank you for your message! We'll get back to you soon.
          </Typography>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              fullWidth
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              fullWidth
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#059669',
                '&:hover': { backgroundColor: '#047857' },
                borderRadius: '8px',
                paddingY: 1.5,
              }}
            >
              Send Message
            </Button>
          </Box>
        )}
      </motion.div>
    </section>
  );
};

export default Contact;