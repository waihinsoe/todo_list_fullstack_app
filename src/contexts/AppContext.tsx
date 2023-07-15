import { useEffect, useState } from "react";
import { createContext } from "react";
import type { todos as Todo, users as User } from "@prisma/client";

import { config } from "@/config";
import { useSession } from "next-auth/react";
interface DefaultAppContextType {
  user: User | null;
  todos: Todo[];
  archivedTodos: Todo[];
  updateData: (value: any) => void;
  fetchData: () => void;
  isLoading: Boolean;
}

const defaultAppContext: DefaultAppContextType = {
  user: null,
  todos: [],
  archivedTodos: [],
  updateData: () => {},
  fetchData: () => {},
  isLoading: true,
};

export const AppContext =
  createContext<DefaultAppContextType>(defaultAppContext);

interface Props {
  children: JSX.Element;
}
const AppProvider = ({ children }: Props) => {
  const [data, updateData] = useState(defaultAppContext);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);
  console.log("data :", data);
  const fetchData = async () => {
    updateData({ ...data, isLoading: true });
    const response = await fetch(`${config.apiBaseUrl}`);
    if (response.ok) {
      const responseJson = await response.json();
      console.log("responseJson :", responseJson);
      updateData({ ...data, ...responseJson, isLoading: false });
    }
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
