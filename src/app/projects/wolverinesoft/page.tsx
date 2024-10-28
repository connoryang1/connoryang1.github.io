import Link from "next/link";

export default function Page() {
  return (
    <ol>
      <li>
        <Link href="/projects/wolverinesoft/devblog1">
          Biweekly Devblog 1: September 29th - October 13th
        </Link>
      </li>
      <li>
        <Link href="/projects/wolverinesoft/devblog2">
          Biweekly Devblog 2: October 13th - October 27th
        </Link>
      </li>
      <li>
        <Link href="/projects/wolverinesoft/devblog3">
          Biweekly Devblog 3: October 27th - November 10th
        </Link>
      </li>
      <li>
        <Link href="/projects/wolverinesoft/devblog4">
          Biweekly Devblog 4: November 10th - November 24th
        </Link>
      </li>
      <li>
        <Link href="/projects/wolverinesoft/devblog5">
          Biweekly Devblog 5: November 24th - December 8th
        </Link>
      </li>
    </ol>
  );
}
