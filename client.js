const fetch = require("node-fetch");

async function fetchRootDirectory() {
  let response = await fetch("http://localhost:3000");
  let rootDirectory = await response.json();
  return rootDirectory;
}

async function getRootDirectoryFiles(directory) {
  let response = await fetch(`http://localhost:3000/${directory.name}`);
  let filesEachDirectory = await response.json();
  return filesEachDirectory;
}

async function getFilesEachDirectory(directories) {
  let promises = directories.map(async (directory) => {
    return await getRootDirectoryFiles(directory);
  });
  
  return Promise.all(promises);
}

async function main() {
  try {
    let rootDirectory = await fetchRootDirectory();
    let directories = rootDirectory.items.filter((item) => item.isDir === true);
    let filesEachDirectory = await getFilesEachDirectory(directories);
    console.log(filesEachDirectory);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
