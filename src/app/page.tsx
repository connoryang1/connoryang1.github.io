"use client";

import styles from "./page.module.scss";

import { DndContext, useSensor } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import Navbar from "@/components/Navbar";
import Window from "@/components/Window";
import Desktop from "@/components/Desktop";
import { MouseSensor, TouchSensor } from "@/app/sensors/Sensor";
import { useState } from "react";

const windowData = [
  {
    id: "1",
    title: "Window 1",
    position: { x: 0, y: 0 },
    active: true,
  },
  {
    id: "2",
    title: "Window 2",
    position: { x: 200, y: 200 },
    active: false,
  },
];

export default function Home() {
  const [windows, setWindows] = useState(windowData);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
        sensors={[mouseSensor, touchSensor]}
      >
        <Desktop>
          {windows.map((window) => (
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
            />
          ))}
        </Desktop>
      </DndContext>
      <Navbar />
      {/* <div style={{ height: "1000rem" }}></div> */}
    </>
  );

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
    console.log("close window", id);
  }

  function setWindowActive(id: string) {
    const _windows = windows.map((window) => {
      if (window.id === id) {
        return { ...window, active: true };
      }
      return { ...window, active: false };
    });

    setWindows(_windows);
  }
}
