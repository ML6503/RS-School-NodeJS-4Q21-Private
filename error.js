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
    console.error("Argument Input Error: ", err);
  }
  if (isFileAccess) {
    // console.log("File Access Error: ", err.stderr.toString());
    console.error("File Access Error: ", err);
  } else {
    console.error("Error: ", err);
  }
};

// try {
//   sum(1, "5");
// } catch (e) {
//   errorHandler(e);
// }
module.exports = { errorHandler, fileError, argError };
