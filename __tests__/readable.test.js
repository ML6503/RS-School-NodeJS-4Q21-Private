const ReadableStream = require("../readable");
const { Readable } = require("stream");
const { mockReadStream } = require("../__mocks__/readable");

describe("ReadableStream testing", () => {
  test("Readable Stream read from file expected string", () => {
    expect(new ReadableStream("input.txt")._readableState.buffer.data).toBe(
      mockReadStream()._readableState.buffer.data
    );
  });

  test("Readable Stream read from file expected string", () => {
    let result = new ReadableStream("input.txt");
    expect(result).toBeInstanceOf(Readable);
  });
});
