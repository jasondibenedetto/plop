#!/usr/bin/env node

const Case = require('case');
const oneColor = require('onecolor');
const program = require('commander');
const ntc = require('../vendor/ntc');

function fetchColorName(color, options) {
  const colorObject = oneColor(color);

  if (colorObject instanceof oneColor.RGB) {
    let colorName = ntc.name(colorObject.hex())[1];
    if (options.kebab) {
      colorName = Case.kebab(colorName);
    }
    console.log(colorName);
  } else {
    console.error('invalid color format');
    process.exit(1);
  }
}

program
  .version(process.env.npm_package_version)
  .arguments('<color>')
  .option('-k, --kebab', 'fetch color in kebab case')
  .action((color, options) => {
    fetchColorName(color, options);
  })
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
