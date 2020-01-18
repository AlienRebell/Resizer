const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");
const fs = require('fs-extra');
const appName = app.getName();
let mainWindow;

const getAppPath = path.join(app.getPath('appData'), appName);


function createWindow()
{
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true
        }
      })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'dist', 'electron-app', 'index.html'),
            protocol: "file",
            slashes: true
        })
    );

    mainWindow.on("closed", function(){
        mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', function(){
    if(mainWindow === null)
    {
        createWindow();
    }
});