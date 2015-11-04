function assert( value, description ){
  var resultsList = document.getElementById( 'results' );
  if ( !resultsList ){
    resultsList = document.createElement( 'ul' );
    document.getElementsByTagName('body')[0].appendChild( resultsList );
    resultsList.setAttribute('id', 'results');
  }
  var li = document.createElement( 'li' );
  li.className = value ? 'pass' : 'fail';
  li.appendChild( document.createTextNode(description) );
  resultsList.appendChild( li );
}