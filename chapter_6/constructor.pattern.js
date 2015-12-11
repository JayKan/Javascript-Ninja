;(function(){

  'use strict';

  // In classical object-oriented programming languages, a constructor is a special
  // method used to 'initialize' a newly created object once memory has been allocated.
  // Object constructors are used to create specific types of objects - both preparing
  // the object for use and accepting arguments which a constructor can use to set the
  // values of member properties and methods when the object is first created.

  // ----------------------------------------------------------------------------------- //
  // --------------------------------- Object Creation --------------------------------- //
  // ----------------------------------------------------------------------------------- //
  // 1st way to create a new object:
  var newObject = {};

  // or (2nd)
  var object_b = Object.create( Object.prototype );

  // or (3rd)
  var object_c = new Object();

  // There are 4 ways in which keys and values can be assigned:

  // (1st) Dot syntax
  // (1st) Set properties
  newObject.someKey = 'Hello World';
  // (1st) Get properties
  var value = newObject.someKey;
  assert(value === 'Hello World',
  'Constructor Pattern: value should equal === '  + value );

  // (2nd) Square bracket syntax
  // (2nd) Set properties
  newObject['another'] = 'Another Hello World';
  // (2nd) Get properties
  var another = newObject['another'];
  assert(another === 'Another Hello World',
  'Constructor Pattern: another value should also equal === ' + another );

  // (3rd) Object.defineProperty [ You can more control over the properties you would like to define ]
  // (3rd) Set properties
  Object.defineProperty(newObject, 'someKey', {
    value: 'for more control of the property\'s behavior',
    writable: true,
    enumerable: true,
    configurable: true
  });
  var someKeyValue = newObject['someKey'];
  assert( someKeyValue === 'for more control of the property\'s behavior',
  'Constructor Pattern: using Object.defineProperty for setting an Object\'s properties.');

  // Short-hand version for (3rd way)
  var defineProperty = function( obj, key, value ) {
    var config = {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true
    };
    Object.defineProperty( obj, key, config );
  };

  // To use, we then create a new empty 'person' object.
  var person = Object.create( Object.prototype );

  // Populate the object with properties
  defineProperty( person, 'car', 'Honda' );
  defineProperty( person, 'dateOfBirth', '1989' );
  defineProperty( person, 'hasBeard', false );

  assert( person['car'] === 'Honda',
  'Constructor Pattern: Person has a car property and value === ' + person['car'] );
  assert( person['dateOfBirth'] === '1989',
  'Constructor Pattern: Person has a dateOf Birth property and value === ' + person['dateOfBirth'] );
  assert( person['hasBeard'] === false,
  'Constructor Pattern: Person has a hasBeard property and value === ' + person['hasBeard'] );

  // (4th) Object.defineProperties
  // (4th) Set properties
  Object.defineProperties( newObject, {
    'theOtherKey': {
      value: 'Hello World',
      writable: true
    },
    'anotherKey': {
      value: 'AnotherKey Hello World',
      writable: false
    }
  });

  // Examples for using those methods to achieve inheritance.
  // Create a race car driver that inherits from the person Object.
  console.log('Person: ', person);
  var driver = Object.create( person );
  console.log('Driver: ', driver );
  // Set some properties for the driver
  defineProperty( driver, 'topSpeed', '100mph' );

  // Test to get an inherited property, dateOfBirth from person.
  assert( driver.dateOfBirth === '1989',
  'Constructor Pattern: a driver should have a dateOfBirth value inherited from person, which is ' + driver.dateOfBirth );

  assert( driver.topSpeed === '100mph',
  'Constructor Pattern: a driver have a topSpeed property, which has a value of ' + driver.toSpeed );

  // ----------------------------------------------------------------------------------- //
  // --------------------------------- Basic Constructor ------------------------------- //
  // ----------------------------------------------------------------------------------- //
  function Car( model, year, miles ) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.toString = function() {
      return this.year + ' - ' + this.model + ' has done ' + this.miles + ' miles';
    };
  }

  var civic = new Car( 'Honda Civic', 2009, 20000 );
  var mondeo = new Car( 'Ford Mondeo', 2010, 5000 );
  console.log( civic.toString() );
  console.log( mondeo.toString() );
  // The above is a simple version of the constructor pattern but it does suffer
  // from some problems. One is that it makes inheritance difficult and the other
  // is that functions such as toString(), instance methods, are redefined for each
  // of the new objects created using the Car constructor. This isn't very optimal
  // as the function should ideally be shared between all of the instances of the
  // the Car type. One way to solve this problem is to leverage constructor with prototypes.

  // ----------------------------------------------------------------------------------- //
  // --------------------------- Constructors with Prototypes -------------------------- //
  // ----------------------------------------------------------------------------------- //
  // Functions, like almost all objects in JavaScript, contain a "prototype" object. When
  // we call a JavaScript constructor to create an object, all the properties of the constructor's
  // prototype are then made available to the object.
  function MyCar( model, year, miles ) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  }

  // Create a myNewCar instance prior to define MyCar.prototype method()
  var myNewCar = new MyCar( 'Honda Accord', 2010, 65000 );

  // Note here that we are using Object.prototype.newMethod rather
  // than Object.prototype so as to avoid redefining the prototype object.
  // With defining toString() in MyCar.prototype, now when MyCar is being called,
  // it's no longer redefined for each of the objects created using MyCar Constructor,
  // instead, this approach shares a single instance of toString() between all of the
  // Car objects.
  MyCar.prototype.toString = function(){
    return 'MyCar is: ' + this.model + ' - ' + this.year + ' and has done ' + this.miles + ' miles.';
  };

  assert( typeof myNewCar.toString === 'function',
  'Constructor with Prototype: myNewCar is instantiated prior to myNewCar.prototype.toString() method declaration');
  console.log(myNewCar.toString() );




})();