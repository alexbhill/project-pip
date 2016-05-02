# Property Praxis

Property Praxis is an interactive web application that visually maps the impact of speculative investment in the housing market on Detroit's physical and topographical geography.

It is a project of the Digital Interactive Research Trajectories (DIRT)Collective. DIRT is:

* [Joshua Akers](http://umdearborn.edu/casl/jakers/) (Research)
* [Alex B. Hill](http://design.alexbhill.org/) (Design/Research)
* [Aaron Petcoff](http://aaronpetcoff.me/) (Web Design/Development)

More information about the project is available at [http://propertypraxis.tumblr.com](http://propertypraxis.tumblr.com).

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
