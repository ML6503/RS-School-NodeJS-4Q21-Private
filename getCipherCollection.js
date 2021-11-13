const transformTxtStream = require("./transform");
const { argError } = require("./error");
const { ATBASH, CAESAR, ROT8 } = require("./constants");

const getCipherCollection = (configCipher) => {
  const configCipherArray = configCipher.split("-");
  configCipherArray.map((c) => {
    if (
      c.charAt(0) !== ATBASH &&
      c.charAt(0) !== CAESAR &&
      c.charAt(0) !== ROT8
    ) {
      process.exitCode = 1;
      throw new argError(
        "Ciphering CLI accepts only 'C', 'A' and 'R' as ciphering configuration option"
      );
    }
    if (Number(c.charAt(1)) !== 0 && Number(c.charAt(1)) !== 1) {
      process.exitCode = 1;
      throw new argError(
        "Ciphering CLI accepts only 1 to code or 0 to decode as ciphering configuration option"
      );
    }
  });

  const cipherCollection = configCipherArray.map((c) =>
    c.charAt(0) === ATBASH
      ? (c = transformTxtStream(c.charAt(0)))
      : (c = transformTxtStream(c.charAt(0), Number(c.charAt(1))))
  );

  return cipherCollection;
};

module.exports = getCipherCollection;
