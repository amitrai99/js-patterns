/**
 * Prototypal Pattern
 *
 *  This pattern involves creating new object from an existing object.
 *  The new object has the same properties and values as the existing object.
 *
 * In JavaScript it is trivial to implement this pattern using the prototypal 
 * inheritance.
 * 
 */

/**
 * aeroPlane object with some standard methods
 * @type {Object}
 */
var aeroPlane = {

  setName: function (name) {
    this.name = name;
  },

  start: function () {
    console.log('start... ' + this.name);
  },

  stop: function () {
    console.log('stop...');
  }

};

/**
 * Specific plane model
 */
function Mig21() {
  function shoot() {
    console.log('shooting...');
  }
}

//clone the properties to Mig21
Mig21.prototype = aeroPlane;

//create instance of Mig21
var mig = new Mig21();

//call methods on mig instance
mig.setName('Mig 21');
mig.start();