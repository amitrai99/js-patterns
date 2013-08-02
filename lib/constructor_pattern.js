/**
 * Constructor Pattern
 * http://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript
 *
 * A constructor is a special method that is invoked when an instance of a class is created.
 * In JavaScript a constructor function is a subroutine that is declared using "function" statement
 */

/**
 * There are two ways to declare constructors in JS.
 * (1) A non-prototypal constructor
 * (2) A prototypal constructor
 */

/**
 * Basic non-prototypal constructor
 * It does not support inheritance directly
 * It is inefficient because every instance gets it's own version of the methods
 * @param {String} name Student name
 * @param {String} college Student college
 */
function Student(name, college) {
  this.name = name;
  this.college = college;

  this.getName = function() {
    return this.name;
  };

  this.getCollege = function () {
    return this.college;
  }
}

/**
 * Prototypal constructor with support for inheritance
 * This is light weight with methods shared across all the instances
 * @param {String} name [description]
 * @param {String} class [description]
 */
function Teacher(name, classTch) {
  this.name = name;
  this._class = classTch;
}

Teacher.prototype.getName = function() {
  return this.name;
};

Teacher.prototype.getClass = function() {
  return this._class;
};