import styles from "@/components/DesktopIcon.module.scss";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Image from 'next/image';

export default function DesktopIcon(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  function handleClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (props.selected) {
      props.handleOpenWindow(props.id);
    }
  }

  return (
    <div
      onDoubleClick={(e) => handleClick(e)}
      className={
        styles.iconContainer + " " + (props.selected ? styles.selected : "")
      }
      ref={setNodeRef}
      style={{ ...style, ...props.dragStyles }}
      {...attributes}
      {...listeners}>
        <Image src={props.icon} alt="icon" className={styles.icon} />
      <p className={styles.iconText}>{props.title}</p>
    </div>
  );
}
