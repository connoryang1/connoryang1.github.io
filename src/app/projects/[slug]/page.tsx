import { allProjects } from "@/data/projectData";

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.id }));
}

export default async function Page(props: any) {
  console.log(props);
  return (
    <div
      style={{
        color: "white",
        fontSize: "2rem",
      }}
    >
      {allProjects.find((project) => project.id === props.params.slug)?.name}
    </div>
  );
}
