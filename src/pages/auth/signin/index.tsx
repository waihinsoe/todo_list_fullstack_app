import { Box, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/");
  }
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={() => signIn()} variant="contained">
        Sign in with third party app
      </Button>
    </Box>
  );
}
