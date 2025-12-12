const fs = require("fs");
const path = require("path");

const BUILD_DIR = "build";

// clean build folder
fs.rmSync(BUILD_DIR, { recursive: true, force: true });
fs.mkdirSync(BUILD_DIR);

// files & folders to include
const FILES = ["manifest.json", "popup.html"];

const DIRS = ["js", "icons", "dist"];

// copy files
FILES.forEach((file) => {
  fs.copyFileSync(file, path.join(BUILD_DIR, file));
});

// copy directories
DIRS.forEach((dir) => {
  fs.cpSync(dir, path.join(BUILD_DIR, dir), { recursive: true });
});

console.log("✅ Production build ready in /build");
