/**
 * Facade Pattern
 *
 * A facade is a higher level interface that makes the underlying system easier to use.
 * 
 * Facade are everywhere around us. 
 * Examples :
 * Car we drive is extremely complicated internally but a user only uses the 
 * brakes, gears and steering to run the car.
 * Operating Systems provide a simple GUI based interface that masks the complexity underneath.
 * Frameworks like Spring and jQuery are essentially facades.
 *
 *  Cons:
 *  (1) Performance impact because of the level of indirection applied
 * 
 */

//subcomponent
function Engine() {
  this.start = function() {
    console.log('Starting ....');
  }
};

//subcomponent
function Gearbox(engine) {
  this.change = function() {
    console.log('Changing gear ....');
  };
};

//Car is our facade
function Car() {
  var engine = new Engine();
  var gear = new Gearbox(engine);

  return {
    start: engine.start,
    changeGear: gear.change
  };

};

//usage
var myCarFacade = Car();
myCarFacade.start();
myCarFacade.changeGear();