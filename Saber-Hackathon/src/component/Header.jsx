import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, TextField, Typography, Box, Divider } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose }) => {
  // State for water tracker inputs
  const [waterUsage, setWaterUsage] = useState({
    drinking: '',
    showering: '',
    other: '',
  });
  const [totalUsage, setTotalUsage] = useState(0);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWaterUsage((prev) => ({
      ...prev,
      [name]: value.replace(/[^0-9]/g, ''), // Allow only numbers
    }));
  };

  // Calculate total usage
  useEffect(() => {
    const total =
      (parseFloat(waterUsage.drinking) || 0) +
      (parseFloat(waterUsage.showering) || 0) +
      (parseFloat(waterUsage.other) || 0);
    setTotalUsage(total.toFixed(2));
  }, [waterUsage]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Check if modal div exists
  const modalRoot = document.getElementById('modal');
  if (!modalRoot) {
    console.error('Modal root element with id="modal" not found');
    return null;
  }

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md mx-auto relative"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography id="modal-title" variant="h5" sx={{ color: '#1e3a8a', mb: 2, fontWeight: 'bold', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Water Usage Tracker
          </Typography>
          <Typography variant="body2" sx={{ color: '#4b5563', mb: 3, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Log your daily water usage to help conserve water and combat the global water crisis.
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Drinking (liters)"
              name="drinking"
              value={waterUsage.drinking}
              onChange={handleInputChange}
              type="number"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Showering (liters)"
              name="showering"
              value={waterUsage.showering}
              onChange={handleInputChange}
              type="number"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Other Uses (liters)"
              name="other"
              value={waterUsage.other}
              onChange={handleInputChange}
              type="number"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              inputProps={{ min: 0 }}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" sx={{ color: '#1e3a8a', fontWeight: 'medium', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Total Water Usage: {totalUsage} liters
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: totalUsage > 100 ? '#dc2626' : '#059669', mb: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {totalUsage > 100
                ? 'High usage! Consider reducing water consumption to help conserve resources.'
                : 'Great job! Keep conserving water to support sustainable communities.'}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' }, width: { xs: '100%', sm: 'auto' } }}
                onClick={() => setWaterUsage({ drinking: '', showering: '', other: '' })}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#059669',
                  color: '#059669',
                  '&:hover': { borderColor: '#047857', backgroundColor: '#f0f0f0' },
                  width: { xs: '100%', sm: 'auto' },
                }}
                onClick={onClose}
              >
                Close
              </Button>
            </Box>
          </Box>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-[15vmin] my-3 justify-between items-center gap-2 py-2 px-4 max-w-[95vw] sm:max-w-[90vw] rounded-2xl mx-auto w-full bg-black text-white">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="flex justify-between gap-2 items-center text-white">
        <h1 className="text-lg sm:text-2xl flex items-center">
          <AcUnitIcon sx={{ fontSize: { xs: '5vmin', sm: '7vmin' } }} className="text-emerald-500" /> BlueDrop
        </h1>
      </div>
      <div className="hidden md:flex justify-between gap-4 items-center">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
        >
          About
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
        >
          Gallery
        </NavLink>
        <NavLink
          to="/tips"
          className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
        >
          Tips
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
        >
          Contact
        </NavLink>
      </div>
      <Button
        className="md:hidden"
        variant="contained"
        sx={{ height: 40, backgroundColor: 'white', color: '#059669', '&:hover': { backgroundColor: '#f0f0f0' }, minWidth: '40px' }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </Button>
      <Button
        className="hidden md:block"
        variant="contained"
        sx={{ height: 40, backgroundColor: 'white', color: '#059669', '&:hover': { backgroundColor: '#f0f0f0' } }}
        onClick={() => setIsModalOpen(true)}
      >
        Tracker
      </Button>
      {isMenuOpen && (
        <div className="absolute top-[12vmin] right-4 bg-black rounded-lg p-4 flex flex-col gap-2 md:hidden z-50">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/tips"
            className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
            onClick={() => setIsMenuOpen(false)}
          >
            Tips
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'text-emerald-400' : '') + ' duration-700 hover:text-emerald-400'}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'white', color: '#059669', '&:hover': { backgroundColor: '#f0f0f0' }, width: '100%' }}
            onClick={() => {
              setIsModalOpen(true);
              setIsMenuOpen(false);
            }}
          >
            Tracker
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;