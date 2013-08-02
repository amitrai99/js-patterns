/**
 * Revealing Module Pattern
 *
 * (1) Uses IIFE to define a module.
 * (2) Supports Privacy and Closure.
 * (3) All the members (both public/private) are declared private inside the module. 
 * (4) Public members are exposed using the references in the returned object
 * (5) More consistent syntax
 *
 * Cons:
 *
 * (1) Hard to unit test because private members are not exposed to test library.
 * (2) If a private function refers to a public function (which is also declared as private), 
 * that public function can't be overridden if a patch is necessary. This is because the private 
 *   function will continue to refer to the private implementation and the 
 *   pattern doesn't apply to public members, only to functions.
 */

/**
 * Sample module definition
 * @return {Object} An object that contains the 
 * references to the private members
 */
var laptopModule = (function (options) {
  /**
   * All the members are declared private
   */
  var defaults = {color: 'grey'};

  if (options) {
    defaults = options;
  }

  //public method
  function startLaptop() {
    console.log('starting...');
  }

  //public method
  function stopLaptop() {
    console.log('stop...');
    shutDisk();
  }

  //public method
  function playMusic(trackName) {
    console.log('Playing track ' + trackName)
  }

  //private method
  function shutDisk() {
    console.log('Shutting disk...');
  }

  /**
   * Public methods
   */
  return {
      play: playMusic
    , stop: stopLaptop
    , start: startLaptop
    , defOptions: defaults
  };

})(options);