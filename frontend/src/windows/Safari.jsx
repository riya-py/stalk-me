import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";

import {
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  Search,
  Plus,
  Share,
  Copy,
  ShieldHalf,
  ExternalLink,
} from "lucide-react";

const projects = [
  {
    title: "VectorDB",
    description:
      "A vector database and RAG pipeline built from scratch with HNSW, KD-Tree, LangChain, and Ollama.",
    tech: ["Python", "HNSW", "KD-Tree", "RAG", "LangChain", "Ollama"],
    link: "https://github.com/riya-py/OWN-AI",
  },
  {
    title: "DPI Engine",
    description:
      "A multi-threaded deep packet inspection engine that analyzes PCAP traffic and identifies applications from encrypted HTTPS connections.",
    tech: ["Python", "TCP/IP", "TLS", "PCAP", "Scapy"],
    link: "https://github.com/riya-py/Packet-analyzer",
  },
];

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />

          <div className="search">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="projects">
        <h2>What I Built</h2>

        <p className="subtitle">
          A collection of systems and AI projects I've built from scratch.
        </p>

        <div className="space-y-6">
          {projects.map(({ title, description, tech, link }) => (
            <div key={title} className="project-card">
              <div className="flex items-center justify-between">
                <h3>{title}</h3>

                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="icon" />
                </a>
              </div>

              <p className="description">{description}</p>

              <div className="tech">
                {tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;