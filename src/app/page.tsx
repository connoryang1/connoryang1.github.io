"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import Desktop from "@/components/Desktop";
import Lenis from "lenis";
import { ScrollerMotion } from "scroller-motion";
import keyboards from "@/assets/keyboards.jpeg";
import styles from "@/app/page.module.scss";
import { useScroll, useTransform, motion } from "framer-motion";
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
    offset: ["end center", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 0.5,
  //   });

  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // });

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
    <ScrollerMotion
      spring={{
        mass: 10,
        damping: 500,
        stiffness: 3000,
      }}
    >
      <div className={styles.container}>
        <motion.div className={styles.header} style={{ opacity }}>
          Projects
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
        <Navbar
          generateRandomWindow={generateRandomWindow}
          setWindowActive={setWindowActive}
          windows={windows}
          targetRef={targetRef}
        />
      </div>
      <div style={{ height: "100rem" }}></div>
    </ScrollerMotion>
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
