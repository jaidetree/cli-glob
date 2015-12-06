/* eslint max-nested-callbacks: 0 */
import expect from 'expect';
import globcmd from './src';
import { exec } from 'child_process';
import { inspect } from 'util';

describe('glob-cli', () => {
  describe('glob-cli#globcmd()', (done) => {
    it('Should return a list files', () => {
      globcmd('**/*')
        .then((files) => {
          expect(files).toBeA(Array);
          done();
        });
    });

    it('Should throw an error when no files are found', (done) => {
      globcmd('blah')
        .catch((e) => {
          expect(e).toBeA(Error);
          expect(e.message).toInclude('No files match the glob string');
          done();
        })
        .catch((e) => {
          console.error(e.stack);
        });
    });
  });

  describe('glob-cli#cli()', () => {
    it('should return a list of files', (done) => {
      exec('node ./bin/cli-glob "src/*.js"', { cwd: process.cwd() }, (err, stdout) => {
        let files;

        if (err) throw new Error(err);

        files = String(stdout).split('\n');

        files.pop();

        expect(files).toBeA(Array);
        expect(files.length).toBe(2, 'Invalid length: ' + inspect(files));

        done();
      });
    });

    it('should error when no files are found', (done) => {
      exec('node ./bin/cli-glob "src/blah"', { cwd: process.cwd() }, (err, stdout, stderr) => {
        expect(err).toBeA(Error);
        expect(err.message).toInclude("No files match the glob string");

        done();
      });
    });
  });
});
