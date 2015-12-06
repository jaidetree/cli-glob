import minimist from 'minimist';
import globcmd from './';

let args = minimist(process.argv.slice(2));

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
globcmd(args._, args.dir || args.d)
  .then((files) => {
    /**
     * If run directly as a cmd report the files with new lines
     */
    files.forEach((file) => {
      process.stdout.write(file.relative + '\n');
    });
  })
  .catch((err) => {
    process.stderr.write(err.stack + '\n');
    process.exit(1);
  });
