import { useDroppable } from "@dnd-kit/core";
import styles from "./DesktopBackground.module.scss";

export default function DesktopBackground(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "desktop",
  });

  return (
    <div ref={setNodeRef} className={styles.desktop}>
      {/* <img src={keyboards.src} className={styles.image} /> */}
      <div className={styles.background}></div>
      {props.children}
    </div>
  );
}
