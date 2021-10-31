const { program } = require("commander");
const caesarCipher = require("./caesarCipher");

program
  .option("-s , --shift <num>", "add shift number for Caesar Cipher code")
  .option("-i, --input <inputFile>", "add input file name", "./input.txt")
  .option("-o, --output <outputFile>", "add output file name", "./output.txt")
  .option("-a, --action <type>", "Caesar Cipher code must have action")
  .parse();

program.parse(process.argv);
const options = program.opts();

const inputFile = options.input;
const action = options.action;
console.log(" Inputfile", inputFile);
console.log(" action ", action);
