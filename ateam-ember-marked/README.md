# Ateam-ember-marked

This project adds markdown component to represent MD data as html

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### Created from

This guide was followed to create this project http://www.opensourcery.co.za/2015/03/08/creating-an-ember-cli-addon/
With the following commands on the parent folder  

> ember addon ateam-ember-marked  
> cd ateam-ember-marked
> bower install marked --save-dev --save-exact
> ember g blueprint ateam-ember-marked
> ember g component markdown-view
> ember g helper markdown-ashtml

Modify components and helper content
Modify blueprint to add dependencies
Modify index.js to import dependencies on main html

Adjust package.json

> npm publish  
To make the addon globally available (npm adduser maybe needed before)  
