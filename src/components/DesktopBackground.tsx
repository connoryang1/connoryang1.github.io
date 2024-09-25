import bg from "@/assets/bg.png";
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import styles from "./DesktopBackground.module.scss";

export default function DesktopBackground(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "desktop",
  });

  return (
    <div ref={setNodeRef} className={styles.desktop}>
      <Image fill={true} src={bg.src} alt="Desktop background" className={styles.image} />
      {props.children}
    </div>
  );
}
