import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Checkbox, InputAdornment, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const Todos = () => {
  const [newTodo, setNewTodo] = useState();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log(isExpanded);
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      <Accordion
        square
        disableGutters
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ borderBottom: "1px solid " }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox defaultChecked />
            <Typography>General settings</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla . Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam
            eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ maxWidth: 600, bgcolor: "white", mt: 3 }}>
        <TextField
          fullWidth
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
