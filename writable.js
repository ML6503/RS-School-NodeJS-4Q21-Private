const { Writable } = require("stream");
const fs = require("fs");
const { fileError, errorHandler } = require("./error");

class WritableStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(callback) {
    fs.open(this.filename, "r+", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    fs.readFile(this.filename, { encoding: "utf8" }, (err, data) => {
      if (err) {
        process.exitCode = 1;
        throw new fileError("Read File Error: ", err.message);
      }
      const newData = data + chunk.toString() + "\n";
      fs.writeFile(this.filename, newData, "utf8", (error) => {
        if (error) {
          process.exitCode = 1;
          throw new fileError("Write File Error: ", error.message);
        }
      });
    });

    callback();
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = WritableStream;
