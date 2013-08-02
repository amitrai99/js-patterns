/**
 * Singleton Pattern
 *
 * Singleton pattern allows creation of only one instance of a class
 * Singleton is useful if we want a single point of contact for the entire system.
 *
 * 
 */

/**
 * Singleton can be implemented using the standard Module pattern
 */

var singleton = (function () {

  var instance;

  //singleton class
  function DbConfigUtil() {

    var config = {
        db: "testdb"
      , password: "password"
      , seed: Math.random()
    };

    function _getDb() {
      return config.db;
    }

    function _getPassword() {
      return config.password;
    }

    return {
      getDB: _getDb,
      seed: config.seed,
      getPassword: function () {return _getPassword();}
    };

  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = DbConfigUtil();
      }
      return instance;
    }
  };

})();