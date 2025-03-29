import { Files } from "@/components/FIles";
import { SignOutButton } from "@/components/SignOutButton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        Convex + Next.js + Convex Auth
        <SignOutButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Convex + Next.js + Convex Auth
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Files />
        </Suspense>
       
      </main>
    </>
  );
}


