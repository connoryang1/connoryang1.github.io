import { allProjects } from "@/data/projectData";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Projects</h1>
      <ul>
        {allProjects.map((project) => (
          <li key={project.name}>
            <Link href={"/projects/" + project.id}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
