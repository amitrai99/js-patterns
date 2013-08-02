/**
 * Observer pattern
 *
 * This patterns uses two entities:
 *
 * (1) Observer : the entity that is watching another entity and receives notification from it.
 * (2) Subject : the entity that is being watched by the observer. It sends notification to the observers.
 *
 * Subject provides the facility of 
 * (1) Adding an observer
 * (2) Notification
 * (3) Removing observer on demand
 *
 * 
 */

/**
 * Subject entity
 */
function Subject() {
  this.observerList = [];
};

/**
 * Adds the observer to the list of observers for this subject
 * @param  {Object} observer Observer object
 * @return {Number} length of the list where observer is kept
 */
Subject.prototype.addObserver = function(observer) {
  return this.observerList.push(observer);
};

/**
 * Notifies the observers with some data
 * @return {[type]} [description]
 */
Subject.prototype.notifyObservers = function() {
  var observerList = this.observerList;
  var data = {};

  for (i=0, len=observerList.length; i < len; i++) {
    //create some random data
    data = {
      data:'foo', 
      time: new Date(), 
      seed: parseInt(1 + Math.random()*100)
    };
    //update the observers with the data
    observerList[i].update(data);
  }
};

/**
 * Remove the observer
 * @param  {Object} observer Observer object
 * @return {Number} index of the observer
 */
Subject.prototype.removeObserver = function(observer) {
  if (!observer) {return -1;}
  console.log('removing observer...' + observer.getId());
  var observerList = this.observerList;
  var idx = observerList.indexOf(observer);
  if (idx > -1) {
    observerList.splice(idx, 1);
  }
  return idx;
};

/**
 * Observer entity
 */
function Observer() {
  var obData = {};
  var ID = parseInt(1 + Math.random()*100);

  return {
    update: function (data) {
      obData = data;
      console.log('Updated data for Observer  %s %s', ID, JSON.stringify(obData));
    },
    getId: function () {
      return ID;
    }
  };
};


/**
 * Usage sample
 */
var sub = new Subject();

var obs1 = Observer();
var obs2 = Observer();

sub.addObserver(obs1);
sub.addObserver(obs2);

sub.notifyObservers();

sub.removeObserver(obs1);

sub.notifyObservers();

