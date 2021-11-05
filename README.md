# RS-School-NodeJS-4Q21-Private

RS School NodeJS 4Q21 Tasks in Private Repo
Tasks link below:
https://github.com/rolling-scopes-school/basic-nodejs-course#task-1-caesar-cipher-cli-tool

How to work with programme:

- clone repo
- run '$npm install'
- run '$node my_ciphering_cli' with following options:

1. -c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:

- X is a cipher mark:
  - C is for Caesar cipher (with shift 1)
  - A is for Atbash cipher
  - R is for ROT-8 cipher
- Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
  - 1 is for encoding
  - 0 is for decoding

2. -i, --input: a path to input file
3. -o, --output: a path to output file

For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"
