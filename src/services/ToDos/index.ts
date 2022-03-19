/**
 * @namespace ToDos
 */

import GenericDAO from "../GenericDAO";

 const route = 'todos';
 
 export interface IGetToDos {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
 
 export interface IPostLoginTypes {
    userId: number;
    id?: number;
    title: string;
    completed: boolean;
 }
 
 const get = async (): Promise<IGetToDos[]> => GenericDAO.get(route);
 
 const getById = async (id: number): Promise<IGetToDos> => GenericDAO.get(route, id);
 
 const save = async (data: IPostLoginTypes) => GenericDAO.save(route, data);
 
 const edit = async (data: IPostLoginTypes | any, id: number) => GenericDAO.save(route, data, id);
 
 export default {
   get,
   getById,
   save,
   edit
 };
 