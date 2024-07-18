import { useDroppable } from "@dnd-kit/core";
import styles from "./Desktop.module.scss";

export default function Desktop(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "desktop",
  });

  return (
    <div ref={setNodeRef} className={styles.desktop}>
      {props.children}
    </div>
  );
}
