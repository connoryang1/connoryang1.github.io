import { faDoorOpen, faAddressCard } from "@fortawesome/free-solid-svg-icons";

const windowData = [
  {
    id: "window-welcome",
    title: "Welcome",
    position: { x: 100, y: 100 },
    active: true,
    minimized: false,
    icon: faDoorOpen,
  },
  {
    id: "window-about",
    title: "About Me",
    position: { x: 400, y: 400 },
    active: false,
    minimized: false,
    icon: faAddressCard,
  },
];

export default windowData;
