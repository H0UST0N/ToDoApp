import React, { createContext, ReactNode } from 'react';

import useToDos from '../hooks/useToDos';
import { IGetToDo } from '../services/ToDos';

type ToDoContextProps = {
  children: ReactNode;
};

type ToDoContextType = {
  dataIsLoaded: boolean;
  toDos: IGetToDo[];
  onRefresh: ()=> void;
};

const ToDosContext = createContext<ToDoContextType>({} as ToDoContextType);

function ToDosProvider({ children }: ToDoContextProps) {
  const {
    dataIsLoaded, toDos, onRefresh
  } = useToDos();

  return (
    <ToDosContext.Provider value={{ dataIsLoaded, toDos, onRefresh }}>
      {children}
    </ToDosContext.Provider>
  );
}

export { ToDosContext, ToDosProvider };