import styles from "./Window.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAnimate, usePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

type WindowProps = {
  id: string;
  title: string;
  styles: any;
  handleCloseWindow: any;
  setWindowActive: any;
  handleMinimizeWindow: any;
};

export default function Window({
  id,
  title,
  styles: dragStyles,
  handleCloseWindow,
  setWindowActive,
  handleMinimizeWindow: minimizeWindow,
}: WindowProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        if (scope.current === null) {
          return;
        }

        await animate(
          scope.current,
          {
            opacity: 1,
            // height: "20rem",
          },
          { duration: 1, ease: "anticipate" }
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          // { opacity: 0, height: 0 },
          { opacity: 0 },
          { duration: 0.5 }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  function handleMinimizeWindow(e: any, id: string) {
    e.preventDefault();
    e.stopPropagation();

    minimizeWindow(id);
  }

  return (
    <div
      ref={setNodeRef}
      onClick={() => setWindowActive(id)}
      style={{ ...style, ...dragStyles }}
    >
      <div ref={scope} className={styles.window}>
        <div className={styles.windowTitleBar} {...listeners} {...attributes}>
          <div className={styles.windowTitle}>{title}</div>
          <div className={styles.windowControls} data-no-dnd={true}>
            <button
              className={styles.windowControl}
              onClick={(e) => handleMinimizeWindow(e, id)}
            >
              <FontAwesomeIcon icon={faWindowMinimize} />
            </button>
            <button className={styles.windowControl}>
              <FontAwesomeIcon icon={faWindowMaximize} />
            </button>
            <button
              className={styles.windowControl}
              onClick={(e) => handleCloseWindow(e, id)}
            >
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
          </div>
        </div>
        <div className={styles.windowContent}>
          <div className={styles.windowContentInner}>
            <p>
              This is a window. It has a title bar, controls, and content. It
              can be moved around, resized, and closed. It's a window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
