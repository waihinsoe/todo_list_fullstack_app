import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import BasicDatePicker from "./DatePicker";
import type { todos as Todo } from "@prisma/client";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { config } from "@/config";
import dayjs, { Dayjs } from "dayjs";
interface Props {
  todo: Todo;
  expanded: number | false;
  handleChange: (
    event: React.SyntheticEvent,
    isExpanded: boolean,
    panel: number
  ) => void;
}

const TodoItem = ({ todo, handleChange, expanded }: Props) => {
  const { user, fetchData } = useContext(AppContext);
  const [noteText, setNoteText] = useState(todo.note ? todo.note : "");
  const [date, setDate] = useState<Dayjs | null>(
    dayjs(todo.date || dayjs().format("MM/DD/YYYY"))
  );
  const [open, setOpen] = useState(false);

  const handleDone = async (
    todoId: number,
    isDone: boolean,
    isLineThrough: boolean
  ) => {
    const userId = user?.id;
    const isValid = userId && todoId;
    if (!isValid) return alert("userId and todoId are required.");

    const response = await fetch(`${config.apiBaseUrl}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, todoId, isDone, isLineThrough }),
    });

    if (response.ok) {
      fetchData();
    }
  };

  const handleClickCheckbox = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handleUpdate = async () => {
    const isValid = todo.id && date && noteText.length;
    if (!isValid) return alert("need more info");
    const response = await fetch(`${config.apiBaseUrl}/updateTodo`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todoId: todo.id,
        date: date.format("MM/DD/YYYY"),
        note: noteText,
      }),
    });

    if (response.ok) {
      fetchData();
      setOpen(true);
    }
  };

  const handleDelete = async (todoId: number) => {
    if (!todoId) return;
    const response = await fetch(`${config.apiBaseUrl}?todoId=${todoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchData();
    }
  };

  return (
    <Accordion
      square
      disableGutters
      expanded={expanded === todo.id}
      onChange={(event, isExpanded) => handleChange(event, isExpanded, todo.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ borderBottom: "1px solid #001c30" }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              onClick={(evt) => {
                {
                  handleClickCheckbox(evt);
                  handleDone(todo.id, !todo.is_done, !todo.is_lineThrough);
                }
              }}
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
          <Box sx={{ mr: 1 }}>
            <Typography>{date?.format("DD/MM/YYYY")}</Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            id="note"
            label="Note"
            value={noteText}
            onChange={(evt) => setNoteText(evt.target.value)}
            multiline
            rows={5}
            sx={{ width: 300 }}
            placeholder="Text here"
            variant="filled"
          />
          <Box
            sx={{
              height: "148px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <BasicDatePicker date={date} setDate={setDate} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={handleUpdate}>
                update
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
              >
                <Alert
                  onClose={() => setOpen(false)}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Update successfully completed!
                </Alert>
              </Snackbar>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(todo.id)}
              >
                delete
              </Button>
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TodoItem;
