import { useSession, signIn, signOut } from "next-auth/react";
export default function LogginButton() {
  const { data: session } = useSession();
  if (session) {
    console.log(session.user);
    return (
      <>
        {/* Signed in as {session.user.email} <br /> */}
        <button
          className="text-md max-w-[150px] rounded-md border-[2.3px] border-black bg-gray-300 px-5 py-1"
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
        className="text-md max-w-[150px] rounded-md border-[2.3px] border-black bg-gray-300 px-5 py-1"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
