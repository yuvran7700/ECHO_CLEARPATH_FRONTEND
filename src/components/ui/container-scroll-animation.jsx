"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 1] : [1.08, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      ref={containerRef}
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1600px", // ✅ stronger depth
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 40px 100px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
      className="
        relative
        max-w-5xl 
        -mt-12 
        mx-auto 
        h-[30rem] md:h-[40rem] 
        w-full 
        border border-white/10 
        bg-white/5 backdrop-blur-xl 
        rounded-[30px]
      "
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent rounded-[30px]" />

      <div className="h-full w-full p-[2px] rounded-[28px] bg-black/5">
        <div className="h-full w-full overflow-hidden rounded-[26px] bg-white">
          {children}
        </div>
      </div>
    </motion.div>
  );
};