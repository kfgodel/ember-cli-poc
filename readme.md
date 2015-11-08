## Ember-Cli POC

This projects test the ember tutorial using the console client.


## Prerequisites

### Node
Verify version >= 0.12
> node --version  

If not, follow [node install guides under installation](http://guides.emberjs.com/v2.1.0/getting-started/)
- Ubuntu
> curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -  
> sudo apt-get install -y nodejs


### Ember-cli

> sudo npm install -g ember-cli  
> ember -v

### Watchman
(Detects file changes)
> sudo apt-get install python-dev
> git clone https://github.com/facebook/watchman.git  
> cd watchman  
> git checkout v3.9.0
> ./autogen.sh  
> ./configure  
> make  
> sudo make install  
> cd ..
> sudo rm -fR watchman
 
 
### PhantomJs
 (fake browser)
 
> sudo npm install -g phantomjs


## Setup

> cd my-new-app  
> npm install  
> bower install  
> ember server --proxy http://127.0.0.1:9090  
(Debería levantar pagina [http://localhost:4200](http://localhost:4200) y forwardear los requests al backend en localhost:9090)




## Compilar a produccion
> ember build --environment=production

## Project structure
It follows the guidelines [from ember-cli](http://www.ember-cli.com/user-guide/#naming-conventions)
in terms of names a and structures

## Commands to create this project 

> ember new my-new-app --skip-git
> cd new my-new-app
> bower install bootstrap --save  

Add to `ember-cli-build.js`
```
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
```


### Update to ember 2.1
Taken from [this page](http://levvel.io/blog-post/upgrade-a-new-ember-cli-1-13-8-project-to-use-ember-2-1-and-ember-data-2-1/) 

1. Update bower.json
2. Update package.json
3. Update dependencies
> rm -fR node_modules bower_components  
> npm cache clean  
> bower cache clean  
> npm install  
> bower install  

