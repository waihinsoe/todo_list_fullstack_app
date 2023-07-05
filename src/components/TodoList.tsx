import { Box } from "@mui/material";
import Todos from "./Todos";
import UndoBar from "./UndoBar";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
const TodoList = () => {
  const { archivedTodos } = useContext(AppContext);

  return (
    <Box sx={{ maxWidth: 600, mb: 2 }}>
      <Todos />
      {archivedTodos.length ? <UndoBar /> : ""}
    </Box>
  );
};

export default TodoList;
