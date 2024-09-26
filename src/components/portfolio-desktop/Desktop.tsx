
import { DndContext, useSensor } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import { MouseSensor, TouchSensor } from "@/app/sensors/Sensor";
import DesktopContent from "@/components/portfolio-desktop/DesktopContent";
import iconData from "@/data/iconData";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

type DesktopProps = {
  windows: any[];
  setWindows: any;
  setWindowActive: any;
  targetRef: any;
  homeScrollProgress: any;
};

export default function Desktop({
  windows,
  setWindows,
  setWindowActive,
  targetRef,
  homeScrollProgress
}: DesktopProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end center"],
  });

  const [canInteract, setCanInteract] = useState(true);
  const [icons, setIcons] = useState(iconData);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (homeScrollProgress.get() > 0.9) {
      setCanInteract(true);
    } else {
      setCanInteract(false);
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
      // ref={targetRef}
      style={{ pointerEvents: canInteract ? "auto" : "none" }}
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
