"use client";

import Navbar from "@/components/Navbar";
import { use, useEffect, useRef, useState } from "react";
import Desktop from "@/components/Desktop";
import Lenis from "lenis";
import keyboards from "@/assets/keyboards.jpeg";
import styles from "@/app/page.module.scss";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import DesktopIcon from "@/components/DesktopIcon";
import Loading from "@/components/Loading";

const windowData = [
  {
    id: "window-1",
    title: "Welcome",
    position: { x: 100, y: 100 },
    active: true,
    minimized: false,
  },
  {
    id: "window-2",
    title: "Window 2",
    position: { x: 400, y: 400 },
    active: false,
    minimized: false,
  },
];

export default function Home() {
  const [windows, setWindows] = useState(windowData);
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end center", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  const [loading, setLoading] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", () => {
    console.log(scrollYProgress.get());
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

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
      {loading ? (
        <Loading />
      ) : (
        <>
          <img src={keyboards.src} className={styles.backgroundImage} />
          <motion.div className={styles.header} style={{ opacity }}>
            Hello. My name is Connor.
          </motion.div>
          <Desktop
            windows={windows}
            setWindows={setWindows}
            setWindowActive={setWindowActive}
            targetRef={targetRef}
          />
          <Navbar
            generateNewWindow={generateNewWindow}
            setWindowActive={setWindowActive}
            minimizedWindows={windows.filter((window) => window.minimized)}
            targetRef={targetRef}
          />
          <div style={{ height: "30rem" }}></div>
        </>
      )}
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
    if (windows.length >= 10) {
      alert("You have reached the maximum number of windows.");
      return;
    }

    const sortedWindows = windows.sort(
      (a, b) => parseInt(a.id) - parseInt(b.id)
    );

    let id = String(sortedWindows.length + 1);

    for (let i = 0; i < sortedWindows.length; i++) {
      if (sortedWindows[i].id != "window-" + String(i + 1)) {
        id = String(i + 1);
        break;
      }
    }

    const randX = Math.floor(Math.random() * 400);
    const randY = Math.floor(Math.random() * 600);
    const _windows = [
      ...windows,
      {
        id: "window-" + id,
        title: "Window " + id,
        position: { x: randX, y: randY },
        active: true,
        minimized: false,
      },
    ];
    setWindows(_windows);
  }
}
