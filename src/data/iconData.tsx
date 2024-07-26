import { faDoorOpen, faAddressCard } from "@fortawesome/free-solid-svg-icons";

const iconData = [
  {
    id: "icon-1",
    title: "Welcome",
    position: { x: 100, y: 100 },
    selected: false,
    window: {
      id: "window-1",
      title: "Welcome",
      position: { x: 100, y: 100 },
      active: true,
      minimized: false,
      icon: faDoorOpen,
    },
  },
  {
    id: "icon-2",
    title: "About Me",
    position: { x: 100, y: 200 },
    selected: false,
    window: {
      id: "window-2",
      title: "About",
      position: { x: 400, y: 400 },
      active: false,
      minimized: false,
      icon: faAddressCard,
    },
  },
];

export default iconData;
