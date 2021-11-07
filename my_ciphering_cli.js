const fs = require("fs");
const { pipeline } = require("stream");
const WritableStream = require("./writable");
process.stdin.setEncoding("utf8");

const args = process.argv;
const config = args.slice(2, args.length);
let configData;
let inputFile;
let outputFile;
let readStream;
let writeStream;

// get config -c --config if not throw error
//In case of invalid confing human-friendly error should be printed in stderr
//and the process should exit with non-zero status code.
const configParam = config.filter((a) =>
  a === "-c" || a === "--config" ? a : null
);

const inputFileParam = config.filter((a) =>
  a === "-i" || a === "--input" ? a : null
);

const outputFileParam = config.filter((a) =>
  a === "-o" || a === "--output" ? a : null
);

if (configParam.length > 1) {
  throw new Error("Enter only one config for cipher coding");
}
if (configParam.length === 0) {
  throw new Error("Enter a config for cipher");
} else {
  configData = config[config.indexOf(configParam[0]) + 1];
}
if (inputFileParam.length > 1) {
  throw new Error("Enter only one input file name for cipher coding");
}
if (inputFileParam.length === 1) {
  inputFile = config[config.indexOf(inputFileParam[0]) + 1];
  readStream = fs.createReadStream(inputFile, "utf-8");
}
if (inputFileParam.length === 0) {
  readStream = process.stdin;
}
if (outputFileParam.length > 1) {
  throw new Error("Enter only one output file name for cipher coding");
}
if (outputFileParam.length === 1) {
  outputFile = config[config.indexOf(outputFileParam[0]) + 1];
  writeStream = new WritableStream(outputFile);
}
if (outputFileParam.length === 0) {
  writeStream = process.stdout;
}

console.log("cipher config", configData);
console.log("input file", inputFile);
console.log("output file", outputFile);

pipeline(readStream, writeStream, (err) => {
  if (err) {
    console.log("Error: ", err);
  }
});
//check if any options like -c config does not repeat
//if repeat - throw error - error should be printed in stderr
//and the process should exit with non-zero status code.

// get -i --input arg if no input file name then - use stdin as an input source for encoding / decoding
// get -o --output arg
// - use stdout as an output destination.

//If the input and/or output file is given but doesn't exist or you can't access it
//(e.g. because of permissions or it's a directory) - human-friendly error should be printed in stderr
//and the process should exit with non-zero status code.

//Each cipher is implemented in the form of a transform stream.
//Streams are piped inside each other according to config
// use .pipe streams instances method or pipeline
