/**
 * Created by JayKan on 11/4/15.
 * Curry function implemented from Prototype library
 */
Function.prototype.curry = function(){

  /*
     - Store Function && 'prefill' arguments in variables so that will be used in closure
     - This technique is another good example of using closures to remember 'state'
   */
  var fn = this,
      args = Array.prototype.slice.call( arguments );
  /*
     - Creates the anonymous curried function
     - The result is a method [ object.method() ] that allows us to prefill
       arguments, giving us a new, simpler function that we can use
   */
  return function(){
    return fn.apply( this, args.concat(
      Array.prototype.slice.call( arguments )
    ));
  };
};

