import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Checkbox, InputAdornment, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { config } from "@/config";
import { AppContext } from "@/contexts/AppContext";

const Todos = () => {
  const { fetchData, user, todos } = useContext(AppContext);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log(isExpanded);
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {todos.length &&
        todos.map((todo) => {
          return (
            <Accordion
              key={todo.id}
              square
              disableGutters
              expanded={expanded === todo.title}
              onChange={handleChange(todo.title)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ borderBottom: "1px solid " }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox defaultChecked />
                  <Typography>{todo.title}</Typography>
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
        })}
      <Box sx={{ maxWidth: 600, bgcolor: "white", mt: 3 }}>
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
