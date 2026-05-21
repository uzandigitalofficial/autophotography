import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="mt-1 text-zinc-400 text-sm">
            Start with 3 free credits — no card required
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
