;(function( jQ, _ ){

  'use strict';

  var counter = 30;

  /*
    In JavaScript, there are several options for implementing modules, and they are:
      1) Object literal notion
      2) The Module Pattern
      3) AMD modules
      4) CommonJS modules
      5) ECMAScript Harmony modules
   */

  // ------------------------------------------------------------------------ //
  // ------------------------- Object Literals ------------------------------ //
  // ------------------------------------------------------------------------ //
  // Object literal notion
  var myModule = {

    myProperty: 'someValue',

    // Object literals can contain properties and methods.
    // We can define a further object for module configuration:
    config: {
      useCaching: true,
      language: 'en'
    },

    // define a basic method
    saySomething: function saySomethign(){
      console.log( 'Where in the world is Paul Irish today?' );
    },

    // output a value based on the current configuration
    reportMyConfig: function reportMyConfig(){
      console.log( 'Caching is: ' + (this.config.useCaching ? 'enabled' : 'disabled') );
    },

    // override the current configuration
    udpateConfig: function updateConfig( newConfig ){
      if ( typeof newConfig === 'object' ) {
        this.config = newConfig;
        console.log( this.config.language );
      }
    }
  };

  // Outputs: Where in the world is Paul Irish today?
  myModule.saySomething();
  assert(true, 'Object literal Pattern: myModule.saySomething(): ' + myModule.saySomething() );

  // Outputs: Caching is: enabled
  myModule.reportMyConfig();
  assert(true, 'Object literal Pattern: myModule.reportConfig(): ' + myModule.reportMyConfig() );
  // Outputs: Chinese
  myModule.udpateConfig({
    language: 'Chinese',
    useCaching: false
  });

  // Outputs: Caching is: disabled
  myModule.reportMyConfig();

  // ------------------------------------------------------------------------ //
  // ------------------------ The Module Pattern ---------------------------- //
  // ------------------------------------------------------------------------ //
  /*
    The Module pattern was originally defined as a way to provide both "private"
    and "public" encapsulation for classes. What this results in is a reduction
    in the likelihood of our function defined in additional scripts on the page.

    Privacy:
      - Privacy is achieved via using closures.
      - This pattern is very similar to immediately-invoked-function expression (IIFE)
   */
  var testModule = (function(){

    // counter variable enjoys its private isolated environment
    var counter = 0;

    return {
      incrementCount: function(){
        return counter+=1;
      },

      resetCounter: function(){
        console.log( 'Counter value prior to reset: ' + counter );
        counter = 0;
      },

      get: function(){
        return counter;
      }
    }
  })();

  // Increment our counter
  testModule.incrementCount();
  assert( testModule.get() === 1,
  'The Module Pattern: testModule.get() === ' + testModule.get() );

  // Reset our counter
  testModule.resetCounter();
  assert( testModule.get() === 0,
  'The Module Pattern: testModule.resetCounter() should === 0');

  var myNamespace = (function(){

    var myPrivateVar, myPrivateMethod;

    // A private counter variable
    myPrivateVar = 0;

    // A private function which logs any arguments
    myPrivateMethod = function(foo){
      console.log(foo);
    };

    return {
      // A public variable
      myPublicVar: 'foo',

      // A public function utilizing privates
      myPublicFunction: function( bar ) {

        // Increment our private counter;
        myPrivateVar += 1;

        // Call our private method using bar
        myPrivateMethod( bar );
      }
    }
  })();


  /**
   * basketModule returns an object with a public API we can use.
   *
   * Benefits of leveraging IIFE pattern:
   * - The freedom to have private functions && private members which can only be
   * consumed by our module. As they aren't exposed to the rest of the page, they're
   * considered truly private!!
   */
  var basketModule = (function(){

    // privates
    var basket = [];

    function doSomethingPrivate(){}
    function doSomethingElsePrivate(){}

    // Returns an object exposed to the public
    return {

      // Add items to our basket
      addItem: function addItem( values ) {
        basket.push( values );
      },

      // Get the count of items in the basket
      getItemCount: function getItemCount() {
        return basket.length;
      },

      // Public alias to a private function
      doSomething: doSomethingPrivate,

      // Get the total value of items in the basket
      getTotal: function getTotal(){

        var q = this.getItemCount(),
            p = 0;

        // Calculate totalCount using while loop for faster performance
        while (q--) {
          p += basket[q].price;
        }
        return p;
      }
    };
  })();

  // Adds break item
  basketModule.addItem({
    item: 'bread',
    price: 0.5
  });

  // Adds butter item
  basketModule.addItem({
    item: 'butter',
    price: 0.3
  });

  console.log(basketModule.getTotal() );

  // Test total basket value, and should be 0.5 + 0.3 = 0.8
  assert( basketModule.getTotal() === (0.5+0.3),
  'The Module Pattern: basketModule should contains 2 items: bread && butter');

  // ------------------------------------------------------------------------ //
  // -------------------- Module Pattern Variations ------------------------- //
  // ------------------------------------------------------------------------ //
  var anotherModule = (function( j, _){

    function privateMethod1() {
      var container = document.getElementById('j-container');
      if (!container) {
        container = document.createElement( 'div' );
        document.getElementsByTagName('body')[0].appendChild( container );
        container.setAttribute( 'id', 'j-container' );
      }
      j(container).html('jQuery container test');
    }

    function privateMethod2() {
      console.log(_.min([10, 5, 100, 2, 1000]) );
    }

    return {
      publicMethod: function(){
        privateMethod1();
      }
    };
  })( jQ, _);

  anotherModule.publicMethod();


})(window.jQuery, window._);