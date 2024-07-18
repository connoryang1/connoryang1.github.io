"use client";

import styles from "./page.module.scss";

import { DndContext, useSensor } from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

import Navbar from "@/components/Navbar";
import Window from "@/components/Window";
import Desktop from "@/components/Desktop";
import { MouseSensor, TouchSensor } from "@/app/sensors/Sensor";
import { useEffect, useState } from "react";

const windowData = [
  {
    id: "1",
    title: "Window 1",
    position: { x: 0, y: 0 },
    active: true,
    minimized: false,
  },
  {
    id: "2",
    title: "Window 2",
    position: { x: 200, y: 200 },
    active: false,
    minimized: false,
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
        modifiers={[restrictToParentElement]}
        sensors={[mouseSensor, touchSensor]}
      >
        <Desktop>
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
        </Desktop>
      </DndContext>
      <Navbar
        generateNewWindow={generateNewWindow}
        setWindowActive={setWindowActive}
        minimizedWindows={windows.filter((window) => window.minimized)}
      />
      <div style={{ height: "100rem" }}></div>
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
    const window = windows.find((window) => window.id === id);

    if (!window) return;

    const _windows = windows.filter((window) => window.id !== id);

    _windows.push({
      ...window,
      active: true,
      minimized: false,
    });

    setWindows(_windows);
  }

  function generateNewWindow() {
    const sortedWindows = windows.sort(
      (a, b) => parseInt(a.id) - parseInt(b.id)
    );

    let id = String(sortedWindows.length + 1);

    for (let i = 0; i < sortedWindows.length; i++) {
      if (sortedWindows[i].id != String(i + 1)) {
        id = String(i + 1);
        break;
      }
    }

    const randX = Math.floor(Math.random() * 1000);
    const randY = Math.floor(Math.random() * 500);
    const _windows = [
      ...windows,
      {
        id: id,
        title: "Window " + id,
        position: { x: randX, y: randY },
        active: true,
        minimized: false,
      },
    ];
    setWindows(_windows);
  }

  function minimizeWindow(event: any, id: string) {
    event.stopPropagation();

    const _windows = windows.map((window) => {
      if (window.id === id) {
        return { ...window, minimized: true };
      }
      return window;
    });
    console.log(_windows);

    setWindows(_windows);
  }
}
