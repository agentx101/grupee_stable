import React from 'react';
import { motion } from "framer-motion";

interface ShimmerProps {
  width: string;
  height: string;
  borderRadius?: string;
}

const Shimmer = (props: ShimmerProps) => {
  const { width, height, borderRadius } = props;

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "pulse",
        bounce: 0,
        duration: 1.4,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5
      }}
      style={{
        backgroundColor: "#f4f7fa",
        width: width,
        height: height,
        borderRadius: borderRadius || "4px"
      }}
    />
  )
}

export default Shimmer;