import { config } from "@/config";
import { AppContext } from "@/contexts/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { todos as Todo } from "@prisma/client";
import { useContext, useState } from "react";
interface Props {
  item: Todo;
}

const TodoListItem = ({ item }: Props) => {
  const { fetchData } = useContext(AppContext);
  const [expand, setExpand] = useState(false);

  const handleEditTodo = () => {};
  const handleRemoveTodo = async () => {
    if (!item.id) return;
    const response = await fetch(`${config.apiBaseUrl}/?id=${item.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      fetchData();
    }
  };
  return (
    <div
      key={item.id}
      className={`w-full bg-[#176B87] text-white  flex justify-between items-center p-2 rounded-sm transition-all `}
    >
      <span
        onClick={() => setExpand(!expand)}
        className={`${
          expand ? "" : "overflow-hidden h-[60px] text-ellipsis"
        }  flex items-center`}
      >
        {item.name}
      </span>
      <div className="flex gap-2">
        <button
          className="transition-transform active:scale-125"
          onClick={handleEditTodo}
        >
          <EditIcon />
        </button>
        <button
          className="transition-transform active:scale-125"
          onClick={handleRemoveTodo}
        >
          <DeleteIcon sx={{ color: "red" }} />
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
