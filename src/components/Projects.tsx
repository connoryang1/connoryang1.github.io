import styles from "@/components/Projects.module.scss";
import {
  easeIn,
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";

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

  useMotionValueEvent(scrollYProgress, "change", () => {
    const index = Math.max(
      0,
      Math.floor(((0.7 - scrollYProgress.get()) / 0.7) * 4)
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <motion.div className={styles.projectContainer} style={{ scale, x, y }}>
      {children.map((child: any, index: number) => (
        <motion.div
          style={
            activeIndex === index
              ? {
                  boxShadow: "0 0 50px 35px #a2d6f2",
                  zIndex: 1000,
                }
              : { filter: "blur(1px) brightness(80%)" }
          }
          onMouseOver={() => setActiveIndex(index)}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
