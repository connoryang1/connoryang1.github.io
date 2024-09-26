import DesktopBackground from "@/components/portfolio-desktop/DesktopBackground";

const projectData = [
  {
    title: "WolverineSoft",
    description: "DevBlog for WolverineSoft Studio.",
    content: <DesktopBackground />,
    link: "/projects/wolverinesoft",
    // technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "M-Clubs",
    description: "A club management app for the University of Michigan.",
    content: <DesktopBackground />,
    link: "/projects/mclubs",
    technologies: ["React Native", "Firebase", "Expo"],
  },
  {
    title: "DStream",
    description: "A multi-language compatible stream curation algorithm library.",
    content: <DesktopBackground />,
    link: "/projects/dstream",
    technologies: ["Python", "C++", "Rust"],
  }
];

export default projectData