const fs = require("fs");
const { pipeline } = require("stream");
// const WritableStream = require("./writable");
process.stdin.setEncoding("utf8");
const getParams = require("./getParams");
const getCipherCollection = require("./getCipherCollection");

const args = process.argv;

const configCipher = getParams(args).configData;
const inputFile = getParams(args).inputFile;
const outputFile = getParams(args).outputFile;
const readStream =
  inputFile !== null ? fs.createReadStream(inputFile, "utf-8") : process.stdin;
const writeStream =
  outputFile !== null
    ? fs.createWriteStream(outputFile, { flags: "a" })
    : process.stdout;

const cipherArray = getCipherCollection(configCipher);

console.log("getParams(args)", getParams(args));
console.log("cipher config", getParams(args).configData);
console.log("input file", getParams(args).inputFile);
console.log("output file", getParams(args).outputFile);

pipeline(readStream, ...cipherArray, writeStream, (err) => {
  if (err) {
    console.log("Error: ", err);
  }
});

// get -i --input arg if no input file name then - use stdin as an input source for encoding / decoding
// get -o --output arg
// - use stdout as an output destination.

//If the input and/or output file is given but doesn't exist or you can't access it
//(e.g. because of permissions or it's a directory) - human-friendly error should be printed in stderr
//and the process should exit with non-zero status code.

//Each cipher is implemented in the form of a transform stream.
//Streams are piped inside each other according to config
// use .pipe streams instances method or pipeline
