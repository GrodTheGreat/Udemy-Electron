// Modules
const { app, BrowserWindow } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
    // Don't show window (immediately, we show later on)
    // show: false,
    // Useful to give better illusion of rapid load
    backgroundColor: "#2B2E3B",
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");
  // Remember, electron uses a Chromium browser, so we can load web pages
  // mainWindow.loadURL("https://google.com");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Wait to render the page until it's ready
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", () => {
  console.log(app.getPath("desktop"));
  console.log(app.getPath("music"));
  console.log(app.getPath("temp"));
  console.log(app.getPath("userData"));

  createWindow();
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// app.on("before-quit", () => {
//   console.log("before-quit");
// });

// app.on("browser-window-blur", () => {
//   console.log("browser-window-blur");
//   setTimeout(app.quit, 3000);
// });

// app.on("browser-window-focus", () => {
//   console.log("browser-window-focus");
// });

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
