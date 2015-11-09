;(function(){

  var initializing  = false,
      supperPattern = // Determine if functions can serialized
        /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;

  /*
    Creates a new class that inherits from this class.
    Adds a subClass() method to Object as a static method.
   */
  Object.subClass = function( properties ){

    var _super = this.prototype;

    /*
      Instantiates the superClass
     */
    initializing = true;
    var proto = new this();
    initializing = false;


    /*
      Copies properties into the prototype.
     */
    for ( var name in properties ){

      proto[ name ] = typeof properties[ name ] == 'function' &&
                      typeof _super[ name ] == 'function' &&
                      supperPattern.test( properties[name] ) ?
        /*
          Defines an overriding function if proto[name] === true.
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
