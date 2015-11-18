;(function(){

  'use strict';

  /**
   * ----------------------------- Recursion -------------------------------------------
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

})();