import documentIcon from "@/assets/icons/documentIcon.svg";
import githubIcon from "@/assets/icons/githubIcon.svg";
import linkedinIcon from "@/assets/icons/linkedinIcon.svg";
import windowData from "./windowData";

const width = window.innerWidth;

const iconData = [
  {
    id: "icon-1",
    title: "Welcome",
    position: { x: 70, y: 320 },
    selected: false,
    window: windowData[0],
  },
  {
    id: "icon-2",
    title: "About Me",
    position: { x: 70, y: 420 },
    selected: false,
    window: windowData[1],
  },
  {
    id: "icon-3",
    title: "LinkedIn",
    position: { x: 70, y: width < 700 ? 800 : 760 },
    selected: false,
    icon: linkedinIcon,
    link: "https://www.linkedin.com/in/connor-yang-03a8a5273/",
  },
  {
    id: "icon-4",
    title: "GitHub",
    position: { x: 150, y: width < 700 ? 800 : 760 },
    selected: false,
    icon: githubIcon,
    link: "https://www.github.com/connoryang1"
  },
  {
    id: "icon-5",
    title: "Resume",
    position: { x: 230, y: width < 700 ? 800 : 760 },
    selected: false,
    icon: documentIcon,
    link: "https://drive.google.com/file/d/1FAK7Wx0FyZ_1hS8O3oNIg1EIasW2HvFT/view?usp=sharing"
  }
];

export default iconData;
