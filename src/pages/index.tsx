import Layout from "@/components/Layout";
import TodoList from "@/components/TodoList";

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  });
  return (
    <Layout title="todo list app">
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TodoList />
      </Box>
    </Layout>
  );
}
