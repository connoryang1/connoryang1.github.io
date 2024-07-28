import styles from "@/components/Projects.module.scss";
import { easeIn, useScroll, useTransform, motion } from "framer-motion";

export default function Projects({ children, targetRef }: any) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], ["40%", "100%"], {
    ease: easeIn,
  });
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.7, 1],
    ["-132%", "20%", "20%", "0%"],
    {
      ease: easeIn,
    }
  );
  const y = useTransform(scrollYProgress, [0.5, 1], ["65%", "0%"], {
    ease: easeIn,
  });

  return (
    <motion.div
      ref={targetRef}
      className={styles.projectContainer}
      style={{ scale, x, y }}
    >
      {children}
    </motion.div>
  );
}
