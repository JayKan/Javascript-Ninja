/**
 * Created by JayKan on 11/4/15.
 */
Function.prototype.partial = function(){
  var fn = this, args = Array.prototype.slice.call( arguments );

  return function(){
    var arg = 0;
    for ( var i = 0, j = args.length; i < j && arguments.length; i++ ){
      if ( args[i] === undefined ){
        args[i] = arguments[arg++];
      }
    }
    return fn.apply( this, args );
  }
};
