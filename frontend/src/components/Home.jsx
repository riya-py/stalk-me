import React from "react";
import { locations } from "#constants";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/Window";
import useLocationStore from "#store/location";

gsap.registerPlugin(Draggable);

const projects = locations.work?.children ?? [];

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    };

    useGSAP(() => {
        const navEl = document.querySelector("nav");
        const navHeight = navEl ? navEl.offsetHeight : 0;

        Draggable.create(".folder", {
            bounds: {
                top: navHeight,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight - navHeight,
            },
        });
    });

    return (
        <section id="home">
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx("group folder", project.windowPosition)}
                        onClick={() => handleOpenProjectFinder(project)}
                    >
                        <img
                            src="/images/folder.png"
                            alt={project.name}
                        />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;