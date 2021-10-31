const fs = require("fs");

async function init(name) {
  try {
    // try to read file
    await fs.promises.readFile(name);
  } catch (error) {
    // create empty file, because it wasn't found
    if (error) console.log("No input file, but we create input.txt");
    await fs.promises.writeFile(name, "", (err) => {
      if (err) console.log("Error: ", err);
    });
  }
}

async function create(content, fileName = "input.txt") {
  console.log("we are in create & file name is", fileName);
  await init(fileName);

  fs.writeFile(fileName, content, (error) => {
    if (error) return console.error("Error", error.message);
    console.log("Initial text is in input.txt file");
  });
}

module.exports = create;
