// import documentIcon from "@/assets/icons/documentIcon.svg";
import aboutIcon from "@/assets/icons/aboutIcon.svg";
import waveIcon from "@/assets/icons/waveIcon.svg";
import photo from "@/assets/photo.jpg";
import { clamp } from "framer-motion";
import Image from 'next/image';

const width = window.innerWidth;
console.log(width);

const windowData = [
  {
    id: "window-welcome",
    title: "Welcome",
    body: <ul style={{
      paddingLeft: "1rem",
    }}>
      <li>Welcome to my portfolio website!</li>
      <li>Drag windows around or click the &quot;X&quot; icon to close them.</li>
      <li>Open new windows using desktop icons.</li>
      <li><b>Scroll down to view more!</b></li>
    </ul>,
    position: { x: width > 800 ? 775 : width - 360, y: width > 800 ? 320 : 525 },
    size: { width: 280, height: 250 },
    active: true,
    minimized: false,
    icon: waveIcon,
  },
  {
    id: "window-about",
    title: "About Me",
    body:
    <div>
      <div style={{
      width: "100%",
      }}>
        <Image src={photo} alt="Profile Picture" layout="responsive" width={500} height={500} style={{
        borderRadius: '1rem',
        marginBottom: "1rem"}}
        />
      </div>
      <ul style={{
      paddingLeft: "1rem",
      }}>
      <li>2nd year at the <b>University of Michigan</b></li>
      <li>What I&apos;m currently up to:
        <ul style={{
          marginLeft: "1rem",
          fontSize: "0.7rem",
        }}>
          <li>Software Developer Intern at <b>QualRisk</b>.</li>
          <li>Researcher at the Zaman E3 Lab.</li>
          <li>Full-time student: EECS 485, EECS 376, EECS 370, STATS 401, ENGR 455, ALA 380</li>
        </ul>
      </li>
      <li>
        Upcoming: Software Development Intern at <b>GEICO</b> (Summer 2025)
      </li>

      </ul>
    </div>,
    position: { x: clamp(0, width - 350, 1050), y: 70 },
    size: { width: 320, height: 470 },
    active: false,
    minimized: false,
    icon: aboutIcon,
  },
];

export default windowData;
