export async function generateStaticParams() {
  return [
    { params: { id: '1' } },
    { params: { id: '2' } },
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div style={{ color: "white" }}>
      <h1>Dev Blog for Project {params.id}</h1>
    </div>
  );
}
