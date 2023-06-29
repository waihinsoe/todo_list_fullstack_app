import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div style={{ color: "white" }}>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => signOut()}
          style={{ backgroundColor: "white", color: "black" }}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div style={{ color: "white" }}>
      Not signed in <br />
      <button
        onClick={() => signIn()}
        style={{ backgroundColor: "white", color: "black" }}
      >
        Sign in
      </button>
    </div>
  );
}
