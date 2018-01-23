# Astronode Plugin
[![npm](https://img.shields.io/npm/v/astronode-plugin.svg)](https://www.npmjs.com/package/astronode-plugin) [![Build Status](https://travis-ci.org/monumentum/astronode-plugin.svg?branch=master)](https://travis-ci.org/monumentum/astronode-plugin) [![Coverage Status](https://coveralls.io/repos/github/monumentum/astronode-plugin/badge.svg?branch=master)](https://coveralls.io/github/monumentum/astronode-plugin?branch=master) [![bitHound Overall Score](https://www.bithound.io/github/monumentum/astronode-plugin/badges/score.svg)](https://www.bithound.io/github/monumentum/astronode-plugin) [![bitHound Dependencies](https://www.bithound.io/github/monumentum/astronode-plugin/badges/dependencies.svg)](https://www.bithound.io/github/monumentum/astronode-plugin/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/monumentum/astronode-plugin/badges/devDependencies.svg)](https://www.bithound.io/github/monumentum/astronode-plugin/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/monumentum/astronode-plugin/badges/code.svg)](https://www.bithound.io/github/monumentum/astronode-plugin) 

This is a simple package with some interfaces to create your on Engine and Data plugins to astronode :)

### How to Use It
First of all you need to install the package inside you plugin `npm install --save astronode-plugin`  

#### EngineAdapter
To create an Engine adapter you will import `EngineAdapter` from `astronode-plugin`. After it extends this class an override methods `createRoute` and `start`.  

**createRoute**: Will be called everytime when astronode receive a route register request, it comes with the follow parameters: `path, method, middlewares, callback`  
**start**: Method used to initializate the server.  

*Example: https://github.com/monumentum/astronode-express-plugin*

#### DataAdapter & DataMethods
To crete an Data adapter you need first of all understand how it works, we had three parts in this process:
- You need to map the five base methods from a CRUD *(find, findById, create, update and delete)* using `DataMethods` interface.
- You will need extends `DataAdapter` calling `super` with the your `DataMethods` implementation for this ORM.
- You will need implement a method `autoinitializate` in your `DataAdapter` to open database connection and setup.

*Example: https://github.com/monumentum/astronode-mongoose-plugin*

#### Contribuiting
// TODO
