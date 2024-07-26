import styles from "./page.module.scss";

import { DndContext, useSensor } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import Window from "@/components/Window";
import Background from "@/components/Background";
import { MouseSensor, TouchSensor } from "@/app/sensors/Sensor";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import DesktopIcon from "./DesktopIcon";
import iconData from "@/data/iconData";
import DesktopContent from "./DesktopContent";

type DesktopProps = {
  windows: any[];
  setWindows: any;
  setWindowActive: any;
  targetRef: any;
};

export default function Desktop({
  windows,
  setWindows,
  setWindowActive,
  targetRef,
}: DesktopProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end center", "end end"],
  });

  const [canInteract, setCanInteract] = useState(true);
  const [icons, setIcons] = useState(iconData);

  const scale = useTransform(scrollYProgress, [0, 0.9], ["40%", "100%"]);
  const x = useTransform(scrollYProgress, [0, 0.9], ["20%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 0.9], ["60%", "0%"]);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (scrollYProgress.get() < 0.8) {
      setCanInteract(false);
    } else {
      setCanInteract(true);
    }
  });

  function handleDragStart(event: any) {
    setWindowActive(event.active.id);

    const icon = icons.find((icon) => icon.id === event.active.id);

    if (icon) {
      const _icons = icons.map((i) => {
        if (i.id === icon.id) {
          return { ...icon, selected: true };
        }
        return { ...i, selected: false };
      });

      setIcons(_icons);
    }
  }

  function handleDragEnd(event: any) {
    const window = windows.find((window) => window.id === event.active.id);
    const icon = icons.find((icon) => icon.id === event.active.id);

    if (!(event.over && event.over.id == "desktop")) return;

    if (window) {
      window.position.x += event.delta.x;
      window.position.y += event.delta.y;

      const _windows = windows.map((w) => {
        if (w.id === window.id) {
          return window;
        }
        return w;
      });

      setWindows(_windows);
    } else if (icon) {
      icon.position.x += event.delta.x;
      icon.position.y += event.delta.y;

      const _icons = icons.map((i) => {
        if (i.id === icon.id) {
          return icon;
        }
        return i;
      });

      setIcons(_icons);
    } else {
      alert("No window or icon found");
    }
  }

  return (
    <motion.div
      ref={targetRef}
      style={{ scale, x, y, pointerEvents: canInteract ? "auto" : "none" }}
    >
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
        sensors={[mouseSensor, touchSensor]}
        autoScroll={false}
      >
        <DesktopContent
          setWindowActive={setWindowActive}
          windows={windows}
          setWindows={setWindows}
          icons={icons}
          setIcons={setIcons}
        />
      </DndContext>
    </motion.div>
  );
}
