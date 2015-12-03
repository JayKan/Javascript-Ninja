;(function(){

  'use strict';

  Function.prototype.method = function(name, func){
    if (!this.prototype[name]) {
      this.prototype[name] = func;
    }
    return this;
  };
})();