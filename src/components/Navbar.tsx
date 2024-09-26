import {
  motion,
  useScroll,
  useTransform
} from "framer-motion";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar(props: any) {
  const { scrollYProgress } = useScroll({
    target: props.targetRef,
    offset: ["end end", "start start"],
  });

  const opacity = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);

  return (
    <motion.div
      className={styles.navbar}
      style={{ opacity }}
    >
      <ol className={styles.navItems}>
        <li>
          <Link className={styles.navText} href="/">Connor Yang</Link>
        </li>
        <li>
          <Link className={styles.navText} href="/about">About</Link>
        </li>
        <li>
          <Link className={styles.navText} href="/projects">Projects</Link>
        </li>
      </ol>
    </motion.div>
  );
}
