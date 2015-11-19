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

  // Use immediately invoked functions to construct a Module
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

})();