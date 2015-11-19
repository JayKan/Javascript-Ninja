;(function(){

  'use strict';

  Function.prototype.method = function(name, func) {
    // Adds a method conditionally based on current prototype
    if (!this.prototype[name]) {
      this.prototype[name] = func;
    }
    return this;
  };

  /**
   * -------------------------------- Recursion -----------------------------------------
   *
   * A recursive function is a function that calls itself, either directly or indirectly.
   *
   * Recursive functions can be very effective in manipulating tree structures such as the
   * browser's Document Object Model (DOM). Each recursive call is given a smaller piece of
   * the tree to work on.
   *
   */
  var hanoi = function hanoi(disc, src, aux, dst) {
    if (disc > 0) {
      hanoi(disc - 1, src, dst, aux);
      document.writeln(
        '<p class="result">' +
        'Move disc' + disc + ' from ' + src + ' to ' + dst +
        '</p>'
      );
      hanoi(disc -1, aux, src, dst );
    }
  };
  hanoi(3, 'Src', 'Aux', 'Dst');

  /**
   * @private
   * @kind function
   * @description
   *
   * Define the walk_the_DOM function that visits every node of the tree in HTML
   * source order, starting from some given node. It invokes a function, passing it
   * each node in turn. walk_the_DOM calls itself to process each of the child nodes.
   *
   */
  var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
      walk(node, func);
      node = node.nextSibling;
    }
  };

  /**
   * @private
   * @kind function
   * @description
   *
   * Define a getElementsByAttribute function. It takes an attribute name string and an optional
   * matching value. It calls walk_the_DOM, passing it a function looks for an attribute name in the
   * node. the matching nodes are accumulated in results array.
   *
   */
  var getElementsByAttribute = function(att, value) {
    var results = [];
    walk_the_DOM(document.body, function(node){
      var actual = node.nodeType === 1 & node.getAttribute(att);
      if (typeof actual === 'string' &&
         (actual === value || typeof value !== 'string')) {
        results.push(node);
      }
    });
    return results;
  };

  /**
   * ----------------------------- Closure ----------------------------------
   *
   * Instead of initializing myObject with an object literal, we will initialize myObject
   * by calling a function that returns an object literal.
   *
   * We are NOT assigning a function myObject in this case. Instead, we are assigning the
   * result of invoking that function.
   */
  var myObject = (function(){
    var value = 0;
    return {
      increment: function(inc){
        value+= typeof inc === 'number' ? inc: 1;
      },
      getValue: function(){
        return value;
      }
    };
  })();

  /**
   * @private
   * @kind function
   * @description
   *
   * Define a function that sets a DOM node's color
   * to yellow and then fades it to white
   */
  var fade = function(node) {
    var level = 1;
    var step = function(){
      var hex = level.toString(16);
      node.style.backgroundColor = '#FFFF' + hex + hex;
      if (level < 15) {
        level+=1;
        setTimeout(step, 100);
      }
      setTimeout(step, 100);
    }
  };
  fade(document.body);

  /**
   * @private
   * @kind function
   * @param nodes
   * @description
   *
   * The add_the_handlers function was intended to give each handler
   * a unique number i. It fails because the handler functions
   * was bound to the variable i, not the value of teh variable i at the
   * time the function was declared.
   *
   * By creating a helper function outside of the loop, it will deliver a function
   * that binds to the current value of i.
   */
  var add_the_handlers = function(nodes) {
    var helper = function(i){
      return function(e){
        alert(i);
      };
    };
    var i, ii;
    for ( i = 0, ii = nodes.length; i < ii; i+=1 ) {
      nodes[i].onClick = helper(i);
    }
  };

  /**
   * Use immediately invoked functions to construct a Module pattern.
   *
   * The general pattern of a module is a function that defines private variables
   * and functions; creates privileged function which, through closure, will have
   * access to the private variables and functions; and that returns the privileged
   * functions or stores them in an accessible place.
   *
   ******************** Benefits of leveraging a module pattern ***************
   * 1) Use of the module pattern can eliminate the use of global variables.
   * 2) It promotes information hiding and other good design practices.
   * 3) It is very effective in encapsulating applications and other singletons.
   * 4) It can be used to produce objects that are secure.
   *
   */
  String.method('deentityify', function(){
    // The entity table. It maps names to characters.
    var entity = {
      quot: '""',
      lg:   '<',
      gt:   '>'
    };

    // Return the deentityify method.
    return function(){
      // This is the deentityify method. It calls the string
      // replace method, looking for substrings that start with
      // '&' and end with ';'. If the characters in between are
      // in the entity table, then replace the entity with the
      // character from the table.
      return this.replace(/&([^&;]+);/g,
        function(a, b) {
          var r = entity[b];
          return typeof r === 'string' ? r : a;
        }
      );
    };
  }());

  /**
   ********************** Module pattern example ******************
   * @description
   * Lets suppose we want to make an object that produces a serial number
   */
  var serial_maker = function(){

    // Produce an object that produces unique strings. A
    // unique string is made up of two parts: a prefix
    // and a sequence number. The object comes with methods
    // for setting the prefix and sequence number, and a
    // system that produces unique strings.
    var prefix = '';
    var seq = 0;

    return {
      set_prefix: function(p) {
        prefix = String(p);
      },
      set_seq: function(s) {
        seq = s;
      },
      gensym: function(){
        var result = prefix + seq;
        seq+=1;
        return result;
      }
    };
  };
  var maker = serial_maker();
  maker.set_prefix('Q');
  maker.set_seq(1000);
  var unique = maker.gensym();
  assert( unique === 'Q1000',
  'Unique serial number should equals to Q1000');

  /**
   ******************************** Cascade *********************************
   *
   * Some methods do not return value. For example, it is typical for methods
   * that set or change the state of an object to return nothing. If we have
   * those methods return 'this' instead of 'undefined', we can enable cascades [ chaining ].
   *
   * In a cascade, we can call many methods on the same object in sequence in a single statement.
   *
   * Cascading can produce interfaces that are very expressive. It can help
   * control the tendency to make interfaces that try to do too much at once!
   *
   * Example:
   *    getElement('myBoxDiv')
   *      .move(350, 150)
   *      .width(100)
   *      .height(100)
   *      .color('red')
   *      .border('10px outset')
   *      .on('mousedown', function(m){
   *        this.startDrag(m, this.getNinth(m)
   *      });
   *      .on('mousemove', 'drag')
   *      .on('mouseup', 'stopDrag')
   *      .later(2000, function(){
   *        this
   *          .color('yellow')
   *          .setHtml('Yeah set HTML here')
   *          .slide(400, 40, 200, 200)
   *      });
   */


  /**
   ************************************ Curry **************************************
   *
   * Functions are values. Currying allows us to produce a new function by combining
   * a function and an argument.
   *
   * The curry method works by creating a closure that holds that original function and
   * the arguments to curry. It returns a function that, when invoked, returns the result
   * of calling that original function, passing it all of the arguments from the invocation
   * of curry and the current invocation.
   */
  Function.method('curry', function(){
    var slice = Array.prototype.slice,
        args = slice.call(arguments),
        fn = this;
    return function(){
      return fn.apply(this, args.concat(
        slice.call(arguments)
      ));
    };
  });
  var add = function(a, b){
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw{
        name: 'TypeError',
        message: 'adds need numbers'
      };
    }
    return a + b;
  };
  var add1 = add.curry(1);
  document.writeln(
    '<p class="result">' +
    'Add1 Curry(6) Results: ' + add1(6) +
    '</p>'
  );

  /**
   *********************************** Memoization *************************************
   *
   * Functions can use objects to remember to results of the previous operations, making
   * it possible to avoid unnecessary work. This optimization is called memoization. JavaScript's
   * objects and arrays are very convenient for this.
   *
   * A Fibonacci number is the sum of the two previous Fibonacci numbers.
   * The first two are [ 0, 1 ]
   *
   */
  var fibonacci = function(n) {
    return n < 2 ? n: fibonacci(n - 1) + fibonacci(n -2);
  };

  // A better version of fibonacci to avoid unnecessary work.
  // By memoize the function, we can significantly reduce its workload.
  var fibonacci_improved = (function(){

    // This is our memoized results in a memo array
    // that we can hide in a closure.
    var memo = [0, 1];

    // When our function is called, it first looks to see
    // if it already knows the result.
    var fib = function(n) {
      var result = memo[n];
      if (typeof result !== 'number') {
        result = fib(n-1) + fib(n-2);
        memo[n] = result;
      }
      return result;
    };
    return fib;
  }());

  for (var i = 0; i <= 10; i+=1) {
    document.writeln(
      '// ' + i + ': ' + fibonacci_improved(i)
    );
  }


  /**
   * We can generalize this by making a function that helps us
   * make memoized functions.
   *
   * The memoizer function will take an initial memo array and
   * the formula function. It returns a recur function that manages
   * the memo store and that calls the formula function as needed.
   */
  var memoizer = function(memo, formula) {
    var recur = function(n){
      var result = memo[n];
      if (typeof result !== 'number') {
        result = formula(recur, n);
        memo[n] = result;
      }
      return result;
    };
    return recur;
  };

  // Now we can define fibonacci with the memoizer, providing the
  // initial memo array, and formula function.
  var fibonacci_memoized = memoizer([0, 1], function(recur, n) {
    return recur(n-1) + recur(n-2);
  });

  for (var j = 0; j <= 10; j+=1) {
    console.log(
      '// ' + i + ': ' + fibonacci_memoized(j)
    );
  }
  function makeMemoizedResult(){
    var result = {};
    for ( var i = 0; i <= 10; i+=1 ) {
      result[i] = fibonacci_memoized(i);
    }
    return result;
  }
  var results = makeMemoizedResult();
  console.log(results);
  assert( Object.keys(results).length === 11,
  'Fibonacci_memoized should have 11 results being memoized!');


  /**
   * ********************* Factorial Memoized Function ***********************
   *
   * By devising functions that produce other functions, we can significantly
   * reduce the amount of work we have to do. For example, to produce a
   * memoizing factorial function, see below:
   */
  var factorial = memoizer([1,1], function(recur, n){
    return n * recur(n-1);
  });

  var factorial_result = factorial(4); // n! = n * (n-1)! => 4! = 4 * 3! = 4x6 =24
  assert(factorial_result === 24,
  'Factorial_memoizer should produce 4! === 4 * 3! === 24');


})();