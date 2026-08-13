import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock } from "#components";
import { Terminal, SafariWindow, Resume, Chatbot, Mail, Github, Linkedin, Finder } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />

      <Terminal />
      <SafariWindow />
      <Resume />
      <Chatbot />
      <Mail />
      <Github />
      <Linkedin />

      <Dock />
      <Finder />
    </main>
  );
};

export default App;