  /**
   * Mediator Pattern
   *
   * Basic idea of a mediator is of a central component that will allow for loose
   * coupling amongst other components. Instead of calling each other directly
   * the components call each other indirectly via a mediator. 
   *
   * [Mediator.js](https://github.com/ajacksified/Mediator.js) is a robust JS  
   * implementation of this pattern.
   * 
   * Implementation for Mediator will typically use a loosely coupled pub/sub based
   * architecture. 
   * 
   * This involves the following steps:
   * 
   * (1) Observers can subscribe to a particular topic/event via a mediator. 
   * (2) Observers can also use the mediator to publish events/topics
   * (3) The mediator calls the subscribers of a topic/event on publish
   * 
   */

  /**
   * We will create a Air Defence System using this pattern.
   * It has the following main components:
   * 
   * (1) Radar: Will acquire a target and feed it's data to Command Vehicle.
   * (2) Command Vehicle (CV): Will take the tracking data and send command to the Launcher
   * (3) Launcher: Will fire the missile on the instruction of CV.
   */

  var CommandVehicle = (function() {
    
    var events = {};
    
    /**
     * Links susbsystems to the CV. Subscribe to the events/topics that CV issues
     * @param  {Object} evt Events like locked, fire, track etc
     * @param  {Function} cb callback
     * @return {Object} reference to current object
     */
    function linkSubSystems(evt, cb) {
      var that = this;
      if (!events[evt]) {
        events[evt] = [];
      }
      events[evt].push({context: that, callback: cb});
      return this;
    };

    /**
     * issues commands to other components. Publisher
     * @param  {Object} evt command with additional data
     * @return {Object} this
     */
    function issueCommand(evt) {

      var args
        , eventSubs
        , sub;
      
      if (!events[evt]) {
        return false;
      } else {
        //list of subscribers for this event
        eventSubs = events[evt];
      }
      //first argument is event name, remove it from the callback arg list
      args = Array.prototype.slice.call(arguments, 1);

      for (var i=0, len=eventSubs.length; i<len; i++) {
        //event subscriber
        sub = eventSubs[i];
        sub.callback.apply(sub.context, args);
      }

      return this;
    };

    return {
        attach: linkSubSystems
      , command: issueCommand
    };

  })();

  /**
   * Radar for tracking the enemy planes
   * @param {Object} cv Command Vehicle object
   */
  function Radar(cv) {

    var ID = parseInt(1 + Math.random()*100);

    if(!cv) {
      console.log('No command vehicle, exiting...');
      return false;
    }

    function trackTarget() {
      var range = parseInt(40 * Math.random() + 10);
      var evt = (range > 10 && range < 40) ? 'fire':'track';
      cv.command(evt, {radar: ID, altitude: '10', range: range});
    }

    return {
      track: trackTarget
    };

  };

  /**
   * Launcher for firing missiles
   * @param {Object} cv Command Vehicle object
   */
  function Launcher(cv) {
    
    var ID = parseInt(1 + Math.random() * 100);

    if(!cv) {
      console.log('No command vehicle, exiting...');
      return false;
    }

    function attachToCV() {
      cv.attach('fire', launch);
      cv.attach('track', adjust);
    }

    function launch(target) {
      console.log('Launcher %s Firing missile at target %s', ID, JSON.stringify(target));
      //document.getElementById('msg').innerHTML += '<p>Firing ' + ID + ' ' + JSON.stringify(target) + '</p>';
    }

    function adjust(target) {
      console.log('Launcher %s Adjusting missile at target %s', ID, JSON.stringify(target));
    }

    return {
      "attach": attachToCV
    };

  };

  //sample usage
  //init radars
  var r1 = Radar(CommandVehicle);
  
  //init launchers
  var l1 = Launcher(CommandVehicle);
  var l2 = Launcher(CommandVehicle);

  //launchers listen to 'fire' and 'track' command
  l1.attach();
  l2.attach();

  //set radars to track continuosly
  window.setInterval(r1.track, 1000);