const atbashCipher = require("../atbash");
const { argError } = require("../error");

test("Atbash Cipher on enter 'bla_' will decode as 'yoz_' ", () => {
  expect(atbashCipher("bla_")).toEqual("yoz_");
});

test("Atbash Cipher if not string provided as argument will throw an error", () => {
  expect(() => atbashCipher(123)).toThrow(argError);
});
