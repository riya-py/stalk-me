import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock } from "#components";
import { Terminal, SafariWindow, Resume, Chatbot, Mail, Github, Contact } from "#windows";

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
      <Contact />

      <Dock />
    </main>
  );
};

export default App;