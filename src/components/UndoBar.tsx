import { config } from "@/config";
import { AppContext } from "@/contexts/AppContext";
import { Box, Button } from "@mui/material";
import { useContext } from "react";

const UndoBar = () => {
  const { archivedTodos, fetchData } = useContext(AppContext);
  const undoText = `restore ${archivedTodos.length} todos`;
  const archivedTodoIds = archivedTodos.map((item) => item.id);
  const restoreTodos = async () => {
    if (!archivedTodoIds.length) return;
    const response = await fetch(`${config.apiBaseUrl}/archive`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archivedTodoIds }),
    });
    if (response.ok) {
      fetchData();
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "black",
        position: "fixed",
        bottom: 0,
        left: 0,
        textAlign: "center",
      }}
    >
      <Button sx={{ p: 2, width: "100%" }} onClick={restoreTodos}>
        {undoText}
      </Button>
    </Box>
  );
};

export default UndoBar;
