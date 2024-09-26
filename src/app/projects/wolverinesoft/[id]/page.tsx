export function generateStaticParams() {
  return [{ id: "test" }];
}

export default async function Page(props: any) {
  return <div>{JSON.stringify(props.params)}</div>;
}
