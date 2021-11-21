const { argError } = require("./error");
// get config -c --config if not throw error
//In case of invalid confing human-friendly error should be printed in stderr
//and the process should exit with non-zero status code.

const getParams = (args) => {
  const config = args.slice(2, args.length);
  let configData;
  let inputFile;
  let outputFile;

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
    throw new argError("Enter only one config for cipher coding");
  }
  if (configParam.length === 0) {
    throw new argError("Enter a config for cipher");
  }
  if (configParam.length > 0) {
    configData = config[config.indexOf(configParam[0]) + 1];
  }
  //check if any options like -c config does not repeat
  //if repeat - throw error - error should be printed in stderr
  //and the process should exit with non-zero status code.

  if (configParam.length > 1) {
    throw new argError("Enter only one config for cipher");
  }
  if (inputFileParam.length > 1) {
    throw new argError("Enter only one input file name for cipher coding");
  }
  if (inputFileParam.length === 1) {
    inputFile = config[config.indexOf(inputFileParam[0]) + 1];
    //   readStream = fs.createReadStream(inputFile, "utf-8");
  }
  if (inputFileParam.length === 0) {
    //   readStream = process.stdin;
    inputFile = null;
  }
  if (outputFileParam.length > 1) {
    throw new argError("Enter only one output file name for cipher coding");
  }
  if (outputFileParam.length === 1) {
    outputFile = config[config.indexOf(outputFileParam[0]) + 1];
  }
  if (outputFileParam.length === 0) {
    outputFile = null;
  }

  return { configData, inputFile, outputFile };
};

module.exports = getParams;
