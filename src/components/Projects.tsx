import styles from "@/components/Projects.module.scss";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function Projects({
  children,
  targetRef,
  activeIndex,
  setActiveIndex,
}: any) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    layoutEffect: false,
    // container: targetRef,
    offset: ["end end", "start start"],
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    console.log(scrollYProgress.get(), targetRef.current, targetRef.current?.offsetHeight);
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], ["40%", "100%"]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    ["-115%", "20%", "20%", "0%"],
  );
  const y = useTransform(scrollYProgress, [0.5, 1], ["25%", "0%"]);

  return (
    <div>
      <motion.div className={styles.projectContainer} style={{ scale, x, y }}>
        {React.Children.map(children, (child: any, index: number) => {
          const commonStyles = {
            transition: "all 0.5s",
            filter: activeIndex === index ? "brightness(1)" : "brightness(0.5)",
            outline: "4px solid #ffffff",
            height: "100vh",
            width: "100vw",
          };

          const motionDiv = (
            <motion.div
              key={index}
              style={commonStyles}
              onMouseOver={() => setActiveIndex(index)}
            >
              {child}
            </motion.div>
          );

          return child.props.link ? (
            <Link
              href={child.props.link}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              {motionDiv}
            </Link>
          ) : (
            motionDiv
          );
        })}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            outline: "4px solid #000000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "8rem",
            paddingRight: "8rem",
          }}
        >
          <a
            style={{
              color: "#999999",
              cursor: "pointer",
              transition: "all 0.5s",
              fontSize: "4rem",
              whiteSpace: "nowrap",
            }}
            href="/projects"
          >
            View all projects -&gt;
          </a>
        </div>
      </motion.div>
    </div>
  );
}
