// main.js

// modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

// set environment
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

const createWindow = () => {
    // create the browser window
    const mainWindow = new BrowserWindow({
        width: isDev ? 1200 : 960,
        height: 800,
        // use absolute path to prevent issues with packaging
        icon: `${__dirname}/assets/icons/cellino_icon_greyscale.png`,
        resizable: isDev,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    // load the index html file for the app
    mainWindow.loadFile(`${__dirname}/app/index.html`)

    // open DevTools
    if (isDev) mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    // const mainMenu = Menu.buildFromTemplate(menu)
    // Menu.setApplicationMenu(mainMenu)

    mainWindow.on('close', () => mainWindow = null)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// incorporate native system behaviors
app.on('window-all-closed', () => {
    if (!isMac) app.quit()
})

const menu = [
    {
        label: 'File',
        submenu: {
            label: 'Quit',
            click: () => app.quit()
        }
    }
]
