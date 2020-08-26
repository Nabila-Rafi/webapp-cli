'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the dandy ${chalk.red('generator-boilerplate')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please enter your application name:',
        default: 'lloyds-web-app'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Please enter author name:',
        default: 'lloyds-user'
      },
      {
        type: 'input',
        name: 'email',
        message: 'Please enter author email address:',
        default: ''
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath(this.props.projectName + '/src')
    );
    this.fs.copy(
      this.templatePath('public'),
      this.destinationPath(this.props.projectName + '/public')
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(this.props.projectName + '/package.json'), {
      projectName: this.props.projectName,
      author: this.props.author,
      email: this.props.email

      }
      );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
