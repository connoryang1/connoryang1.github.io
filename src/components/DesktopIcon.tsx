import styles from "@/components/DesktopIcon.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAnimate, usePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

export default function DesktopIcon(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={styles.icon}
      ref={setNodeRef}
      style={{ ...style, ...props.dragStyles }}
      {...attributes}
      {...listeners}
    >
      <FontAwesomeIcon icon={faFile} />
      <p>{props.title}</p>
    </div>
  );
}
