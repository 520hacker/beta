const electron = require("electron");
const { app, Menu, crashReporter, BrowserWindow } = electron;
const path = require("path");

let mainWindow = null;

// TODO: Gracefully request permission to send crash report after a crash.

app.on("window-all-closed", () => {
  app.quit();
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    // titleBarStyle: "hidden",
    show: false,
    titleBarStyle: "hiddenInset",
    backgroundColor: "#000",
    width: 1080,
    height: 800,
    minHeight: 760,
    maxHeight: 900,
    minWidth: 1080,
    maxWidth: 1080,
    icon: path.join(__dirname, "icons/png/64x64.png"),
    webPreferences: {
      webSecurity: false
    }
  });

  const template = [
    {
      label: "Edit",
      submenu: [
        {
          role: "undo"
        },
        {
          role: "redo"
        },
        {
          type: "separator"
        },
        {
          role: "cut"
        },
        {
          role: "copy"
        },
        {
          role: "paste"
        },
        {
          role: "pasteandmatchstyle"
        },
        {
          role: "delete"
        },
        {
          role: "selectall"
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          role: "reload"
        },
        {
          role: "forcereload"
        },
        {
          role: "toggledevtools"
        },
        {
          type: "separator"
        },
        {
          role: "resetzoom"
        },
        {
          role: "zoomin"
        },
        {
          role: "zoomout"
        },
        {
          type: "separator"
        },
        {
          role: "togglefullscreen"
        }
      ]
    },
    {
      role: "window",
      submenu: [
        {
          role: "minimize"
        },
        {
          role: "close"
        }
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click() {
            require("electron").shell.openExternal(
              "https://morpheuswallet.com/"
            );
          }
        }
      ]
    }
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          role: "about"
        },
        {
          type: "separator"
        },
        {
          role: "services",
          submenu: []
        },
        {
          type: "separator"
        },
        {
          role: "hide"
        },
        {
          role: "hideothers"
        },
        {
          role: "unhide"
        },
        {
          type: "separator"
        },
        {
          role: "quit"
        }
      ]
    });

    // Edit menu
    template[1].submenu.push(
      {
        type: "separator"
      },
      {
        label: "Speech",
        submenu: [
          {
            role: "startspeaking"
          },
          {
            role: "stopspeaking"
          }
        ]
      }
    );
    // Window menu
    template[3].submenu = [
      {
        role: "close"
      },
      {
        role: "minimize"
      },
      {
        role: "zoom"
      },
      {
        type: "separator"
      },
      {
        role: "front"
      }
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow.setMenu(null); // TODO: does this work?

  // load the local HTML file
  let url = require("url").format({
    protocol: "file",
    slashes: true,
    pathname: require("path").join(__dirname, "/dist/index.html")
  });
  mainWindow.loadURL(url);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
});
