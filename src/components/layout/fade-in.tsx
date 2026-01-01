"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function FadeIn({ children, delay = 0, direction = "up" }: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: directions[direction].y, 
        x: directions[direction].x 
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }} // 화면에 100px 정도 들어왔을 때 실행
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // 부드러운 가속도 곡선
      }}
    >
      {children}
    </motion.div>
  );
}