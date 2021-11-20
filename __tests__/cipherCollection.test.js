const getCipherCollection = require("../getCipherCollection");
const { argError } = require("../error");
const transformTxtStream = require("../transform");

jest.mock("../transform");

describe("getCipherCollection Func testing", () => {
  beforeEach(() => {
    transformTxtStream.mockClear();
  });

  test("Cipher Collection Function calls transformTxtStream times n in {XY(-)}n argument", () => {
    getCipherCollection("C1-A-R0");
    expect(transformTxtStream).toBeCalledTimes(3);
    transformTxtStream.mockClear();
    getCipherCollection("A-R0");
    expect(transformTxtStream).toBeCalledTimes(2);
  });

  test("Cipher Collection Function accepts only argument in format {XY(-)}n else throw error", () => {
    expect(() => getCipherCollection("C9-A-R0")).toThrow(argError);
  });
});
