/**
 * Decorator Pattern
 * Type: Structural
 *
 *  Adds new features or responsibilities dynamically to an "object".
 *  Note that add the feature to an "object" not to a class.
 *  Also, the features are added at "runtime" not statically.
 *
 * Since in JavaScript we can add or remove properties earsily at runtime,
 * this pattern is rather easy to implement.
 */

/**
 * Car class original
 */
function Car() {
  this.goFast = function() {
    console.log('Car going Fast...');
    return 120;
  };
};

/**
 * Nitro class that acts as decorator
 * @param {Object} car Car object
 */
function Nitro(car) {
  var speed = car.goFast();
  //this is where decoration is happening
  car.goFast = function() {
    console.log('Car Nitro boosted...');
    return speed + 100;  
  };
}

//usage
var car = new Car();

//before decoration
car.goFast();

//now decorating the "object" of Car class
Nitro(car);

//after decoration the object has changed
car.goFast();

//check that the original car is still unchanged
var car2 = new Car();

car2.goFast();