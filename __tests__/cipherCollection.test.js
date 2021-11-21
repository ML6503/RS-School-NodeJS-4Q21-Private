const getCipherCollection = require("../getCipherCollection");
const { argError } = require("../error");
const transformTxtStream = require("../transform");

jest.mock("../transform");

describe("getCipherCollection Func testing", () => {
  beforeEach(() => {
    transformTxtStream.mockClear();
  });
  // User passes correct sequence of symbols as argument for --config that matches sample {XY(-)}n
  test("Cipher Collection Function calls transformTxtStream times n in {XY(-)}n argument", () => {
    getCipherCollection("C1-C1-A-R0");
    expect(transformTxtStream).toBeCalledTimes(4);
    transformTxtStream.mockClear();
    getCipherCollection("C1-C0-A-R1-R0-A-R0-R0-C1-A");
    expect(transformTxtStream).toBeCalledTimes(10);
  });

  test("Cipher Collection Function accepts only argument in format {XY(-)}n else throw error", () => {
    expect(() => getCipherCollection("C9-A-R0")).toThrow(argError);
    expect(() => getCipherCollection("1-A-R0")).toThrow(argError);
    expect(() => getCipherCollection("A0")).toThrow(argError);
    expect(() => getCipherCollection("R2-C1-A-R0")).toThrow(argError);
  });
});
