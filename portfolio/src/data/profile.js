// src/data/profile.js
export const BIO = {
  intro: "I am a passionate programmer. Programming started as a hobby for me, which I have now developed into a strong skill. I am currently a student at VIT-AP studying for a Bachelor's in Technology in Computer Science and Engineering.",
  points: [
    { label: "Backend & Systems", text: "I have a strong background in Python programming, development, designing, and testing. Other languages I can work with include Java, GO, and Typescript." },
    { label: "Frontend Development", text: "I am experienced in building responsive interfaces using JavaScript, CSS, and the React framework." },
    { label: "Hardware & Hobbies", text: "Beyond software, I am an electronics hobbyist who loves to tinker with microcontrollers, build circuits, play chess, and engage in sports." }
  ]
};

export const LANGUAGES = [
  "java", "javascript", "typescript", "python", "go", "c", "cplusplus", "html5", "css3"
];

export const TOOLS = [
  "react", "nextjs", "tailwindcss", "mysql", "selenium", "linux", "git"
];

// Human‑readable labels for hover titles (only if you want custom)
export const LABELS = {
  java: "Java",
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  go: "Go",
  c: "C",
  cplusplus: "C++",
  html5: "HTML5",
  css3: "CSS3",
  react: "React",
  nextjs: "Next.js",
  tailwindcss: "Tailwind CSS",
  mysql: "MySQL",
  selenium: "Selenium",
  linux: "Linux",
  git: "Git"
};

// Lucide‑backed skills (concepts that don’t have Devicon logos or where text-less icons aren’t clear)
export const SKILL_CONCEPTS = [
  "Object‑Oriented Programming (OOP)",
  "Data Structures and Algorithms",
  "Web Scraping",
  "Testing",
  "Databases",
  "Project Management",
  "Communication",
  "Artificial Intelligence (AI)",
  "Machine Learning (ML)",
  "Networking",
  "Linux"
];
export const SKILLS = [...LANGUAGES, ...TOOLS, ...SKILL_CONCEPTS];