import { useDroppable } from "@dnd-kit/core";
import styles from "./Desktop.module.scss";
import keyboards from "@/assets/keyboards.jpeg";

export default function Desktop(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "desktop",
  });

  return (
    <div ref={setNodeRef} className={styles.desktop}>
      {/* <img src={keyboards.src} className={styles.image} /> */}
      {props.children}
    </div>
  );
}
