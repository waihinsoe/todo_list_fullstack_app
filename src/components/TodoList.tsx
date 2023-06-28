import { useContext, useState } from "react";
import TodoListItem from "./TodoListItem";
import { AppContext } from "@/contexts/AppContext";
import { config } from "@/config";
import type { todos as Todo } from "@prisma/client";

const TodoList = () => {
  const { todos, isLoading, fetchData } = useContext(AppContext);
  const [titleValue, setTitleValue] = useState("");
  const [todoValue, setTodoValue] = useState("");
  const [changeInput, setChangeInput] = useState(0);

  // const addTodo = async () => {
  //   if (!inputValue.name) return alert("require some text.");
  //   const response = await fetch(`${config.apiBaseUrl}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(inputValue),
  //   });

  //   if (response.ok) {
  //     setInputValue({ ...inputValue, name: "" });
  //     fetchData();
  //   }
  // };
  if (isLoading) return <div>loading....</div>;
  return (
    <div className="flex flex-col w-[500px] gap-4">
      <h1 className="text-3xl text-center text-white uppercase">
        Todo List App
      </h1>
      <div className="flex overflow-hidden transition-all rounded-sm hover:scale-105">
        {changeInput === 0 && (
          <input
            name="text"
            id="text"
            value={titleValue}
            placeholder="Enter title"
            autoFocus
            className="h-[50px] w-3/4 pl-1 focus:outline-none text-lg"
            onChange={(evt) => setTitleValue(evt.target.value)}
            onKeyUp={(evt) => {
              if (evt.key === "Enter") {
                setChangeInput(1);
                setTodoValue("");
              }
            }}
          />
        )}
        {changeInput === 1 && (
          <input
            name="text"
            id="text"
            value={todoValue}
            autoFocus
            placeholder="Enter todos"
            onChange={(evt) => setTodoValue(evt.target.value)}
            className="h-[50px] w-3/4 pl-1 focus:outline-none text-lg"
            onKeyUp={(evt) => {
              if (evt.key === "Enter") {
                setChangeInput(0);
                setTitleValue("");
              }
            }}
          />
        )}
        <button
          className="bg-[#176B87] w-1/4 text-white disabled:bg-red-400"
          disabled
          // onClick={addTodo}
        >
          ADD
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {todos.map((item) => (
          <TodoListItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
