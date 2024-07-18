"use client";

import styles from "./page.module.scss";

import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import Navbar from "@/components/Navbar";
import Window from "@/components/Window";
import Desktop from "@/components/Desktop";
import { useState } from "react";

const windowData = [
  {
    id: "1",
    title: "Window 1",
    position: { x: 0, y: 0 },
  },
];

export default function Home() {
  const [windows, setWindows] = useState(windowData);

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
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
              }}
            />
          ))}
        </Desktop>
      </DndContext>
      <Navbar />
      <div style={{ height: "1000rem" }}></div>
    </>
  );

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
}
