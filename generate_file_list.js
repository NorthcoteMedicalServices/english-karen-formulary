const fs = require('fs').promises;
const path = require('path');

/**
 * Recursively gathers all file paths in the given directory.
 * @param {string} dir - The directory to search.
 * @returns {Promise<string[]>} - A promise that resolves to an array of absolute file paths.
 */
async function getAllFiles(dir) {
  let files = [];
  // Read directory entries with file type information.
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  // Process each entry and recurse for subdirectories
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.includes('.git')) {   // Don't cache .git files since they're only for dev
      files = files.concat(await getAllFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const baseDir = __dirname;
  
  // Get all files recursively.
  const allFiles = await getAllFiles(baseDir);
  
  // Convert absolute paths to a relative path starting with './'
  const relativePaths = allFiles.map(file => {
    let relative = path.relative(baseDir, file);
    // Convert Windows backslashes to forward slashes.
    relative = relative.split(path.sep).join('/');
    if (!relative.startsWith('./')) {
      relative = './' + relative;
    }
    return encodeURI(relative); // encodeURI before returning to handle complicated drug_images filenames
  });

  const outputPath = path.join(baseDir, 'file_list.json');
  await fs.writeFile(outputPath, JSON.stringify(relativePaths, null, 2), 'utf8');
  
  console.log(`file_list.json generated with ${relativePaths.length} files.`);
}

main().catch(err => {
  console.error('Error generating file list:', err);
});
