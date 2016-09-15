#!/usr/bin/env node
'use strict';
const program = require('commander');
const oneColor = require('onecolor');
const Case = require('case');
const ntc = require('./vendor/ntc');

function fetchColorName(color, options) {
  const _color = oneColor(color);

  if (_color instanceof oneColor.RGB) {
    let colorName = ntc.name(_color.hex())[1];
    if (options.kebab) colorName = Case.kebab(colorName);
    console.log(colorName);

  } else {
    console.error('invalid color format');
    process.exit(1);
  }

}

program
  .version('0.0.1')
  .arguments('<color>')
  .option('-k, --kebab', 'fetch color in kebab case')
  .action((color, options) => {
    fetchColorName(color, options);
  })
  .parse(process.argv);

if (program.args.length === 0) program.help();
