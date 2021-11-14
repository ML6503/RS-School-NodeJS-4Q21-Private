const caesarCipher = require("../caesarCipher");
const { argError } = require("../error");

test("Caesar Cipher with arguments 'Zoo Keeper', 2, 'encode' returns 'Bqq Mggrgt' ", () => {
  expect(caesarCipher("Zoo Keeper", 2, "encode")).toEqual("Bqq Mggrgt");
});

test("Caesar Cipher  'Lsq Mkb!', -16, 'decode' decodes as 'Big Car!'", () => {
  expect(caesarCipher("Lsq Mkb!", -16, "decode")).toEqual("Big Car!");
});

test("Caesar Cipher will throw an error if not string provided as argument ", () => {
  expect(() => caesarCipher(123, 1, "decode")).toThrow(argError);
});
