import TodoList from "@/components/TodoList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  });
  return (
    <div className="flex justify-center w-full mt-2">
      <TodoList />
    </div>
  );
}
