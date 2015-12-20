'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = globcmd;

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _es6Promise = require('es6-promise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _es6Promise.polyfill)();

/**
 * Globcmd
 * Returns a promise that will be resolved with an array of files
 *
 * @param {string} globstr - Glob str to look for
 * @param {string} [dir=process.cwd()] - Root directory
 * @returns {Promise} A promise object to be resolved with an array of files
 *                    or rejected with an error.
 */
function globcmd(globstr) {
  var dir = arguments.length <= 1 || arguments[1] === undefined ? process.cwd() : arguments[1];

  return new Promise(function (resolve, reject) {
    if (!globstr || !globstr.length) {
      return reject(new Error('No glob string given.'));
    }

    // Use glob to read the files in the dir
    (0, _glob2.default)(String(globstr), { cwd: dir }, function (err, files) {
      if (err) return reject(err);

      // Files
      if (files.length === 0) {
        reject(new Error('No files match the glob string "' + globstr + '"'));
      }

      // Append the matching file to an array
      resolve(files.map(function (filename) {
        return {
          path: _path2.default.resolve(dir, filename),
          relative: _path2.default.relative(dir, filename)
        };
      }));
    });
  });
}