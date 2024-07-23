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

type DesktopProps = {
  windows: any[];
  setWindows: any;
  setWindowActive: any;
  targetRef: any;
};

const iconData = [
  {
    id: "icon-1",
    title: "Icon",
    position: { x: 100, y: 100 },
  },
];

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
    console.log(scrollYProgress.get());
    if (scrollYProgress.get() < 0.8) {
      setCanInteract(false);
    } else {
      setCanInteract(true);
    }
  });

  function handleDragStart(event: any) {
    setWindowActive(event.active.id);
  }

  function handleDragEnd(event: any) {
    const window = windows.find((window) => window.id === event.active.id);
    const icon = icons.find((icon) => icon.id === event.active.id);

    if (!(event.over && event.over.id == "desktop")) return;

    if (window) {
      console.log("WINDOW: ", event.delta);
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
      console.log("ICON: ", event.delta);
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

    console.log(window ? window : icon);
  }

  function closeWindow(event: any, id: string) {
    event.stopPropagation();
    const _windows = windows.filter((window) => window.id !== id);
    setWindows(_windows);
  }

  function minimizeWindow(id: string) {
    const _windows = windows.map((window) => {
      if (window.id === id) {
        return { ...window, minimized: true };
      }
      return window;
    });

    setWindows(_windows);
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
        <Background>
          <AnimatePresence>
            {icons.map((icon) => (
              <DesktopIcon
                key={icon.id}
                id={icon.id}
                title={icon.title}
                dragStyles={{
                  position: "absolute",
                  top: icon.position.y,
                  left: icon.position.x,
                }}
              />
            ))}
            {windows
              .filter((window) => !window.minimized)
              .map((window) => (
                <Window
                  key={window.id}
                  id={window.id}
                  title={window.title}
                  styles={{
                    position: "absolute",
                    top: window.position.y,
                    left: window.position.x,
                    zIndex: window.active ? 1 : 0,
                  }}
                  closeWindow={closeWindow}
                  setWindowActive={setWindowActive}
                  minimizeWindow={minimizeWindow}
                />
              ))}
          </AnimatePresence>
        </Background>
      </DndContext>
    </motion.div>
  );
}
