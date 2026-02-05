import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <h1>CPRG 306: Web Development 2 - Assignments</h1>

        <p>
          <Link href="/week-2">Go to week-2</Link>
        </p>
        <p>
          <Link href="/week-3">Go to week-3</Link>
        </p>
        <p>
          <Link href="/week-4">Go to week-4</Link>
        </p>
      </main>
    </div>
  );
}
