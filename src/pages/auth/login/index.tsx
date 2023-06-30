import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/");
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
