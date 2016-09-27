# Ateam-ember-supplement

This project serves as a bag for classes created to supplement ember.
 By definition this project is condemned to collect any "util" class adn grow beyond control. To prevent this, it's 
 necessary a continuous refactor to extract common functionality to external addons.

I create this as a mean to remove any non application specific class from the application code, with the intention
to analyze later if it should have its own addon. 

## Installation

* `git clone <repository-url>` this repository
* `cd ateam-ember-supplement`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

### Created from

> ember addon ateam-ember-supplement  
> cd ateam-ember-supplement

Adjust package.json
Add any corresponding class

> npm publish  
To make the addon globally available (npm adduser maybe needed before)  
