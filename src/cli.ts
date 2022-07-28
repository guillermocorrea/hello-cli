#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

clear();
console.log(
  chalk.green(
    figlet.textSync('people-highlights cli', { horizontalLayout: 'full' })
  )
);

yargs(hideBin(process.argv))
  // Use the commands directory to scaffold.
  .commandDir('commands')
  // Enable strict mode.
  .strict()
  // Useful aliases.
  .alias({ h: 'help' }).argv;
