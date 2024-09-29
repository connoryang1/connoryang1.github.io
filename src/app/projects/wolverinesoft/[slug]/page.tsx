export function generateStaticParams() {
  return [{ slug: "test-devblog" }];
}

export default async function Page(props: any) {
  return <div style={{
    color: "white",
    fontSize: "2rem",
  }}>{props.params.slug}</div>;
}
