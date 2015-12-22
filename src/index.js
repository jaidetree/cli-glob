import glob from 'glob';
import path from 'path';
import {polyfill} from 'es6-promise';

polyfill();

/**
 * Globcmd
 * Returns a promise that will be resolved with an array of files
 *
 * @param {string} globstr - Glob str to look for
 * @param {string} [dir=process.cwd()] - Root directory
 * @returns {Promise} A promise object to be resolved with an array of files
 *                    or rejected with an error.
 */
export default function globcmd (globstr, dir=process.cwd()) {
  return new Promise((resolve, reject) => {
    if (!globstr || !globstr.length) {
      return reject(new Error('No glob string given.'));
    }

    // Use glob to read the files in the dir
    glob(String(globstr), { cwd: dir }, (err, files) => {
      if (err) return reject(err);

      // Files
      if (files.length === 0) {
        reject(new Error(`No files match the glob string "${globstr}"`));
      }

      // Append the matching file to an array
      resolve(files.map((filename) => {
        return {
          path: path.resolve(dir, filename),
          relative: path.relative(dir, filename),
        };
      }));
    });
  });
}
