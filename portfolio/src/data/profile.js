// src/data/profile.js
export const BIO = `I am a passionate programmer, Programming started as a hobby for me, which I have now developed as a strong skill. I am currently a student at VIT-AP studying for a Bachelor's in Technology in Computer Science and Engineering.

I have a strong background in Python programming, development, designing, and testing. I am also knowledgeable in web development and have a good knowledge of Javascript and CSS. I often use the React framework for my projects. Other languages I can work with are Java, GO, and Typescript.

I am also an electronics hobbyist and love to tinker around and create stuff with microcontrollers in my free time, my other hobbies include chess, circuit building, and sports.`;

export const LANGUAGES = [
  "java", "javascript", "typescript", "python", "go", "c", "cplusplus", "html5", "css3"
];

export const TOOLS = [
  "react", "nextjs", "tailwindcss", "mysql", "selenium", "linux", "git"
];

// Human‑readable labels for hover titles (only if you want custom)
export const LABELS = {
  cplusplus: "C++",
  html5: "HTML5",
  css3: "CSS3",
  nextjs: "Next.js",
  tailwindcss: "Tailwind CSS",
  mysql: "MySQL"
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