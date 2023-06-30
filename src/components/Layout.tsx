import { Box } from "@mui/material";
import NavBar from "./NavBar";

type Props = {
  title?: string;
  children: JSX.Element;
};
const Layout = ({ children, title }: Props) => {
  return (
    <Box>
      <NavBar title={title} />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
