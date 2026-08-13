import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock } from "#components";

import {
    Terminal,
    SafariWindow,
    Resume,
    Chatbot,
    Mail,
    Github,
    Linkedin,
    Finder,
    Text,
    ImageFile,
} from "#windows";

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
            <Text />
            <ImageFile />
        </main>
    );
};

export default App;