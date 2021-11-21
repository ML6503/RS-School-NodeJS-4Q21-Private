const { expect } = require("@jest/globals");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { PassThrough } = require("stream");
const { runCiphering } = require("../my_ciphering_cli");
const getParams = require("../getParams");

describe("runCiphering testing Success scenarios", () => {
  const testAppFilePath = path.join(__dirname, "../my_ciphering_cli.js");
  const testApp = spawn("node", [testAppFilePath]);

  afterEach(() => jest.clearAllTimers());
  // Input: User passes correct sequence of symbols as argument for --config that matches regular expression;
  // Result: test passed
  test("runCipher func accepts sequence of symbols as argument for --config that matches pattern {XY(-)}n", async () => {
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

      expect(inputFileText).toBe("This is secret. Message about _ symbol!");

      const outputFileText = fs.readFileSync(
        "output.txt",
        "utf8",
        function (err, data) {
          return data;
        }
      );
      expect(outputFileText).toContain(
        "Myxn xn nbdobm. Tbnnfzb ferlm _ nhteru!"
      );
    }
  });

  test("runCipher func accepts 'C1-C0-A-R1-R0-A-R0-R0-C1-A' and if no --output prints to console", () => {
    process.argv = [
      "node",
      "./my_ciphering_cli",
      "-c",
      "C1-C0-A-R1-R0-A-R0-R0-C1-A",
      "-i",
      "./input.txt",
    ];

    const inputFileText = fs.readFileSync(
      "input.txt",
      "utf8",
      function (err, data) {
        return data;
      }
    );

    expect(inputFileText).toBe("This is secret. Message about _ symbol!");
    testApp.stdout.on("data", (data) => {
      const stdoutData = JSON.parse(data.toString());
      expect(stdoutData.msg).toBe('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!');

      testApp.kill("SIGINT");
      done();
      process.exit(1);
    });
  });
});
