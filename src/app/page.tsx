"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import Desktop from "@/components/Desktop";
import Lenis from "lenis";
import { ScrollerMotion } from "scroller-motion";
import keyboards from "@/assets/keyboards.jpeg";
import styles from "@/app/page.module.scss";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import Loading from "@/components/Loading";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

import windowData from "@/data/windowData";
import Projects from "@/components/Projects";
import DesktopBackground from "@/components/DesktopBackground";

export default function Home() {
  const [windows, setWindows] = useState(windowData);
  const [loading, setLoading] = useState(false);

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "start start"],
  });
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", () => {
    console.log(scrollYProgress.get());
  });

  const projects = [
    {
      title: "Project 1",
      technologies: ["React", "TypeScript", "Framer Motion"],
      component: (
        <Desktop
          windows={windows}
          setWindows={setWindows}
          setWindowActive={setWindowActive}
          targetRef={targetRef}
        />
      ),
    },
    {
      title: "Project 2",
      technologies: ["React", "TypeScript", "Framer Motion"],
      component: <DesktopBackground targetRef={targetRef} />,
    },
    {
      title: "Project 3",
      technologies: ["React", "TypeScript", "Framer Motion"],
      component: <DesktopBackground targetRef={targetRef} />,
    },
  ];

  return (
    <>
      <div className={styles.container} ref={targetRef}>
        <section
          style={{
            position: "sticky",
            height: "100vh",
            top: "0",
          }}
        >
          <motion.div className={styles.header} style={{ opacity }}>
            Featured Projects
          </motion.div>
          <Projects targetRef={targetRef}>
            <Desktop
              windows={windows}
              setWindows={setWindows}
              setWindowActive={setWindowActive}
              targetRef={targetRef}
            />
            <DesktopBackground targetRef={targetRef} />
            <DesktopBackground targetRef={targetRef} />
            <DesktopBackground targetRef={targetRef} />
            <DesktopBackground targetRef={targetRef} />
          </Projects>
        </section>
        <Navbar
          generateRandomWindow={generateRandomWindow}
          setWindowActive={setWindowActive}
          windows={windows}
          targetRef={targetRef}
        />
      </div>
      <div style={{ height: "200rem" }}></div>
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

  function generateRandomWindow() {
    if (windows.length >= 10) {
      alert("You have reached the maximum number of windows.");
      return;
    }

    let id;

    for (let i = 1; i < windows.length + 1; i++) {
      if (!windows.find((window) => window.id === "window-" + String(i))) {
        id = String(i);
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
        icon: faWindowRestore,
      },
    ];
    setWindows(_windows);
  }
}
