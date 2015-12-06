'use strict';

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = (0, _minimist2.default)(process.argv.slice(2));

/**
 * Show help document
 */
if (args.help) {
  process.stdout.write('Usage:\n');
  process.stdout.write('glob {string} globstr - A glob argument to search for.\n\n');
  process.stdout.write('Example:\n');
  process.stdout.write('glob **/*.js - Will look through the current and all sub-directories for files ending in .js\n\n');
  process.exit(0);
}

/**
 * Pass given glob string into the globcmd function which returns a promise
 * resolving with an array of files. Then we iterate through the array and
 * resolve the relative path;
 */
(0, _2.default)(args._, args.dir || args.d).then(function (files) {
  /**
   * If run directly as a cmd report the files with new lines
   */
  files.forEach(function (file) {
    process.stdout.write(file.relative + '\n');
  });
}).catch(function (err) {
  process.stderr.write(err.stack + '\n');
  process.exit(1);
});