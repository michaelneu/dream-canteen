const path = require("path");
const url = require("url");
const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  mainWindow.menuBarVisible = false;
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    }),
  );
});

app.on("window-all-closed", function () {
  app.quit();
});
