const { app, BrowserWindow, screen, globalShortcut } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 150,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const { workAreaSize } = screen.getPrimaryDisplay();
  const windowSize = win.getSize();
  const x = workAreaSize.width - windowSize[0];
  const y = workAreaSize.height - windowSize[1];

  win.setPosition(x, y);

  win.loadFile("index.html");

  win.on("close", (event) => {
    // Check if user really wants to close the app
    const choice = require("electron").dialog.showMessageBoxSync(win, {
      type: "question",
      buttons: ["Yes", "No"],
      title: "Confirm",
      message: "Do you really want to quit?",
    });

    if (choice === 1) {
      event.preventDefault();
    }
  });

  win.on("closed", function () {
    win = null;
  });
}

app.on("browser-window-focus", function () {
  globalShortcut.register("CommandOrControl+R", () => {
    console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
    console.log("F5 is pressed: Shortcut Disabled");
  });
});

app.on("browser-window-blur", function () {
  globalShortcut.unregister("CommandOrControl+R");
  globalShortcut.unregister("F5");
});

app
  .whenReady()
  .then(() => {
    globalShortcut.register("CommandOrControl+R", () => {
      console.log("Disabled CommandOrControl+R!");
    });
  })
  .then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
