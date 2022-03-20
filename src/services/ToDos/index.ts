/**
 * @namespace ToDos
 */

import GenericDAO from "../GenericDAO";

 const route = 'todos';
 
 export interface IGetToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
 
 export interface IPostToDo {
    userId: number;
    id?: number;
    title: string;
    completed: boolean;
 }
 
 const get = async (): Promise<IGetToDo[]> => GenericDAO.get(route);
 
 const getById = async (id: number): Promise<IGetToDo> => GenericDAO.get(route, id);
 
 const save = async (data: IPostToDo) => GenericDAO.save(route, data);
 
 const edit = async (data: IPostToDo | any, id: number) => GenericDAO.save(route, data, id);
 
 export default {
   get,
   getById,
   save,
   edit
 };
 