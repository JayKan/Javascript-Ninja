function assert( value, description ){
  var li = document.createElement( 'li' );
  li.className = value ? 'pass' : 'fail';
  li.appendChild( document.createTextNode(description) );
  document.getElementById('results').appendChild( li );
}