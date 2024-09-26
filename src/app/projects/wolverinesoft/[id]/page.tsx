export async function generateStaticParams() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
  }}

export default function Page() {
  return (
    <div style={{
      color: "white",
    }}>
      <h1>Dev Blog</h1>
    </div>
  );
}