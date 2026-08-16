import { useEffect, useRef, useState } from "react";
import useWindowStore from "#store/Window";
import { navLinks, navIcons } from "#constants/index.js";
import dayjs from "dayjs";
import ControlCenter from "./ControlCenter.jsx";
import { BatteryFull, BatteryMedium, BatteryLow, BatteryWarning, BatteryCharging } from "lucide-react";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [battery, setBattery] = useState(null); // { level, charging } or null if unsupported
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsControlCenterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live battery status (Chrome/Edge only — silently no-ops elsewhere)
  useEffect(() => {
    let batteryRef;

    const updateBattery = () => {
      setBattery({
        level: Math.round(batteryRef.level * 100),
        charging: batteryRef.charging,
      });
    };

    if (navigator.getBattery) {
      navigator.getBattery().then((b) => {
        batteryRef = b;
        updateBattery();
        b.addEventListener("levelchange", updateBattery);
        b.addEventListener("chargingchange", updateBattery);
      });
    }

    return () => {
      if (batteryRef) {
        batteryRef.removeEventListener("levelchange", updateBattery);
        batteryRef.removeEventListener("chargingchange", updateBattery);
      }
    };
  }, []);

  const handleIconClick = (id) => {
    if (id === 4) setIsControlCenterOpen((prev) => !prev);
  };

  const BatteryIcon = () => {
    if (!battery) return null;
    const { level, charging } = battery;

    if (charging) return <BatteryCharging size={18} className="dark:text-white" />;
    if (level >= 80) return <BatteryFull size={18} className="dark:text-white" />;
    if (level >= 40) return <BatteryMedium size={18} className="dark:text-white" />;
    if (level >= 15) return <BatteryLow size={18} className="dark:text-white" />;
    return <BatteryWarning size={18} className="text-red-500" />;
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
            {battery && (
              <li className="flex items-center gap-1 cursor-default">
                <span className="text-sm dark:text-white">{battery.level}%</span>
                <BatteryIcon />
              </li>
            )}

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

      <div
        className="fixed inset-0 bg-black pointer-events-none z-40 transition-opacity duration-200"
        style={{ opacity: (100 - brightness) / 100 * 0.85 }}
      />
    </>
  );
};

export default Navbar;