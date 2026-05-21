import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-black">Welcome back</h1>
          <p className="mt-1 text-gray-500 text-sm">Sign in to your AutoPhotography account</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
