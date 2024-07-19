import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faHome,
  faInfoCircle,
  faPlus,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import VerticalSeperator from "./VerticalSeperator";

export default function Navbar(props: any) {
  return (
    <nav className={styles.navbar}>
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
        {props.minimizedWindows.length > 0 && <VerticalSeperator />}

        {props.minimizedWindows.map((window: any) => (
          <li key={window.id} onClick={() => props.setWindowActive(window.id)}>
            <FontAwesomeIcon
              icon={faWindowMinimize}
              className={styles.navIcon}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
