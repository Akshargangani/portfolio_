const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'portfolio');
const destDir = __dirname;

try {
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    fs.renameSync(srcPath, destPath);
    console.log(`Moved ${file}`);
  }
  fs.rmdirSync(srcDir);
  console.log("Successfully moved all files and removed the 'portfolio' folder!");
} catch (error) {
  console.error("Error moving files:", error);
}
