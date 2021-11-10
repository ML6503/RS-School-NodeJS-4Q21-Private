const { argError } = require("./error");

function atbashCipher(str) {
  if (typeof str !== "string")
    throw new argError("Atbash Cipher accepts only string as argument");
  const lowerCaseStr = str.toLowerCase();
  const abc = "abcdefghijklmnopqrstuvwxyz".split("");
  const zyx = "abcdefghijklmnopqrstuvwxyz".split("").reverse();
  let newStr = "";

  for (let i = 0; i < lowerCaseStr.length; i++) {
    let currentLetter = lowerCaseStr[i];
    let currentIndex = abc.indexOf(currentLetter);

    if (currentLetter === " " || currentIndex === -1) {
      newStr += currentLetter;
      continue;
    }

    if (str[i] === str[i].toUpperCase()) {
      newStr += zyx[currentIndex].toUpperCase();
    } else {
      newStr += zyx[currentIndex];
    }
  }

  return newStr;
}

// atbashCipher("bla_"); // yoz_
module.exports = atbashCipher;
