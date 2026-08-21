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

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
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

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
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
      name: "Vector Database",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "Vector DB Project.txt",
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
          name: "vector-db.repo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/riya-py/OWN-AI", // 👈 add your real repo link
          position: "top-10 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "DPI Engine",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "DPI Engine Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A Deep Packet Inspection engine, ported line-for-line in logic to Python — it reads live network captures and identifies what app is generating each connection.",
            "Instead of guessing from ports alone, it inspects TLS SNI, HTTP Host headers, and DNS queries to recognize traffic from apps like YouTube, Facebook, and TikTok, then applies IP, domain, and port-based blocking rules.",
            "Think of it like airport security for network packets — every connection gets classified and checked against the rules before it's allowed through.",
            "It ships in three flavors: a simple single-threaded version, a multi-threaded pipeline with load-balanced worker threads, and a modular version — all built on pure Python standard library, no external dependencies.",
          ],
        },
        {
          id: 2,
          name: "dpi-engine.repo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/riya-py/packet-analyzer", // 👈 add your real repo link
          position: "top-20 left-20",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Hand Mouse",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Hand Mouse Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Hand Mouse lets you control your cursor using nothing but hand gestures, tracked live through your webcam.",
            "Move your index finger to move the cursor, pinch your thumb and index finger to click, pinch thumb and middle finger to right-click, and raise all four fingers to scroll — no mouse required.",
            "Think of it like Minority Report for your desktop — powered by MediaPipe's hand-tracking model and PyAutoGUI translating gestures into real cursor input.",
            "It's built entirely in Python, works with any standard webcam, and even takes a screenshot when you close your fist.",
          ],
        },
        {
          id: 2,
          name: "hand-mouse.repo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/riya-py/hand-mouse", // 👈 add your real repo link
          position: "top-10 right-20",
        },
      ],
    },
        // ▶ Project 4
    {
      id: 8,
      name: "BitTorrent Client",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "BitTorrent Client Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-52 left-5",
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