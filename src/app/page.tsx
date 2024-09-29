"use client";

import styles from "@/app/page.module.scss";
import Desktop from "@/components/portfolio-desktop/Desktop";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

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
        description: "My portfolio website.",
        technologies: ["React", "Next.js", "TypeScript", "Framer Motion"],
      },
      ...projectData,
    ]);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
              <h1 style={{
                fontSize: "4rem",
                textTransform: "uppercase",
                fontStyle: "italic",
                fontWeight: 500,
                marginLeft: "3rem",
              }}>Recent Works</h1>
              <div
                style={{
                  fontSize: "2rem",
                  marginTop: "3.5rem",
                  textAlign: "start",
                  marginLeft: "3rem",
                }}
              >
                <b>
                  {projects &&
                    projects.length > activeIndex &&
                    projects[activeIndex] &&
                    projects[activeIndex].title}
                </b>
                <p style={{
                  fontSize: "1.5rem",
                  textTransform: "none",
                  marginBottom: "1rem",
                }}>
                  {projects &&
                    projects.length > activeIndex &&
                    projects[activeIndex] &&
                    projects[activeIndex].description}
                </p>
                {projects &&
                  projects.length > activeIndex &&
                  projects[activeIndex] &&
                  projects[activeIndex].technologies &&
                  projects[activeIndex].technologies.map((tech: string) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "1rem",
                        marginRight: "1rem",
                        color: "#CCCCCC",
                        backgroundColor: "rgba(80, 80, 80, 0.5)",
                        padding: "0.2rem 0.5rem",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
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
                project.content && React.cloneElement(project.content, {
                  link: project.link,
                })
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
