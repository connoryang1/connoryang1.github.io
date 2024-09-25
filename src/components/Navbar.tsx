import {
  faHome,
  faInfoCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import styles from "./Navbar.module.scss";
import VerticalSeperator from "./VerticalSeperator";

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

  return (
    <motion.div
      className={styles.navbar}
      style={{ backgroundColor, width, color }}
    >
      <ul className={styles.navItems}>
        <li>
          <a href="/about">
            <FontAwesomeIcon icon={faInfoCircle} className={styles.navIcon} />
          </a>
        </li>
        <VerticalSeperator />
        <li>
          <a href="/">
            <FontAwesomeIcon icon={faHome} className={styles.navIcon} />
          </a>
        </li>
        <li onClick={() => props.generateRandomWindow()}>
          <FontAwesomeIcon icon={faPlus} className={styles.navIcon} />
        </li>

        {showMinimized && minimizedWindows.length > 0 && <VerticalSeperator />}

        {showMinimized &&
          minimizedWindows.map((window: any) => (
            <li
              key={window.id}
              onClick={() => props.setWindowActive(window.id)}
            >
              <FontAwesomeIcon icon={window.icon} className={styles.navIcon} />
            </li>
          ))}
      </ul>
    </motion.div>
  );
}
