const { expect } = require("@jest/globals");
const fs = require("fs");
const { runCiphering } = require("../my_ciphering_cli");

describe("runCiphering testing Success scenarios", () => {
  // Input: User passes correct sequence of symbols as argument for --config that matches regular expression;
  // Result: test passed
  test("runCipher func accepts sequence of symbols as argument for --config that matches pattern {XY(-)}n", () => {
    process.argv = [
      "node",
      "./my_ciphering_cli",
      "-c",
      "C1-C1-R0-A",
      "-i",
      "./input.txt",
      "-o",
      "./output.txt",
    ];

    try {
      runCiphering();
    } finally {
      const inputFileText = fs.readFileSync(
        "input.txt",
        "utf8",
        function (err, data) {
          return data;
        }
      );

      const outputFileText = fs.readFileSync(
        "output.txt",
        "utf8",
        function (err, data) {
          return data;
        }
      );
      expect(inputFileText).toBe("This is secret. Message about _ symbol!");
      expect(outputFileText).toContain(
        "Myxn xn nbdobm. Tbnnfzb ferlm _ nhteru!"
      );
    }
  });
});
