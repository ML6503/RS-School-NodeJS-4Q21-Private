const areArgInvalid = (a, b) => {
  return !(typeof a === "number" && typeof b === "number");
};

const sum = (a, b) => {
  c;
  if (areArgInvalid(a, b)) throw new invalidArgError("Some args are incorrect");
  return a + b;
};

class invalidArgError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "Invalid Argument Error";
    this.isCustom = true;
  }
}

const errorHandler = (err) => {
  const { isCustom } = err;
  if (isCustom) {
    console.log("Argument Input Error: ", err.name);
    console.log("Application is stil in process, enter missing argument.");
  } else {
    throw err;
  }
};

try {
  sum(1, "5");
} catch (e) {
  errorHandler(e);
}

setInterval(() => {}, 1000);
