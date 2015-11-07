## Ember-Cli POC

This projects test the ember tutorial using the console client.

## Setup

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
> ./autogen.sh  
> ./configure  
> make  
> sudo make install  
> cd ..
> sudo rm -fR watchman
 
 
### PhantomJs
 (fake browser)
 
> sudo npm install -g phantomjs2


## Start project

> ember new my-new-app  
> cd my-new-app  
> ember server  
(Debería levantar pagina [http://localhost:4200](http://localhost:4200))

### Update to ember 2.1
Taken from [this page](http://levvel.io/blog-post/upgrade-a-new-ember-cli-1-13-8-project-to-use-ember-2-1-and-ember-data-2-1/) 

1. Update bower.json
2. Update package.json
3. Update dependencies
> rm -fR my-new-app/node_modules  
> rm -fR my-new-app/bower_components  
> npm install  
> bower install  

## Compilar a produccion
> ember build --environment=production