"use client";
import React, { ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const SmokeFadeIn = ({ children }: { children: ReactNode }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -200px 0px",
  });

  const smokeVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      transform: "translateY(20px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translateY(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing function
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        variants={smokeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SmokeFadeIn;
