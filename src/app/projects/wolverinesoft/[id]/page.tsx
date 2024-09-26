export async function generateStaticParams() {
  return {
    paths: [],
    fallback: false,
  };
}

export default function Page() {
  return (
    <div style={{
      color: "white",
    }}>
      <h1>Dev Blog</h1>
    </div>
  );
}