import { useEffect, useRef, useState } from "react";
import useWindowStore from "#store/Window";
import { navLinks, navIcons } from "#constants/index.js";
import dayjs from "dayjs";
import ControlCenter from "./ControlCenter.jsx";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const wrapperRef = useRef(null);

  // Apply/remove the "dark" class on <html> so Tailwind's dark: variants work site-wide
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Close the popup when clicking anywhere outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsControlCenterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIconClick = (id) => {
    // id 4 is the "mode.svg" control-center toggle icon
    if (id === 4) setIsControlCenterOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="relative">
        <div>
          <img src="/images/logo.svg" alt="Logo" />
          <p className="font-bold">My Portfolio</p>

          <ul>
            {navLinks.map((item) => (
              <li key={item.id} onClick={() => openWindow(item.type)}>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div ref={wrapperRef} className="relative">
          <ul>
            {navIcons.map(({ id, img }) => (
              <li key={id} onClick={() => handleIconClick(id)}>
                <img src={img} alt={`icon-${id}`} className="icon-hover" />
              </li>
            ))}
          </ul>
          <time>{dayjs().format("ddd MMM D, h:mm A")}</time>

          {isControlCenterOpen && (
            <ControlCenter
              onClose={() => setIsControlCenterOpen(false)}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode((v) => !v)}
              brightness={brightness}
              onBrightnessChange={setBrightness}
            />
          )}
        </div>
      </nav>

      {/* Real brightness effect: dims the whole screen */}
      <div
        className="fixed inset-0 bg-black pointer-events-none z-40 transition-opacity duration-200"
        style={{ opacity: (100 - brightness) / 100 * 0.85 }}
      />
    </>
  );
};

export default Navbar;