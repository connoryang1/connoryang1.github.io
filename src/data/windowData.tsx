import documentIcon from "@/assets/documentIcon.svg";
import waveIcon from "@/assets/waveIcon.svg";

const windowData = [
  {
    id: "window-welcome",
    title: "Welcome",
    body: <p>Welcome to my portfolio website! Scroll down to view more!</p>,
    position: { x: 200, y: 270 },
    active: true,
    minimized: false,
    icon: waveIcon,
  },
  {
    id: "window-about",
    title: "About Me",
    body: <p>I am a 2nd year student at the University of Michigan.</p>,
    position: { x: 550, y: 270 },
    active: false,
    minimized: false,
    icon: documentIcon,
  },
];

export default windowData;
