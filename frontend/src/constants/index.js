const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 2,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "mail",
    name: "Mail",
    icon: "mail.png",
    canOpen: true,
    type: "window"
  },
  {
    id: "github",
    name: "GitHub",
    icon: "github.png",
    canOpen: true,
    type: "window" // 👈 your GitHub profile
  },
  {
  id: "linkedin",
  name: "LinkedIn",
  icon: "linkedin.png", // 👈 see note below
  canOpen: true,
  type: "window",
  },
  {
    id: "terminal",
    name: "Skills",
    icon: "terminal.png",
    canOpen: true,
    type: "window",
  },
  {
    id: "chatbot",
    name: "Ask me",
    icon: "chatbot.png",
    canOpen: true,
    type: "window",
  },
];

const techStack = [
  {
    category: "Languages",
    items: ["Python", "Java", "C", "C++", "SQL"],
  },
  {
    category: "Backend & Systems",
    items: ["OOP", "Rest APIs", "Networking"],
  },
  {
    category: "AI",
    items: ["LLMs", "RAG", "LangChain", "LangGraph"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker", "Linux", "Ollama"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/JavaScript-Mastery-Pro",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://jsmastery.com/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/jsmasterypro",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  techStack,
  socials,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Own AI",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-6",
      children: [
        {
          id: 1,
          name: "Own AI Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A fully working vector database built from scratch in Python, complete with its own web UI.",
            "It runs three search algorithms side by side — HNSW, KD-Tree, and Brute Force — so you can actually see how production systems like Pinecone, Weaviate, and Chroma work under the hood.",
            "It also plugs into a local LLM through Ollama, so you can embed real documents and run a full RAG pipeline, asking questions and getting answers grounded only in your own text.",
            "Think of it as a hands-on teardown of 'how does semantic search actually work' — with a live 2D scatter plot showing the vector clusters forming in real time.",
          ],
        },
        {
          id: 2,
          name: "own-ai.repo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/riya-py/OWN-AI",
          position: "top-10 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 8,
      name: "BitTorrent",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-44",
      windowPosition: "top-[32vh] left-6",
      children: [
        {
          id: 1,
          name: "BitTorrent Client Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A BitTorrent client built entirely from scratch — bencode parser, tracker client, peer wire protocol, piece manager, and SHA-1 verification, all implemented directly against the protocol spec with no torrent library underneath.",
            "It's paired with a React dashboard that makes every step of the protocol visible as it happens: watching a .torrent file turn into an infohash, a tracker announce, a list of peers, a handshake, and finally verified bytes written to disk.",
            "It implements real peer wire messages (choke/unchoke, have, bitfield, request, piece), concurrent per-peer downloading with asyncio, and rarest-first piece selection — plus a simulation mode that reproduces corruption, peer failure, and choking cycles without a real swarm.",
            "Built with a Python/FastAPI backend and a TypeScript/React frontend, backed by a full pytest suite covering every phase of the protocol.",
          ],
        },
        {
          id: 2,
          name: "bittorrent-client.repo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/riya-py/Bit-torrent",
          position: "top-10 right-20",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 9,
      name: "EvoAgent",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[59vh] left-6",
      children: [
        {
          id: 1,
          name: "EvoAgent Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-5",
          description: [
            "A multi-agent LLM competition and evolution system, built from scratch on local Ollama models — eight AI personalities answer the same question, three independent judges score them anonymously, and the weakest agent is eliminated each round.",
            "Judges never see who wrote an answer before scoring it, and the three judges each weigh accuracy, reasoning, and utility differently, so they genuinely disagree instead of rubber-stamping each other.",
            "The signature mechanic is evolution: when an agent is eliminated, an Evolution Engine studies exactly what made it lose and designs its successor, while a diversity checker stops the roster from converging into near-duplicates.",
            "Every round streams live over WebSocket, with the full lineage — every score, critique, and ancestor — persisted in SQLite. Built with a Python/FastAPI backend and a React dashboard.",
          ],
        },
        {
          id: 2,
          name: "evoagent.repo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/riya-py/EvoAgent",
          position: "top-10 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
    id: 1,
    name: "about-me.txt",
    icon: "/images/txt.png",
    kind: "file",
    fileType: "txt",
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    subtitle: "Hii!! I'm the developer",
    description: [
      "Hey! I’m Ria, a Computer Science student and aspiring AI Engineer who loves turning ideas into things you can actually build, run, and break.",
      "I work mainly with Python and enjoy building AI and GenAI systems, especially RAG pipelines, vector search, and LLM-powered applications using tools like LangChain and LangGraph.",
      "I’m also a big fan of understanding how things work under the hood — from building a vector database and search algorithms from scratch to designing multi-threaded systems and REST APIs.",
      "Most of my projects start with a simple 'wait... can I build this myself?' and somehow turn into late-night debugging sessions, questionable amounts of coffee, and something I'm genuinely proud of.",
    ],
  },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
    {
      id: 2,
      name: "trash3.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      imageUrl: "/images/trash-3.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  chatbot: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mail: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },     // 👈 add this
  github: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },   // 👈 add this
  linkedin: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };