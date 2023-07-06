import { Box } from "@mui/material";
import Todos from "./Todos";

import DoneBar from "./DoneBar";
const TodoList = () => {
  return (
    <Box sx={{ maxWidth: 600, mb: 10 }}>
      <Todos />
      <DoneBar />
    </Box>
  );
};

export default TodoList;
