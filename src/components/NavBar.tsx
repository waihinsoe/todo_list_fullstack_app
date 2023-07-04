import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useSession, signOut, signIn } from "next-auth/react";

interface Props {
  title?: string;
}

const NavBar = ({ title }: Props) => {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#64CCC5",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: 3,
      }}
    >
      <Avatar
        alt="Cindy Baker"
        sx={{ bgcolor: "#001C30" }}
        src={session?.user?.image || ""}
      />
      <Typography
        variant="h5"
        sx={{ textTransform: "uppercase", color: "#001C30" }}
      >
        {title}
      </Typography>
      <Button
        variant="outlined"
        sx={{ color: "#001C30" }}
        onClick={() => (session ? signOut() : signIn())}
      >
        {session ? "logout" : "login"}
      </Button>
    </Box>
  );
};

export default NavBar;
