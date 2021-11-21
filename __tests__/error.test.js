const { errorHandler, fileError, argError } = require("../error");
const { runCiphering } = require("../my_ciphering_cli");
jest.mock("../error");

beforeEach(() => {
  // Create a spy on console.error with mocked implementation
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  // Restore mock after all tests are done, so it won't affect other test suites
  console.error.mockRestore();
  //   jest.clearAllMocks();
});
afterEach(() => {
  // Clear mock (all calls etc) after each test.

  console.error.mockClear();
});

describe("Error testing", () => {
  test("Error Handler works correctly", () => {
    process.argv = [
      "node",
      "./my_ciphering_cli",
      "-c",
      "C1-C1-R0-A",
      "-i",
      "./iinput.txt",
      "-o",
      "./output.txt",
    ];
    try {
      runCiphering();
    } catch (e) {
      errorHandler(e);
      expect(console.error).toHaveBeenCalled();
      expect(spy.console.mock.calls[0][0]).toContain(
        "File Access Error: no such file or directory"
      );
    }
    expect(errorHandler).toHaveBeenCalled();
  });

  test("fileError works", () => {
    const fileErr = new fileError("no such file or directory");
    fileErr.isFileAccess = true;
    expect(fileErr.name).toContain("Error");
    expect(fileErr.isFileAccess).toBe(true);
  });
});
