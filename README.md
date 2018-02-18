# Property Praxis

Property Praxis is an interactive web application that visually maps the impact of speculative investment in the housing market on Detroit's physical and topographical geography.

Property Praxis is a project of the Urban Praxis Workshop. Property Praxis was developed by:

* [Joshua Akers](http://umdearborn.edu/casl/jakers/) (Research)
* [Alex B. Hill](http://design.alexbhill.org/) (Design/Research)
* [Aaron Petcoff](http://aaronpetcoff.me/) (Web Design/Development)

More information about the project is available at [https://urbanpraxis.org/portfolio/property-praxis/](https://urbanpraxis.org/portfolio/property-praxis/).

For information about building your own custom Property Praxis map for visualizing property speculation data, see the section on [customization](#customizing) below.

### Dependencies
This project uses [Ember](https://github.com/ember-cli/ember-cli)
```bash
$ npm install -g ember
```

### Getting Started
```bash
$ git clone https://github.com/alexbhill/project-pip.git && cd project-pip
$ npm install && bower install
$ ember serve
```
This will serve locally at http://localhost:4200

### Deployments
This application is served essentially as a static site entirely from GitHub pages. To deploy changes to the `gh-pages` branch, you can run a convenicence script,
```bash
$ npm run deploy
```
This script runs the `ember build` command for production and pushes a new subtree to `gh-pages`.

## Customizing
This repository can be forked and customized with your own data. The only requirement is that you host your data on [CartoDB](http://cartodb.com).

### Steps
1. Fork this repository
2. Open `app/config/enviroment.js` and replace the necessary properties with your own information.
3. Run the deploy script with `$ npm run deploy`. It's all pretty easy.
