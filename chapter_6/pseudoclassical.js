;(function(){

  'use strict';

  console.log('Pseudoclassical!');

  /**
   * Implements constructor invocation pattern with using new as a
   * method instead of an operator.
   */
  Function.method('new', function() {

    // Create a new object that inherits from
    // the constructor's prototype
    var that = Object.create(this.prototype);

    // Invoke the constructor, binding - this -
    // to the new object.
    var other = this.apply(that, arguments);

    // If its return value isn't an object,
    // substitute the new object.
    return( typeof other === 'object' && other ) || that;
  });

  // Define a Mammal constructor
  var Mammal = function(name) {
    this.name = name;
  };

  Mammal.prototype = {
    getName: function(){
      return this.name;
    },
    says: function(){
      return this.saying || '';
    }
  };

  // Make a new Mammal
  var myMammal = new Mammal('Herb the Mammal');
  var name = myMammal.getName();

  assert( name === 'Herb the Mammal', 'Pseudoclassical Example 1: Name should be the same!');

})();