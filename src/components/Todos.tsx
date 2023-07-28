import * as React from "react";

import { Box, Checkbox, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { config } from "@/config";
import { AppContext } from "@/contexts/AppContext";
import dayjs, { Dayjs } from "dayjs";
import TodoItem from "./TodoItem";

const Todos = () => {
  const { fetchData, user, todos } = useContext(AppContext);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const [expanded, setExpanded] = React.useState<number | false>(false);

  const validTodos = todos.filter((item) => !item.is_done);

  const handleChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean,
    panel: number
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAddNewTodo = async () => {
    const userId = user?.id;
    const isValid = userId && newTodoTitle;
    if (!isValid) return alert("Todo Title and userId are required.");
    const response = await fetch(`${config.apiBaseUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodoTitle, userId }),
    });

    if (response.ok) {
      setNewTodoTitle("");
      fetchData();
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}
    >
      {validTodos.length
        ? validTodos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                expanded={expanded}
                handleChange={handleChange}
                setExpanded={setExpanded}
              />
            );
          })
        : ""}
      <Box sx={{ width: "100%", bgcolor: "white", mt: 3 }}>
        <TextField
          fullWidth
          value={newTodoTitle}
          onChange={(evt) => setNewTodoTitle(evt.target.value)}
          onKeyUp={(evt) => evt.key === "Enter" && handleAddNewTodo()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  onClick={() => handleAddNewTodo()}
                  sx={{ display: "grid", placeItems: "center" }}
                >
                  <AddIcon sx={{ color: "black" }} />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Todos;
