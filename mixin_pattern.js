/**
 * Mixin Pattern
 * Type: Structural
 *
 * Mixin is an object that contains freatures that can be used by other objects/classes.
 * Mixin pattern can be seen as an object extenstion mechanism without using inheritance.
 * It promotes code reuse.
 * 
 */

/**
 * Mixin object with resusable methods
 */

var mixin = {
  
    "breath": function() {
      console.log('breath...');
    }

  , "drink": function() {
      console.log('drink...');
    }

  , "eat": function() {
      console.log('eat...');
    }

};

/**
 * Human class with features mixed-in from mixin object
 */
function Human() {};
Human.prototype = extend(Human.prototype, mixin);
Human.prototype.study = function() {
  console.log('[%s] Study...', this.constructor.name);
};

/**
 * Eagle class with features mixed-in from mixin object
 */
function Eagle() {};
Eagle.prototype = extend(Eagle.prototype, mixin);;
Eagle.prototype.fly = function() {
  console.log('[%s] Fly...', this.constructor.name);
};

/**
 * Extends an object from another
 * @param  {Object} a Object that receives
 * @param  {Object} b Object that gives
 * @return {Object} extended object 
 */
function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

//usage
var h1 = new Human();
h1.eat();
h1.study();

var e1 = new Eagle();
e1.breath();
e1.fly();