const transformTxtStream = require("./transform");
const { ATBASH } = require("./constants");

const getCipherCollection = (configCipher) => {
  const configCipherArray = configCipher.split("-");
  const cipherCollection = configCipherArray.map((c) =>
    c.charAt(0) === ATBASH
      ? (c = transformTxtStream(c.charAt(0)))
      : (c = transformTxtStream(c.charAt(0), Number(c.charAt(1))))
  );
  //   const cipherCollection = configCipherArray.map((c) =>
  //     transformTxtStream(c.charAt(0), c.charAt(1))
  //   );
  //   console.log("configCipherArray ", cipherCollection);
  return cipherCollection;
};

module.exports = getCipherCollection;
