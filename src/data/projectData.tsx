import mclubs from "@/assets/mclubs.webp";
import dstream from "@/assets/poster.webp";
import wolverineSoft from "@/assets/wolverinesoft.webp";
import Image from "next/image";

const projectData = [
  {
    title: "WolverineSoft",
    description: "DevBlog for WolverineSoft Studio.",
    content: <Image src={wolverineSoft.src} alt="WolverineSoft Logo" fill={true} style={{
      objectFit: "cover",
    }}/>,
    link: "/projects/wolverinesoft",
  },
  {
    title: "M-Clubs",
    description: "A club management app for the University of Michigan.",
    content: <Image src={mclubs.src} alt="M-Clubs Brochure" fill={true} style={{
      objectFit: "cover",
    }}/>,
    link: "/projects/mclubs",
    technologies: ["React Native", "Firebase", "Expo"],
  },
  {
    title: "DStream",
    description:
      "A multi-language compatible stream curation algorithm library.",
    content: <Image src={dstream.src} alt="WolverineSoft Logo" fill={true} style={{
      objectFit: "cover",
    }}/>,
    link: "/projects/dstream",
    technologies: ["Python", "C++", "Rust"],
  },
];

export const allProjects = [
  {
    name: "WolverineSoft",
    id: "wolverinesoft",
  },
  {
    name: "DStream",
    id: "dstream",
  },
  {
    name: "MClubs",
    id: "mclubs",
  },
  {
    name: "Gemini Lens",
    id: "gemini-lens",
  },
  {
    name: "Transcriber & Synthesizer",
    id: "transcriber-synthesizer",
  },
];

export default projectData;
