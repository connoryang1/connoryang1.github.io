"use client";

import styles from "@/app/page.module.scss";
import Desktop from "@/components/Desktop";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import { motion as motion3d } from "framer-motion-3d";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

import DesktopBackground from "@/components/DesktopBackground";
import Projects from "@/components/Projects";
import windowData from "@/data/windowData";

export default function Home() {
  const [windows, setWindows] = useState(windowData);
  const [loading, setLoading] = useState(true);

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "start start"],
  });
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", () => {
    console.log(scrollYProgress.get());
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);



  return (
    <>
      <div className={`${styles.loadingScreen} ${!loading ? styles.hidden : ''}`}>
        <motion.div
          className={styles.loadingText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Almost there...
        </motion.div>
      </div>
      <div style={{
        display: loading ? "none" : "block",
      }}>
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
          {/* <Navbar
            generateRandomWindow={generateRandomWindow}
            setWindowActive={setWindowActive}
            windows={windows}
            targetRef={targetRef}
          /> */}
        </div>
        <div className={styles.header}>Work Experience</div>
        <div style={{ height: "20rem" }}></div>
        <div className={styles.header}>Education</div>

        <div style={{ height: "200rem" }}></div>
      </div>
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
        body: <div>Window {id}</div>,
        position: { x: randX, y: randY },
        active: true,
        minimized: false,
        icon: faWindowRestore,
      },
    ];
    setWindows(_windows);
  }
}
