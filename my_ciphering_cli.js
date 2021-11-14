const fs = require("fs");
const { pipeline } = require("stream");
const WritableStream = require("./writable");
const ReadableStream = require("./readable");

const getParams = require("./getParams");
const getCipherCollection = require("./getCipherCollection");
const { errorHandler } = require("./error");

const runCiphering = () => {
  const args = process.argv;

  const configCipher = getParams(args).configData;
  // get -i --input arg
  const inputFile = getParams(args).inputFile;
  // get -o --output arg
  const outputFile = getParams(args).outputFile;
  // if no input file name then - use stdin as an input source for encoding / decoding
  const readStream =
    inputFile !== null
      ? // ? fs.createReadStream(inputFile, "utf-8")
        new ReadableStream(inputFile)
      : process.stdin;

  readStream.setEncoding("utf8");

  // use stdout as an output destination if no output file exists or no permission
  const writeStream =
    outputFile !== null
      ? // ? fs.createWriteStream(outputFile, { flags: "a" })
        new WritableStream(outputFile)
      : process.stdout;

  //Each cipher is implemented in the form of a transform stream.
  const cipherArray = getCipherCollection(configCipher);

  console.log("cipher config", getParams(args).configData);
  console.log("input file", getParams(args).inputFile);
  console.log("output file", getParams(args).outputFile);

  //Streams are piped inside each other according to config
  // use .pipe streams instances method or pipeline
  pipeline(readStream, ...cipherArray, writeStream, (err) => {
    if (err) {
      console.error("Error: ", err.message);
      // errorHandler(err);
      process.exitCode = 1;
    }
  });
};

// runCiphering();

try {
  runCiphering();
} catch (err) {
  errorHandler(err);
}

//If the input and/or output file is given but doesn't exist or you can't access it
//(e.g. because of permissions or it's a directory) - human-friendly error should be printed in stderr
//and the process should exit with non-zero status code.
