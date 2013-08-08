/**
 * Strategy pattern
 * type : Behavioral
 *
 * From [Wikipedia](http://en.wikipedia.org/wiki/Strategy_pattern)
 * Strategy pattern (also known as the policy pattern) is a software design 
 * pattern, whereby an algorithm's behavior can be selected at runtime. 
 * Formally speaking, the strategy pattern defines a family of algorithms, 
 * encapsulates each one, and makes them interchangeable. 
 * Strategy lets the algorithm vary independently from clients that use it. 
 *
 * Strategy pattern uses aggregation instead of inheritance. The behaviors are 
 * defined as separate interfaces and specific classes that implement the interfaces.
 * 
 * There are 3 main components for implementation:
 *
 * (1) Strategy, the interface that all the algorithms must implement
 * (2) Concrete Strategy, class that provides implementation of the algorithm
 * (3) Context, class that can take reference to an object of type Strategy
 * 
 */

/**
 * Strategy interface
 */
function Strategy() {
  throw new Error('Interface cannot be instantiated...');
};

Strategy.prototype.sort = function(arr) { 
  throw new Error('Not implemented...');
};

/**
 * Concrete Strategy which implements bubble sort
 */
function BubbleSort() {};
BubbleSort.prototype = Object.create(Strategy.prototype);
BubbleSort.prototype.constructor = BubbleSort;
BubbleSort.prototype.sort = function(arr) {
  console.log('Sorting using BubbleSort');
  arr.sort();
  console.log(arr.toString());
};

/**
 * Concrete Strategy which implements quick sort
 */
function QuickSort() {};
QuickSort.prototype = Object.create(Strategy.prototype);
QuickSort.prototype.constructor = QuickSort;
QuickSort.prototype.sort = function(arr) {
  console.log('Sorting using QuickSort sort');
  arr.sort();
  console.log(arr.toString());
};

/**
 * Context object that will take a reference to a Concrete Strategy object and
 * then call the correct method
 */
function Context(strategy) {
  this._strategy = strategy;
  this.executeStrategy = function(arr) {
    this._strategy.sort(arr);
  };
};

/**
 * Test Client that calls the Context object
 */
function Client() {

  var bs = new BubbleSort();
  var qs = new QuickSort();

  var c_bs = new Context(bs);
  var c_qs = new Context(qs);

  c_bs.executeStrategy([1,5,2,1,4]);
  c_qs.executeStrategy([1,5,2,1,4]);
}

//test run
Client();