# Contributing to FingerprintJS Pro Angular integration

## Working with code

We prefer using [yarn](https://yarnpkg.com/) for installing dependencies and running scripts.

The main branch is locked for the push action. For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first.

### Development playground

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.
The root project is the demo app. You can find the library in `projects/ng-fingerprint-pro` folder.

Run `yarn watch:library` to rebuild library on each update.
Run `yarn start` for the demo app dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### How to publish
The library is automatically released and published to NPM on every push to the main branch if there are relevant changes using [semantic-release](https://github.com/semantic-release/semantic-release) with following plugins:
* [@semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer)
* [@semantic-release/release-notes-generator](https://github.com/semantic-release/release-notes-generator)
* [@semantic-release/changelog](https://github.com/semantic-release/changelog)
* [@semantic-release/npm](https://github.com/semantic-release/npm)
* [@semantic-release/github](https://github.com/semantic-release/github)

The workflow must be approved by one of the maintainers, first.
