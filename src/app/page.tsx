"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Desktop from "@/components/Desktop";
import Lenis from "lenis";

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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  return (
    <>
      <Desktop
        windows={windows}
        setWindows={setWindows}
        setWindowActive={setWindowActive}
      />
      <Navbar
        generateNewWindow={generateNewWindow}
        setWindowActive={setWindowActive}
        minimizedWindows={windows.filter((window) => window.minimized)}
      />
      <div style={{ height: "100rem" }}></div>
    </>
  );

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
}
