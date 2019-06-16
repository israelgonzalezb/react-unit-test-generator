var Table = require('cli-table');
const warnings = require('./testGenerator/testGeneratorWarnings');

class JestCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete() {
    var table = new Table({
      chars: {
        top: '-',
        'top-mid': '|',
        'top-left': ' ',
        'top-right': '|',
        bottom: '-',
        'bottom-mid': '|',
        'bottom-left': ' ',
        'bottom-right': '|',
        left: ' ',
        'left-mid': ' ',
        mid: '-',
        'mid-mid': '|',
        right: '|',
        'right-mid': '|',
        middle: '|',
      },
      head: ['Test', 'Reason for skipping'],
    });

    if (warnings.length > 0) {
      warnings.map(warning => table.push([warning.title, warning.failureMessage]));
      console.log(`\n${table.toString()}`);
    }
  }
}

module.exports = JestCustomReporter;
