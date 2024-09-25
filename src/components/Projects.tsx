import styles from "@/components/Projects.module.scss";
import {
  motion,
  useScroll,
  useTransform
} from "framer-motion";
import React, { useState } from "react";

export default function Projects({ children, targetRef }: any) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "start start"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const scale = useTransform(scrollYProgress, [0.5, 1], ["40%", "100%"], {
    // ease: easeIn,
  });
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    ["-150%", "20%", "20%", "0%"],
    {
      // ease: easeIn,
    }
  );
  const y = useTransform(scrollYProgress, [0.5, 1], ["10%", "0%"], {
    // ease: easeIn,
  });

  return (
    <motion.div className={styles.projectContainer} style={{ scale, x, y }}>
      {React.Children.map(children, (child: any, index: number) => (
        <motion.div
          key={index}
          style={
            activeIndex === index
              ? {
                  transition: "all 0.5s",
                }
              : {
                  transition: "all 0.5s",
                  filter: "brightness(0.5)",
                 }
          }
          onMouseOver={() => setActiveIndex(index)}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
