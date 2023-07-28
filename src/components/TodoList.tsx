import { Box } from "@mui/material";
import Todos from "./Todos";

import DoneBar from "./DoneBar";
const TodoList = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "600px" },
        mb: 10,
      }}
    >
      <Todos />
      <DoneBar />
    </Box>
  );
};

export default TodoList;
