import closeIcon from "@/assets/icons/closeIcon.svg";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAnimate, usePresence } from "framer-motion";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import styles from "./Window.module.scss";

type WindowProps = {
  id: string;
  title: string;
  body: ReactNode;
  styles: any;
  size: any;
  handleCloseWindow: any;
  setWindowActive: any;
  handleMinimizeWindow: any;
};

export default function Window({
  id,
  title,
  body,
  size,
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
  }, [isPresent, animate, safeToRemove, scope]);

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
      <div ref={scope} className={styles.window} style={{
        width: size.width,
        height: size.height,
      }}>
        <div className={styles.windowTitleBar} {...listeners} {...attributes}>
          <div className={styles.windowTitle}>{title.toUpperCase()}</div>
          <div className={styles.windowControls} data-no-dnd={true}>
            {/* <button
              className={styles.windowControl}
              onClick={(e) => handleMinimizeWindow(e, id)}
            >
              <FontAwesomeIcon icon={faWindowMinimize} />
            </button>
            <button className={styles.windowControl}>
              <FontAwesomeIcon icon={faWindowMaximize} />
            </button> */}
            <button
              className={styles.windowControl}
              onClick={(e) => handleCloseWindow(e, id)}>
              <Image src={closeIcon} alt="Close window" className={styles.windowControlIcon}/>
            </button>
          </div>
        </div>
        <div className={styles.windowContent}>
          <div className={styles.windowContentInner}>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
