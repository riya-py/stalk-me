import { useWindowStore } from "#components";
import { useRef } from "react";

const WindowWrapper = (Component, windowKey) => {
  const Wrapper = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    if (!isOpen) return null; // you'll probably want this too

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapper.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapper;
};

export default WindowWrapper;