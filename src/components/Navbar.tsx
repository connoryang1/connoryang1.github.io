import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navItems}>
        <li>
          <a href="/">
            <FontAwesomeIcon icon={faHome} className={styles.navIcon} />
          </a>
        </li>
        <li>
          <a href="/about">
            <FontAwesomeIcon icon={faInfoCircle} className={styles.navIcon} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
