## Ember-Cli POC

This projects test the ember tutorial using the console client.

## Setup

### Node
Verify version >= 0.12
> node --version  

If not follow [node install guides under installation](http://guides.emberjs.com/v2.1.0/getting-started/)
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
