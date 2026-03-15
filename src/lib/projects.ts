export const PROJECTS = [
  {
    num: "01",
    category: "Full-Stack SaaS",
    title: "Project Alpha",
    desc: "End-to-end product — auth, billing, real-time dashboard. Shipped to 2k users in 3 months.",
    tags: ["Next.js", "Supabase", "Stripe", "Tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    href: "#",
  },
  {
    num: "02",
    category: "Design System",
    title: "Project Beta",
    desc: "Scalable token-based system with 80+ components, Storybook docs, Figma handoff.",
    tags: ["React", "Storybook", "Figma API", "Radix"],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
    href: "#",
  },
  {
    num: "03",
    category: "3D Web Experience",
    title: "Project Gamma",
    desc: "Custom GLSL shaders, particle systems, physics-based interactions in WebGL.",
    tags: ["Three.js", "WebGL", "GLSL", "GSAP"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
    href: "#",
  },
  {
    num: "04",
    category: "Mobile App",
    title: "Project Delta",
    desc: "60fps Reanimated gestures, offline-first architecture, iOS and Android.",
    tags: ["React Native", "Expo", "Reanimated", "SQLite"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    href: "#",
  },
  {
    num: "05",
    category: "Open Source",
    title: "Project Epsilon",
    desc: "Developer tooling used by 500+ engineers. CLI + VS Code extension.",
    tags: ["Node.js", "TypeScript", "Rust", "WASM"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    href: "#",
  },
] as const;

export type Project = typeof PROJECTS[number];
