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

type DesktopProps = {
  windows: any[];
  setWindows: any;
  setWindowActive: any;
};

export default function Desktop({
  windows,
  setWindows,
  setWindowActive,
}: DesktopProps) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end center", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [500, 0]);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  function handleDragStart(event: any) {
    setWindowActive(event.active.id);
  }

  function handleDragEnd(event: any) {
    const window = windows.find((window) => window.id === event.active.id);

    if (!window || !(event.over && event.over.id == "desktop")) return;

    window.position.x += event.delta.x;
    window.position.y += event.delta.y;

    const _windows = windows.map((w) => {
      if (w.id === window.id) {
        return window;
      }
      return w;
    });

    setWindows(_windows);
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
    <motion.div ref={targetRef} style={{ scale, x, y }}>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
        sensors={[mouseSensor, touchSensor]}
        autoScroll={false}
      >
        <Background>
          <AnimatePresence>
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
