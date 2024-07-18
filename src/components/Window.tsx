import styles from "./Window.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "re-resizable";

type WindowProps = {
  id: string;
  title: string;
  styles: any;
  closeWindow: any;
  setWindowActive: any;
};

export default function Window({
  id,
  title,
  styles: dragStyles,
  closeWindow,
  setWindowActive,
}: WindowProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  function maximizeWindow(event: any) {
    event.preventDefault();

    const window =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    console.log(window);
    window.style.height = "80%";
    window.style.width = "100%";
    window.style.top = 0;
  }

  return (
    <Resizable
      className={styles.window}
      style={{ ...style, ...dragStyles }}
      defaultSize={{
        width: 320,
        height: 200,
      }}
    >
      <div ref={setNodeRef} onClick={() => setWindowActive(id)}>
        <div className={styles.windowTitleBar} {...listeners} {...attributes}>
          <div className={styles.windowTitle}>{title}</div>
          <div className={styles.windowControls} data-no-dnd={true}>
            <button className={styles.windowControl}>
              <FontAwesomeIcon icon={faWindowMinimize} />
            </button>
            <button className={styles.windowControl} onClick={maximizeWindow}>
              <FontAwesomeIcon icon={faWindowMaximize} />
            </button>
            <button
              className={styles.windowControl}
              onClick={(event) => closeWindow(event, id)}
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
    </Resizable>
  );
}
