import { useSession, signIn, signOut } from "next-auth/react";
export default function LogginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* Signed in as {session.user.email} <br /> */}
        <button
          className="text-md w-[120px] max-w-[120px] rounded-md border-[2.3px] border-gray-500 bg-gray-200 px-5 py-1 text-black hover:opacity-75"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className="text-md w-[120px] max-w-[120px] rounded-md border-[2.3px] border-gray-500 bg-gray-200 px-5 py-1 text-black hover:opacity-75"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
