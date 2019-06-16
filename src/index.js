require('@babel/register');
import generalImports from './templates/generalImports';
import getFiles from './getFiles';
import renderTestSuite from './templates/renderSuiteSchema';

const path = require('path');
const fs = require('fs');

window.TEST_GENERATOR_WARNINGS = [];

var fileName = process.argv[2];
const matchedFiles = [];

const projectEntry = 'D:\\LicentaFinal\\app';
console.log(projectEntry);

// // TODO: decide whether or not I should use src here - maybe ask for entry point?
const files = getFiles(`${projectEntry}\\src`, matchedFiles, fileName);
console.log('matchedFiles', matchedFiles);

const componentPath = files[0];
const destination = componentPath
  .split('/')
  .slice(-1)[0]
  .split('.')[0];

const destinationFile = `${projectEntry}tests\\${destination}.test.js`;

fs.writeFile(destinationFile, generalImports(componentPath), err => {
  if (err) throw err;
  console.log('Added imports');
});

fs.appendFile(destinationFile, renderTestSuite(componentPath), err => {
  if (err) throw err;
  console.log('Added test suite');
});

try {
  fs.writeFileSync(
    '../../app/testGenerator/testGeneratorWarnings.js',
    `module.exports = ${JSON.stringify(window.TEST_GENERATOR_WARNINGS)}`,
  );
  console.log('Added warnings');
} catch (err) {
  throw err;
}
