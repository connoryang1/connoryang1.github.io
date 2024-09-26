// export async function generateStaticParams() {
//   return [{ eventId: "1" }, { eventId: "2"}];
// }

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
