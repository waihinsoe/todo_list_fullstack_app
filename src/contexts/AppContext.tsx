import { use, useEffect, useState } from "react";
import { createContext } from "react";
import type { todos as Todo } from "@prisma/client";
import { config } from "@/config";
interface DefaultAppContextType {
  todos: Todo[];
  updateData: (value: any) => void;
  fetchData: () => void;
  isLoading: Boolean;
}

const defaultAppContext: DefaultAppContextType = {
  todos: [],
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
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    updateData({ ...data, isLoading: true });
    const response = await fetch(`${config.apiBaseUrl}`);
    if (response.ok) {
      const responseJson = await response.json();

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
