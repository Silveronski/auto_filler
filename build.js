const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const BUILD_DIR = "build";
const ZIP_NAME = path.join(BUILD_DIR, "auto_filler.zip");

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

const output = fs.createWriteStream(ZIP_NAME);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.pipe(output);

archive.directory(BUILD_DIR, false);

archive.finalize();

output.on("close", () => {
  console.log(`✅ Build complete`);
});
