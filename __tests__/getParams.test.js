const getParams = require("../getParams");
const { argError } = require("../error");

describe("getParams func testing - Error scenarios", () => {
  // User passes the same cli argument twice; Result: Error message is shown
  test("User passes the same cli argument twice - error is thrown", () => {
    const args = (process.argv = [
      "node",
      "./my_ciphering_cli",
      "-c",
      "C1-C0-A-R1-R0-A-R0-R0-C1-A",
      "-i",
      "./input.txt",
      "-c",
      "C1-",
    ]);
    expect(() => getParams(args)).toThrow(argError);
  });
  // Input: User doesn't pass -c or --config argument; Result: Error message is shown;
  test("User doesn't pass -c or --config argument - error is thrown", () => {
    const args = (process.argv = [
      "node",
      "./my_ciphering_cli",
      "-i",
      "./input.txt",
    ]);
    expect(() => getParams(args)).toThrow(argError);
  });

  // Input: User passes -i argument with path that doesn't exist or with no read access;
  // Result: Error message is shown;
  test("User passes -i argument with path that doesn't exist / no access - error is thrown", () => {
    const args = (process.argv = [
      "node",
      "./my_ciphering_cli",
      "-i",
      "./newFolder/input.txt",
    ]);
    expect(() => getParams(args)).toThrow(argError);
  });

  // Input: User passes -o argument with path to directory that doesn't exist or with no read access;
  // Result: Error message is shown;
  test("User passes -o argument with path to directory that doesn't exist / no access - error is thrown", () => {
    const args = (process.argv = [
      "node",
      "./my_ciphering_cli",
      "-o",
      "./newFolder/input.txt",
    ]);
    expect(() => getParams(args)).toThrow(argError);
  });

  // Input: User passes incorrent symbols in argument for --config; Result: Error message is shown;
  test("User passes incorrent symbols in argument for --config - error is thrown", () => {
    const args = (process.argv = [
      "node",
      "./my_ciphering_cli",
      "-r",
      "./newFolder/input.txt",
    ]);
    expect(() => getParams(args)).toThrow(argError);
  });
});
