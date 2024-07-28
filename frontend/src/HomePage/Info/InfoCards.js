import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
// import PurpleCard from './PurpleCard';

const rotateAnimation = {
  rotate: [0, 10, -10, 0],
  opacity: [1, 0.7, 1],
  transition: {
    duration: 2, // Duration of one complete loop
    repeat: Infinity, // Repeat animation infinitely
    repeatType: 'loop', // Type of repeat
    ease: 'easeInOut', // Easing function
  },
};

const InfoCards = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ padding: '0 5%' }}>
      <motion.h1
        style={{
          fontSize: '4vw',
          fontFamily: 'Adamina, serif',
          fontWeight: 'initial',
          marginTop: '5vw',
        }}>
        <motion.span
          style={{ display: 'inline-block' }}
          animate={rotateAnimation}
          transition={{ duration: 2, ease: 'easeInOut', loop: Infinity }}>
          Lightweight design, ready to use for{' '}
          <span style={{ color: '#FFE0E5' }}>business productivity</span>.
        </motion.span>
      </motion.h1>
      <motion.div
        style={{
          marginTop: '5vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2vw',
          flexWrap: 'wrap',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <Card
          bgColour="#FFF7ED"
          //   file="file-sharing.png"
          text="File Sharing"
          para="Securely share files within or outside your organization."
        />
        <Card
          bgColour="#E0F7FA"
          //   file="file-request.png"
          text="Collect Files"
          para="You can collect and receive files in a secure environment."
        />
      </motion.div>
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}>
        <div
          style={{
            height: '50vw',
            width: '80vw',
            backgroundColor: '#ECECFE',
            marginTop: '5vw',
            borderRadius: '24px',
          }}>
          {/* <PurpleCard /> */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InfoCards;
