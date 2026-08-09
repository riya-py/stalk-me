import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock } from "#components";
import { Terminal, SafariWindow, Resume } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />

      <Terminal />
      <SafariWindow />
      <Resume />

      <Dock />
    </main>
  );
};

export default App;