const ReadableStream = require("../readable");
const { Readable } = require("stream");
const { fileError } = require("../error");

const mockReadStream = jest.fn().mockImplementation(() => {
  const readable = new Readable();
  readable.push("This is secret. Message about _ symbol!");
  readable.push("\n");
  readable.push(null);

  return readable;
});

const mockFile = jest.fn().mockImplementation(() => {
  return {
    createReadStream: mockReadStream,
  };
});

describe("ReadableStream testing", () => {
  test("Readable Stream read from file expected string", () => {
    expect(new ReadableStream("input.txt")._readableState.buffer.data).toBe(
      mockReadStream()._readableState.buffer.data
    );
  });
});
