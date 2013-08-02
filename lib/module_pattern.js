/**
 * Module Pattern
 *
 * (1) Uses IIFE to define a module.
 * (2) Supports Privacy and Closure.
 * (3) All the public members are defined in the object returned from the IIFE
 * (4) Private members are exposed as references from the returned object
 *
 * Cons:
 *
 * (1) Hard to unit test because private members are not exposed to test library.
 * 
 */

/**
 * Sample module definition
 * @return {Object} An object that contains the public methods/data and 
 * references to the private members
 */
var laptopModule = (function (options) {

  var defaults = {color: 'grey'};

  if (options) {
    defaults = options;
  }

  function startLaptop() {
    console.log('starting...');
  }

  function stopLaptop() {
    console.log('stop...');
  }

  function playMusic(trackName) {
    console.log('Playing track ' + trackName)
  }

  /**
   * This is where we return the object which contains the public methods
   * and references to the private members
   * Private members are called directly by their name as they are available in the closure.
   * Cannot use 'this' to call the private members.
   * Public methods can call each other using 'this'
   */
  return {
      play: function (trackName) {playMusic(trackName);}
    , reboot: function() {
        console.log('rebooting...');
        this.stop();
        this.start();
      }
    , model: 'Alienware XPS2010'
    , stop: function() {stopLaptop();}
    , start: function() {startLaptop();}
    , showOptions: function() {console.log(this.options);}
  };

})(options);