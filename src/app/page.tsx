"use client";
import styles from "./page.module.scss";
import { motion, useScroll } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div className={styles.main} />
      <div className={styles.placeholder} />
    </>
  );
}
