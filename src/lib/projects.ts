export const PROJECTS = [
  {
    num: "01",
    category: "Dashboard App",
    title: "Kanban Board",
    desc: "Full-featured Kanban board with real-time data, CRM pipeline, revenue distribution and performance analytics built with Refine and Firebase.",
    tags: ["Refine", "Firebase", "React", "Tailwind"],
    image: "/kanban-board.png",
    images: undefined as string[] | undefined,
    href: "#",
  },
  {
    num: "02",
    category: "Machine Learning",
    title: "Recommendation System",
    desc: "Built a content-based movie recommendation system using Python and machine learning techniques. Implemented TF-IDF vectorization and cosine similarity to suggest similar Netflix titles based on genre, cast, and director. Developed an interactive UI using Streamlit, allowing users to search and explore personalized recommendations in real-time.",
    tags: ["Python", "Streamlit", "Pandas", "Scikit-learn", "TF-IDF", "Cosine Similarity"],
    image: "/Streamlit.png",
    images: undefined as string[] | undefined,
    href: "#",
  },
  {
    num: "03",
    category: "Full Stack Application",
    title: "AI Resume Analyzer & Optimizer",
    desc: "Developed a full-stack application to analyze and optimize resumes based on job descriptions. Built a FastAPI backend for PDF parsing, skill extraction, and job-role matching, and an interactive frontend using React Native (Expo) for real-time resume uploads and insights. Implemented intelligent skill matching, JD alignment, and dynamic resume suggestions to improve ATS compatibility.",
    tags: ["FastAPI", "Python", "React Native", "Expo", "Machine Learning", "PDF Processing"],
    image: "/resume-analyzer-1.png",
    images: ["/resume-analyzer-1.png", "/resume-analyzer-2.png"],
    href: "#",
  },
 
  {
    num: "04",
    category: "AI Application",
    title: "AI PDF Chat Agent ",
    desc: "Developed an AI-powered PDF assistant that allows users to chat with documents using a local LLM. Implemented a Retrieval-Augmented Generation (RAG) pipeline using ChromaDB for vector storage and HuggingFace embeddings for semantic search. Integrated Ollama-based models to generate context-aware answers, enabling fully offline, privacy-focused document querying through an interactive Streamlit interface (Local RAG System).",
    tags: ["Python", "Streamlit", "LangChain", "Ollama", "ChromaDB", "RAG"],
    image: "/ai-agent.png",
    images: undefined as string[] | undefined,
    href: "#",
  },

  // {
  //   num: "05",
  //   category: "Open Source",
  //   title: "Project Epsilon",
  //   desc: "Developer tooling used by 500+ engineers. CLI + VS Code extension.",
  //   tags: ["Node.js", "TypeScript", "Rust", "WASM"],
  //   image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
  //   images: undefined as string[] | undefined,
  //   href: "#",
  // },
];

export type Project = (typeof PROJECTS)[number];
