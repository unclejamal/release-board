function $_GET(param) {
  var vars = {};
  window.location.href.replace( location.hash, '' ).replace( 
      /[?&]+([^=&]+)=?([^&]*)?/gi,
      function( m, key, value ) {
        vars[key] = value !== undefined ? value : '';
      }
      );

  if ( param ) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
}
