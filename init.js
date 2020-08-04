#!/usr/bin/env node
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const program = require('commander');
const { execSync } = require('child_process');
const download = require('download-git-repo');

let branch = '';
program.version(require('./package').version, '-v,--version').usage('<command> [options]');
program
  .command('react <projectName>')
  .description('create a react project with js')
  .action((name, cmd) => {
    branch = '#master';
    mkdir(name);
  });
program
  .command('vue2.0 <projectName>')
  .description('create a vue2.0 project')
  .action((name, cmd) => {
    branch = '#vue2.0';
    mkdir(name);
  });
program
  .command('vue3.0 <projectName>')
  .description('create a vue3.0 project')
  .action((name, cmd) => {
    branch = '#vue3.0';
    mkdir(name);
  });
program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
function mkdir(dirname) {
  fs.mkdir(dirname, err => {
    if (err) {
      console.log(err.message);
    } else {
      const spinner1 = ora('start to download template...').start();
      download(`direct:https://github.com/qingh/template${branch}`, dirname, { clone: true }, error => {
        if (error) {
          console.log('error:\n', error);
        } else {
          spinner1.succeed('The template downlaod success');
          const spinner2 = ora('start to download dependens...\n').start();

          execSync(`cd ${dirname} & npm i core-js`, { stdio: [0, 1, 2] });
          spinner2.succeed('The modules download complete');
          console.log('\n\n');

          console.log(chalk.green('Thank you for using @qingh/init'));
          console.log(
            chalk.green(
              'Also, the author of @qingh/init ( https://github.com/qingh ) is looking for a good job, please contact with me (lqh147@qq.com)\n\n'
            )
          );
          console.log(`🎉 Successfully created project ${dirname}`);
          console.log(`👉 Get started with the following commands:\n`);
          console.log(chalk.green(`$ cd ${dirname}`));
          console.log(chalk.green(`$ npm start`));
        }
      });
    }
  });
}
