/**
 * Flyweight Pattern
 * Type: Structural
 *
 * Flyweight pattern allows us to improve the system performance by keeping the
 * common data/state of mutiple objects in a single shared object.
 *
 *  This pattern has the following components:
 *
 *  (1) Flyweight : Declares an interface through which flyweights can receive and act on extrinsic state.
 *  (2) ConcreteFlyweight : Implements the Flyweight interface and stores intrinsic state. 
 *      A ConcreteFlyweight object must be sharable. The Concrete flyweight object must maintain state 
 *      that it is intrinsic to it, and must be able to manipulate state that is extrinsic. 
 *  (3) FlyweightFactory - The factory creates and manages flyweight objects. In addition the factory ensures sharing of the flyweight objects. The factory maintains a pool of different flyweight objects and returns an object from the pool if it is already created, adds one to the pool and returns it in case it is new.
 *  (4) Client - A client maintains references to flyweights in addition to computing and maintaining extrinsic state
 *  
 *  See: http://www.oodesign.com/flyweight-pattern.html
 *
 *  Flyweight is a bit confusing to understand and implement.
 *  
 *  Implementation steps:
 *
 *  (1) Carefully design your class and separate the intrinsic and extrinsic
 *      properties. Intrinsic properties are the ones that will not change from 
 *      one instance to another for a large number of instances and will be part 
 *      of the Flyweight class. Extrinsic properties will be stored in a separate object using a Manager 
 *      class.
 *  (2) Create a Factory class that will instantiate the Flyweight class.  
 *  (3) Create a Manager that will create objects with extrinsic data. 
 *      In addition, this object will contain a reference to the Flyweight object.
 *
 *  Note: the final object we create must provide all the features that the heavyweight
 *  object did. 
 * 
 */

/**
 * We will create a sample Student Registry.
 * This will store the information about a School's students by class and 
 * year wise.
 *
 */

/**
 * Concrete Flyweight class
 */
function Student(sclass, year) {
  this.class = sclass;
  this.year = year;
  this.random = parseInt(100 * Math.random() + 1);
}

Student.prototype.getClass = function() {
  return this.class;
};

Student.prototype.getYear = function() {
  return this.year;
};

/**
 * Flyweight Factory which instantiates Flyweight class (Student)
 */
var studentFactory = (function() {
  
  //cache the created students so that we don't instantiate unnecessarily
  var createdStudents = {};

  return {
      create: function(sclass, year) {
        var key = sclass + '_' + year;

        //create a new Student only if an existing one has not being created
        if (!createdStudents[key]) {
          createdStudents[key] = new Student(sclass, year);
        }

        return createdStudents[key];
      }
    };
})();

/**
 * Manager class that creates the object with Extrinsic State and links it
 * to the Flyweight class object
 */
var studentManager = (function() {

  var studentRecords = {};

  return {

    /**
     * The composite object creater
     * @param  {String} sclass class
     * @param  {String} year   year
     * @param  {String} name   name of the student. Extrinsic property
     * @param  {String} email  email Extrinsic property
     * @param  {String} rollno roll number Extrinsic property
     */
    createStudent: function (sclass, year, name, email, rollno) {
      //we will store this has a reference in our final object
      var student = studentFactory.create(sclass, year);

      studentRecords[rollno] = {
        "name": name,
        "email": email,
        "student": student /* Reference of Flyweight object*/
      };

    },

    getEmail: function(rollno) {
      if (studentRecords[rollno]) {
        return studentRecords[rollno].email;
      }
      return null;
    },

    getName: function(rollno) {
      if (studentRecords[rollno]) {
        return studentRecords[rollno].name;
      }
      return null;
    },

    getAllRecords: function() {
      return studentRecords;
    }

  };

})();

//usage
studentManager.createStudent('X', 1993, 'Joe', 'joe23@gmail.com', '12345');
studentManager.createStudent('X', 1993, 'Jill', 'jill23@gmail.com', '23456');

studentManager.createStudent('XI', 1993, 'Joe', 'joe23@gmail.com', '62222');
studentManager.createStudent('XI', 1993, 'Jill', 'jill23@gmail.com', '343434');

studentManager.createStudent('V', 1993, 'Jill', 'jill23@gmail.com', '466556');

console.log(studentManager.getAllRecords());