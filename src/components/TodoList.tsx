import { Box } from "@mui/material";
import Todos from "./Todos";
const TodoList = () => {
  return (
    <Box sx={{ maxWidth: 600 }}>
      <Todos />
    </Box>
  );
};

export default TodoList;
