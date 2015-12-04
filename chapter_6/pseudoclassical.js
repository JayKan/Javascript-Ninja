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

  // Let's make a Cat that inherits from Mammal
  var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
  };

  // Replace Cat.prototype with a new instance of Mammal
  Cat.prototype = new Mammal();

  // Augment the new prototype with
  // purr and getName methods.
  Cat.prototype.purr = function(n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  Cat.prototype.getName = function(){
    return this.says() + ' ' + this.name + ' ' + this.says();
  };

  var myCat = new Cat('Henrietta');
  var says = myCat.says();
  assert( says === 'meow', 'Pseudoclassical Example 2: MyCat should says meow');

  var purr = myCat.purr(5);
  assert( purr === 'r-r-r-r-r', 'Pseudoclassical Example 3: MyCat should purr r-r-r-r-r-r.');

  var catName = myCat.getName();
  assert( catName === 'meow Henrietta meow', 'Pseudoclassical Example 3: myCat overrides sayName() prototype method.');


})();