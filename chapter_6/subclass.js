;(function(){

  /*
    NOTES:
    - Function serialization: is simply the act of taking a function and getting
      its text source back.
    - In most modern browsers, the function's toString() method will do the trip.
      In general, a function is serialized by using it in a context that expects a string,
      causing its toString() method to be invoked.
   */
  var initializing  = false;

  /*
    supperPattern() used to determine if functions can serialized or not.
    This establishes a variable named supperPattern that we'll use later to
    check if a function contains the string '_super'
   */
  var supperPattern = /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;

  /*
    Creates a new class that inherits from this class.
    Adds a subClass() method to Object as a static method.
    - maintains simple inheritance
    - allows for the super method calling.
   */
  Object.subClass = function( properties ){

    var _super = this.prototype;

    /*
      Initialization the superClass.
     */
    initializing = true;
    var proto = new this();
    initializing = false;


    /*
      Copies properties into the prototype.
      But before we can do that, we need to detect the condition under
      which we need wrap the subclass function.
     */
    for ( var name in properties ){
      /*
        - Is the subClass property a function?
        - Is the superClass property a function?
        - Does the subClass function contain a reference to _super()?
       */
      proto[ name ] = typeof properties[ name ] === 'function' &&
                      typeof _super[ name ] === 'function' &&
                      supperPattern.test( properties[name] ) ?
        /*
          Defines an overriding function if proto[name] === true.
          - ONLY if all three clauses are true do we need to do anything other
            than copy the property value.
          - This immediate function creates and returns a new function that wraps
            and executes the subClass function while making the superclass function
            available via the _super property.
         */
        (function(name, fn){
          return function(){
            var tmp = this._super;

            /*
              Adds a new _.super() method that is the same method
              but on the superClass
             */
            this._super = _super[ name];

            /*
              The method only needs to be bound temporarily, so
              we remove it when're done executing.
             */
            var reset = fn.apply( this, arguments );
            this._super = tmp;
            return reset;
          }
        })( name, properties[name]) :
        properties[name]
    }

    /*
      Dummy class Constructor
     */
    function Class(){
      /*
        All construction is actually done in the init method
       */
      if ( !initializing && this.init ){
        this.init.apply( this, arguments );
      }
    }

    /*
      Populate our constructed prototype object.
     */
    Class.prototype = proto;

    /*
      Enforce the constructor to be what we expect.
      Overrides the constructor reference.
     */
    Class.constructor = Class;

    /*
      And make this class extendable.
     */
    Class.subClass = arguments.callee;

    return Class;
  };

})();
