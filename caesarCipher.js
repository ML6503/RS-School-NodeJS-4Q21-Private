const { ENCODE, DECODE } = require("./constants");
const { argError } = require("./error");

module.exports = function caesarCipher(str, num, action) {
  if (typeof str !== "string")
    throw new argError(
      "Caesar and ROT-8 Cipher accept only string as argument"
    );

  num = num % 26;
  const lowerCaseStr = str.toLowerCase();
  const abc = "abcdefghijklmnopqrstuvwxyz".split("");
  let newStr = "";
  for (let i = 0; i < lowerCaseStr.length; i++) {
    let currentLetter = lowerCaseStr[i];
    let currentIndex = abc.indexOf(currentLetter);
    let newIndex;

    if (currentLetter === " " || currentIndex === -1) {
      newStr += currentLetter;
      continue;
    }
    if (action === ENCODE) {
      newIndex = currentIndex + num;
    }
    if (action === DECODE) {
      newIndex = currentIndex - num;
    }
    if (newIndex > 25) {
      newIndex = newIndex - 26;
    }
    if (newIndex < 0) {
      newIndex = newIndex + 26;
    }
    if (str[i] === str[i].toUpperCase()) {
      newStr += abc[newIndex].toUpperCase();
    } else {
      newStr += abc[newIndex];
    }
  }
  return newStr;
};

// console.log(caesarCipher("Zoo Keeper", 2, "encode")); //Bqq Mggrgt
// console.log(caesarCipher("Big Car", -16, "encode")); //Lsq Mkb
// console.log(caesarCipher("Javascript", -900, "encode")); //Tkfkcmbszd

// console.log(caesarCipher("Bqq Mggrgt", 2, "decode")); // Zoo Keeper
// console.log(caesarCipher("Lsq Mkb", -16, "decode")); // Big Car
