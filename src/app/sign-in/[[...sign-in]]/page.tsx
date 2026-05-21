import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1 text-zinc-400 text-sm">Sign in to your AutoPhotography account</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
