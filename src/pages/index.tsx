import Layout from "@/components/Layout";

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("session", session);
  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  });
  return (
    <Layout title="todo list app">
      <Box></Box>
    </Layout>
  );
}
