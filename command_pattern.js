/**
 * Command Pattern
 * Type: behavioral pattern
 * 
 * This pattern allows us to decouple the object interaction in a system.
 * 
 * It involves the following actors:
 *
 * (1) Sender : The object that calls another object
 * (2) Command: The object that calls the receiver object on behalf of sender.
 * (3) Receiver: Object that is invoked by the Sender object via Command object
 *
 * The command object will expose a simple API through which the sender
 * calls the method on the receiver. Typically they have a single method like
 * run or execute.
 *
 * For languages that support interfaces, command object will be created from an 
 * interface. 
 *
 * JavaScript does not support interfaces so we implement this using a simple 
 * function.
 * 
 * Note that the sender and receiver never talk to each other directly.
 * 
 */

function Command(camera) {

  if (!camera) {
    console.log('No camera quitting...');
    return false;
  }

  var commandHistory = [];
  var commands = {
    "colorSnap": camera.colorSnap,
    "irSnap": camera.irSnap,
    "destroy": camera.destroy
  };
  var args = [];

  function run(command) {
    if (!command || ! commands[command]) {return false;}
    
    commandHistory.push(command);
    args = [].slice.call(arguments, 1);

    commands[command].apply(this, args);
  }

  function getCommandHistory() {
    return commandHistory;
  }

  return {
    execute: run,
    commandHistory: getCommandHistory
  };

};

function ColorSnapButton(command) {
  if (!command) {
    console.log('No command quitting...');
    return false;
  }
  function clickSnap() {
    command.execute('colorSnap');
  }

  return {
    click: clickSnap
  };
};

function IRSnapButton(command) {
  if (!command) {
    console.log('No command quitting...');
    return false;
  }

  function clickSnap() {
    command.execute('irSnap');
  }

  return {
    click: clickSnap
  };
};

function Camera() {

  var ID = parseInt(100*Math.random() + 10);

  function takeColorSnap() {
    console.log('Camera %s Taking Color snap...', ID);
  }

  function takeIRSnap() {
    console.log('Camera %s Taking IR snap...', ID);
  }

  function destroySelf() {
    console.log('Camera %s Destroying camera...', ID);
  }

  return {
    colorSnap: takeColorSnap,
    irSnap: takeIRSnap,
    destroy: destroySelf
  };

};

//usage
var camera = Camera();
var command = Command(camera);
var irButton = IRSnapButton(command);
var colorButton = ColorSnapButton(command);

irButton.click();
colorButton.click();

var hist = command.commandHistory();
console.log(hist);