const fs = require("fs");
const { pipeline } = require("stream");
const { program } = require("commander");
const caesarCipher = require("./caesarCipher");
const create = require("./create");

program
  .option("-s , --shift <num>", "add shift number for Caesar Cipher code")
  .option("-i, --input [inputFile]", "add input file name")
  .option("-o, --output [outputFile]", "add output file name", "./output.txt")
  .option("-a, --action <type>", "Caesar Cipher code must have action")
  .parse();

program.parse(process.argv);
const options = program.opts();

const inputFile = options.input ? options.input : "./input.txt";
console.log(" Inputfile", inputFile);

if (options.input === undefined) {
  create(process.argv.slice(6, process.argv.length).join(" "));
}
const action = options.action;
const shift = options.shift;
const outputFile = options.output === true ? options.output : "./output.txt";
console.log(" Outputfile", outputFile);

const input = fs.createReadStream(inputFile, "utf-8");

let data = "";

// stream.on('data', chunk => data += chunk);
const transform = input.on("data", (chunk) => {
  let textForCode = (data += chunk);
  if (textForCode.length === 0) {
    throw Error("No text to encode or decode!");
  }
  console.log("Text for Ceaser Code: ", textForCode);
  console.log("with action: ", action);
  const result = caesarCipher(textForCode, shift, action);

  console.log("Text after Caesar Code: ", result);
  if (result.length === 0) {
    throw Error("No result text! Something went wrong...");
  }
});

// const output = fs.createWriteStream(outputFile);
// output.write(result);
// const output = fs.writeFile(outputFile, result, (err) => {
//   if (err) return console.log(err);
// });

// pipeline(input, transform, output, (err) => {

pipeline(input, transform, (err) => {
  if (err) {
    if (err.code !== "ENOENT") console.log("error: ", err);
  }
});

console.log("data", data);
// console.log("result", result);
console.log(" Inputfile", inputFile);
// console.log(" action ", action);
