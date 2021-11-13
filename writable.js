const { Writable } = require("stream");
const fs = require("fs");
const { fileError, errorHandler } = require("./error");

class WritableStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(callback) {
    // fs.open(this.filename, "a", (err, fd) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     this.fd = fd;
    //     callback();
    //   }
    // });

    try {
      if (fs.existsSync(this.filename)) {
        fs.open(this.filename, "a", (err, fd) => {
          if (err) {
            callback(err);
          } else {
            this.fd = fd;
            callback();
          }
        });
      } else {
        process.exitCode = 1;
        throw new fileError(`${this.filename}  doesn't exists`);
      }
    } catch (err) {
      errorHandler(err);
      this._destroy(err, callback);
    }
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk + "\n", callback);
  }

  _flush(cb) {
    this.push("\n");
    cb();
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
