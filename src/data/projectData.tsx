import mclubs from "@/assets/mclubs.webp";
import wolverineSoft from "@/assets/wolverinesoft.webp";
import DesktopBackground from "@/components/portfolio-desktop/DesktopBackground";
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
    content: <DesktopBackground />,
    link: "/projects/dstream",
    technologies: ["Python", "C++", "Rust"],
  },
];

export default projectData;
