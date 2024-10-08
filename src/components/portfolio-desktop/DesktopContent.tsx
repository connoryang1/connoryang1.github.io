import DesktopBackground from "@/components/portfolio-desktop/DesktopBackground";
import DesktopIcon from "@/components/portfolio-desktop/DesktopIcon";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";

export default function DesktopContent({
  setWindowActive,
  windows,
  setWindows,
  setIcons,
  icons,
}: any) {
  function handleCloseWindow(event: any, id: string) {
    event.stopPropagation();
    const _windows = windows.filter((window: any) => window.id !== id);
    setWindows(_windows);
  }

  function handleMinimizeWindow(id: string) {
    const _windows = windows.map((window: any) => {
      if (window.id === id) {
        return { ...window, minimized: true };
      }
      return window;
    });

    setWindows(_windows);
  }

  function handleOpenWindow(id: string) {
    const icon = icons.find((icon: any) => icon.id === id);
    const exists = windows.find((window: any) => window.id === icon?.window.id);

    if (exists) {
      setWindowActive(icon?.window.id);
    } else {
      const icon = icons.find((icon: any) => icon.id === id);
      if (icon) {
        const _windows = [
          ...windows,
          {
            ...icon.window,
          },
        ];
        setWindows(_windows);
      }
    }
  }

  return (
    <DesktopBackground onClick={() => {
        const _icons = icons.map((icon: any) => {
          return { ...icon, selected: false };
        });
        setIcons(_icons);
    }}>
      <AnimatePresence>
        {icons.map((icon: any) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            title={icon.title}
            icon={icon.window ? icon.window.icon : icon.icon}
            selected={icon.selected}
            handleOpenWindow={icon.window ? handleOpenWindow : () => window.open(icon.link)?.focus()}
            dragStyles={{
              position: "absolute",
              top: icon.position.y,
              left: icon.position.x,
            }}
          />
        ))}
        {windows
          .filter((window: any) => !window.minimized)
          .map((window: any) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              body={window.body}
              size={window.size}
              styles={{
                position: "absolute",
                top: window.position.y,
                left: window.position.x,
                zIndex: window.active ? 2 : 1,
              }}
              handleCloseWindow={handleCloseWindow}
              setWindowActive={setWindowActive}
              handleMinimizeWindow={handleMinimizeWindow}
            />
          ))}
      </AnimatePresence>
    </DesktopBackground>
  );
}
