const WritableStream = require("../writable");
const { Writable } = require("stream");
const { runCiphering } = require("../my_ciphering_cli");
jest.mock("stream");
beforeEach(() => Writable.mockClear());

describe("WritableStream testing", () => {
  test("Writable Stream expected to be called from my_ciphering_cli", () => {
    process.argv = [
      "node",
      "./my_ciphering_cli",
      "-c",
      "A-A-A-R1-R0-R0-R0-C1-C1-A",
      "-i",
      "./input.txt",
      "-o",
      "./output.txt",
    ];

    try {
      runCiphering();
    } finally {
      expect(Writable).toHaveBeenCalled();
    }
  });

  test("Writable Stream is expected te be instance of Writable", () => {
    let result = new WritableStream();
    expect(result).toBeInstanceOf(Writable);
  });
});
