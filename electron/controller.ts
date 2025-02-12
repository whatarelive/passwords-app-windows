import { ipcMain } from "electron";
import { addUser } from "./database/functions/users";
import type { IAddUser } from "./interfaces";

ipcMain.handle('user-add', (_event, user: IAddUser) => addUser(user));