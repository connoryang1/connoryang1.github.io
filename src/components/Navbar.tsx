import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faPlus,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import VerticalSeperator from "./VerticalSeperator";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";

export default function Navbar(props: any) {
  const { scrollYProgress } = useScroll({
    target: props.targetRef,
    offset: ["end center", "end end"],
  });

  const [showMinimized, setShowMinimized] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", () => {
    console.log(scrollYProgress.get());
    if (scrollYProgress.get() < 0.8) {
      setShowMinimized(false);
    } else {
      setShowMinimized(true);
    }
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.9],
    ["#242b38", "#ffffff"]
  );

  const color = useTransform(scrollYProgress, [0, 0.9], ["#ffffff", "#242b38"]);

  const numItems = 4 + props.minimizedWindows.length;
  const navWidth = numItems * 2.5 * 2 - 2.5;

  const width = useTransform(
    scrollYProgress,
    [0.5, 0.9],
    ["90vw", `${navWidth}vw`]
  );

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
        <li onClick={() => props.generateNewWindow()}>
          <FontAwesomeIcon icon={faPlus} className={styles.navIcon} />
        </li>

        {showMinimized && props.minimizedWindows.length > 0 && (
          <VerticalSeperator />
        )}

        {showMinimized &&
          props.minimizedWindows.map((window: any) => (
            <li
              key={window.id}
              onClick={() => props.setWindowActive(window.id)}
            >
              <FontAwesomeIcon
                icon={faWindowMinimize}
                className={styles.navIcon}
              />
            </li>
          ))}
      </ul>
    </motion.div>
  );
}
