"use strict";
const { Transform } = require("stream");
const caesarCipher = require("./caesarCipher");
const atbashCipher = require("./atbash");

const { ENCODE, DECODE, CAESAR, ATBASH, ROT8 } = require("./constants");

const transformTxtStream = (cipher, mode) => {
  return new Transform({
    transform(chunk, enc, cb) {
      const txtData = chunk.toString();
      const codeMode = mode === 1 ? ENCODE : DECODE;
      let resultTxt;
      if (cipher === CAESAR) {
        resultTxt = caesarCipher(txtData, 1, codeMode);
      }
      if (cipher === ROT8) {
        resultTxt = caesarCipher(txtData, 8, codeMode);
      }
      if (cipher === ATBASH) {
        resultTxt = atbashCipher(txtData);
      }
      cb(null, resultTxt);
    },
  });
};

module.exports = transformTxtStream;
