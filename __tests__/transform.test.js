const { Transform } = require("stream");
const transformTxtStream = require("../transform");

describe("transformTxtStream function testing", () => {
  test("transformTxtStream is a transform stream instance", () => {
    let result = transformTxtStream("C", 0);
    expect(result).toBeInstanceOf(Transform);
  });
});
