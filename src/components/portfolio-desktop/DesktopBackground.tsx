import bg from "@/assets/bg.png";
import styles from "@/components/portfolio-desktop/DesktopBackground.module.scss";
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";

export default function DesktopBackground(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: "desktop",
  });

  return (
    <div ref={setNodeRef} className={styles.desktop} onClick={props.onClick}>
      <Image fill={true} src={bg.src} alt="Desktop background" className={styles.image} />
      {props.children}
    </div>
  );
}
