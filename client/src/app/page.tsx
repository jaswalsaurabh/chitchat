import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <head>
      <link rel="icon" href="/logo.ico" />
      </head>
      <Link href={'/login'}>Login</Link>
    </main>
  );
}
