"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const SmokeFadeIn = ({
  visibleOnLoad,
  children,
}: {
  visibleOnLoad: boolean;
  children: ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -200px 0px",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const smokeVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(5px)",
      transform: "translateY(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translateY(0px)",
      transition: {
        duration: 0.6,
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
        animate={
          visibleOnLoad && isMounted
            ? "visible"
            : isInView
            ? "visible"
            : "hidden"
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SmokeFadeIn;
