class argError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "Argument Error";
    this.isCustomArg = true;
  }
}

class fileError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "File Access Error";
    this.isFileAccess = true;
  }
}

const errorHandler = (err) => {
  const { isCustomArg, isFileAccess } = err;

  if (isCustomArg) {
    // console.log("Argument Input Error: ", err.stderr.toString());
    console.error("Argument Input Error: ", err.message);
    process.exitCode = 1;
  }
  if (isFileAccess) {
    // console.log("File Access Error: ", err.stderr.toString());
    process.exitCode = 1;
    return console.error("File Access Error: ", err.message);
  } else {
    console.error("Error: ", err.message);
    process.exitCode = 1;
  }
};

module.exports = { errorHandler, fileError, argError };
