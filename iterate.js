const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;
const prompt = require('prompt');
const shell = require('shelljs');
const chalk = require('chalk');

let sourceDir = process.argv[2];
let outputName = process.argv[3];

let place = sourceDir.split('/').filter(dir => dir !== '');
let source = place.pop();

place = place.join('/');
place += '/';

let outputDir = place + outputName + '/';

console.log(chalk.greenBright('Iterating: ', source))

ncp(sourceDir, outputDir, function (err) {
  if (err) {
    return console.error(err);
  }

  updateNewComponent(source, outputDir, outputName);
});

// Given a new component, update it
function updateNewComponent(oldComponentName, newComponent, newComponentName) {
  console.log(chalk.cyanBright("Updating component contents..."));

  const oldComponentShort = oldComponentName.substring(3);
  const newComponentShort = newComponentName.substring(3);

  shell.ls(newComponent).forEach(function (file) {
    // edit the contents of the component
    shell.sed('-i', oldComponentShort, newComponentShort, newComponent + file);

    // rename the files in the component
    const newFileName = file.replace(oldComponentShort, newComponentShort);
    fs.rename(newComponent + file, newComponent + newFileName, () => {
      console.log(chalk.cyan('Iterated: ', newFileName))
    });
  });
}
