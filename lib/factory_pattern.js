/**
 * Factory Pattern
 * Type : Creational Pattern
 * 
 * Factory pattern comes from the concept of factories in real world. Just as
 * factories create object that we can use, a factory class can create objects
 * for others to consume.
 *
 * A Factory class provides a simple API for the creation of instances of a class.
 * In languages that support interfaces or abstract classes, Abstract Factory class
 * is created first and then Concrete Factory is subclassed from it.
 *
 * A Concrete Factory class will provide the implemenation of the object creation
 * API.
 * 
 */

/**
 * Abstract factory
 */
function CosmosFactory() {};
CosmosFactory.prototype.create = function(name) {};

/**
 * Concrete factory for creating Stars
 */
function StarFactory() {};
//prototypal inheritance
StarFactory.prototype = new CosmosFactory();
StarFactory.prototype.constructor = StarFactory;

//override the create method
StarFactory.prototype.create = function(name) {
  if (!name) {
    throw new Error('[' + this.constructor.name + '] no name provided');
  }

  return new Star(name);
};

/**
 * Concrete factory for creating Planets
 */
function PlanetFactory() {};
//prototypal inheritance
PlanetFactory.prototype = new CosmosFactory();
PlanetFactory.prototype.constructor = PlanetFactory;

//override the create method
PlanetFactory.prototype.create = function(name) {
  if (!name) {
    throw new Error('[' + this.constructor.name + '] no name provided');
  }

  return new Planet(name);
};

/**
 * Star Class
 */
function Star(name) {
  if (!name) {
    throw new Error('[' + this.constructor.name + '] no name provided');
  }
  this.name = name;
}

/**
 * Planet Class
 */
function Planet(name) {
  if (!name) {
    throw new Error('[' + this.constructor.name + '] no name provided');
  }
  this.name = name;
}

//Usage
var sf = new StarFactory();
sf.create('Proxima Centauri');

var pf = new PlanetFactory();
pf.create('Jupiter');