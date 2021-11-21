const { Readable } = require("stream");

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

module.exports = { mockReadStream };
