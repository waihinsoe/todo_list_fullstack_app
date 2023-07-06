import { config } from "@/config";
import { AppContext } from "@/contexts/AppContext";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const DoneBar = () => {
  const { fetchData, todos } = useContext(AppContext);
  const doneTodoIds = todos
    .filter((item) => item.is_done)
    .map((item) => item.id);
  const lineThroughTodoIds = todos
    .filter((item) => !item.is_done && item.is_lineThrough)
    .map((item) => item.id);
  const doneText = doneTodoIds.length
    ? `done ${doneTodoIds.length} todos`
    : `done ${lineThroughTodoIds.length} todos`;

  const restoreTodos = async () => {
    if (!doneTodoIds.length && !lineThroughTodoIds.length) return;
    const response = await fetch(`${config.apiBaseUrl}/done`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doneTodoIds, lineThroughTodoIds }),
    });
    if (response.ok) {
      fetchData();
    }
  };
  if (!doneTodoIds.length && !lineThroughTodoIds.length) return null;
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
        {doneTodoIds.length ? <ZoomInIcon /> : <ZoomOutIcon />}
        {doneText}
      </Button>
    </Box>
  );
};

export default DoneBar;
