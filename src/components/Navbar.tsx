import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import styles from "./Navbar.module.scss";

export default function Navbar(props: any) {
  const { scrollYProgress } = useScroll({
    target: props.targetRef,
    offset: ["end end", "start start"],
  });

  const minimizedWindows = props.windows.filter(
    (window: any) => window.minimized
  );

  const openWindows = props.windows.filter((window: any) => !window.minimized);

  const [showMinimized, setShowMinimized] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (scrollYProgress.get() < 0.8) {
      setShowMinimized(false);
    } else {
      setShowMinimized(true);
    }
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.6, 0.7],
    ["#242b384b", "#ffffffaa"]
  );

  const color = useTransform(
    scrollYProgress,
    [0.6, 0.7],
    ["#ffffff", "#242b38"]
  );
  const width = useTransform(scrollYProgress, [0.6, 0.7], [`20vw`, "90vw"]);

  const opacity = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);

  return (
    <motion.div
      className={styles.navbar}
      style={{ opacity }}
    >
      <ol className={styles.navItems}>
        <li className={styles.navText}>Home</li>
        <li className={styles.navText}>About</li>
        <li className={styles.navText}>Resume</li>
      </ol>
    </motion.div>
  );
}
