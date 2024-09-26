"use client";

import styles from "@/app/page.module.scss";
import Desktop from "@/components/portfolio-desktop/Desktop";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import projectData from "@/data/projectData";
import windowData from "@/data/windowData";

export default function Home() {
  const [windows, setWindows] = useState(windowData);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "start start"],
  });
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

  useEffect(() => {
    setProjects([
      {
        title: "Portfolio",
        description: "This is a project.",
      },
      ...projectData,
    ]);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // console.log(projects);
    console.log(activeIndex);
  }, [activeIndex]);

  return (
    <>
      <div
        className={`${styles.loadingScreen} ${!loading ? styles.hidden : ""}`}
      >
        <motion.div
          className={styles.loadingText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Almost there...
        </motion.div>
      </div>
      <div
        style={{
          display: loading ? "none" : "block",
        }}
      >
        <div className={styles.container} ref={targetRef}>
          <section
            style={{
              position: "sticky",
              height: "100vh",
              top: "0",
            }}
          >
            <motion.div className={styles.header} style={{ opacity }}>
              Recent Works
              <div
                style={{
                  fontSize: "2rem",
                  paddingTop: "1rem",
                }}
              >
                <b>
                  {projects &&
                    projects.length > activeIndex &&
                    projects[activeIndex] &&
                    projects[activeIndex].title}
                </b>
              </div>
            </motion.div>

            <Projects
              targetRef={targetRef}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            >
              <Desktop
                windows={windows}
                setWindows={setWindows}
                setWindowActive={setWindowActive}
                targetRef={targetRef}
                homeScrollProgress={scrollYProgress}
              />
              {projectData.map((project: any) => (
                project.content && project.content
              ))}
            </Projects>
          </section>
          <Navbar
            generateRandomWindow={generateRandomWindow}
            setWindowActive={setWindowActive}
            windows={windows}
            targetRef={targetRef}
          />
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
        size: { width: 400, height: 400 },
        position: { x: randX, y: randY },
        active: true,
        minimized: false,
        icon: faWindowRestore,
      },
    ];
    setWindows(_windows);
  }
}
