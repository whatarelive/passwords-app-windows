import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow, ipcMain } from 'electron';
import { changeReadWritePermissions } from "./database/helpers/file-permissions";
import { checkSession, clearSession } from './database/functions/session';
import { addUser, deleteUser, editUser, verifyUser } from "./database/functions/users";
import { getAllActivity } from './database/functions/activities';
import { addWebAccount, deleteAllWebAccounts, deleteWebAccount, editWebAccount, getAllWebAccounts } from './database/functions/web-accounts';
import type { IAddActivity, IAddUser, IEditUser, IAddWebAccount, IDeleteUser, IEditWebAccount } from "./interfaces";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, '../public/password.svg'),
    width: 600,
    height: 800,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// User Actions 
ipcMain.handle('user-add', (_event, user: IAddUser) => addUser(user));
ipcMain.handle('user-edit', (_event, { id, password }: IEditUser) => editUser({ id, password }));
ipcMain.handle('user-verify', (_event, user:IAddUser) => verifyUser(user));
ipcMain.handle('user-delete', (_event, { id }: IDeleteUser) => deleteUser({ id }));

// Session Actions
ipcMain.handle('session-check', (_event) => checkSession());
ipcMain.handle('session-clear', (_event) => clearSession());

// Web Accounts Actions
ipcMain.handle('webAccount-add', (_event, account: IAddWebAccount) => addWebAccount(account));
ipcMain.handle('webAccount-edit', (_event, account: IEditWebAccount) => editWebAccount(account));
ipcMain.handle('webAccount-getAll', (_event, { userId }: Pick<IAddWebAccount, 'userId'>) => getAllWebAccounts({ userId }));
ipcMain.handle('webAccount-delete', (_event, { id }: Pick<IEditWebAccount, 'id'>) => deleteWebAccount({ id }));
ipcMain.handle('webAccount-deleteAll', (_event, { userId }: Pick<IAddWebAccount, 'userId'>) => deleteAllWebAccounts({ userId }));

// Activities Actions
ipcMain.handle('activities-getAll', (_event, { userId }: Pick<IAddActivity, "userId">) => getAllActivity({ userId }));

app.whenReady().then(() => {
  // Habilitamos los permisos de lectura y escritura.
  changeReadWritePermissions('grant'); 

  createWindow();
})

app.on('before-quit', () => {
  // Desabilitamos los permisos de lectura y escritura.
  changeReadWritePermissions('deny'); 
})