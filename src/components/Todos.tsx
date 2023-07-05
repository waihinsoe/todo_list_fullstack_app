import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Checkbox, InputAdornment, TextField } from "@mui/material";
import type { todos as Todo } from "@prisma/client";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { config } from "@/config";
import { AppContext } from "@/contexts/AppContext";

const Todos = () => {
  const { fetchData, user, todos } = useContext(AppContext);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleRemove = async (
    todoId: number,
    isArchived: boolean,
    isLineThrough: boolean
  ) => {
    const userId = user?.id;
    const isValid = userId && todoId;
    if (!isValid) return alert("userId and todoId are required.");

    const response = await fetch(`${config.apiBaseUrl}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, todoId, isArchived, isLineThrough }),
    });

    if (response.ok) {
      fetchData();
    }
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {todos.length
        ? todos.map((todo) => {
            return (
              <Accordion
                key={todo.id}
                square
                disableGutters
                expanded={expanded === todo.id}
                onChange={handleChange(todo.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{ borderBottom: "1px solid " }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      defaultChecked
                      onClick={() =>
                        handleRemove(
                          todo.id,
                          !todo.is_archived,
                          !todo.is_lineThrough
                        )
                      }
                      checked={todo.is_lineThrough ? true : false}
                    />
                    <Typography
                      sx={{
                        textDecoration: `${
                          todo.is_lineThrough ? "line-through" : "none"
                        }`,
                      }}
                    >
                      {todo.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla . Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        : ""}
      <Box sx={{ width: 600, bgcolor: "white", mt: 3 }}>
        <TextField
          fullWidth
          value={newTodoTitle}
          onChange={(evt) => setNewTodoTitle(evt.target.value)}
          onKeyUp={(evt) => evt.key === "Enter" && handleAddNewTodo()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Todos;
