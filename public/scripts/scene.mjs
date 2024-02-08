document.addEventListener( "DOMContentLoaded", () => {

  /**
   * Get HTML Elements
   */

  var scene = document.querySelector( '#scene' )
  var figcaption = scene.querySelector( 'figcaption' )

  /**
   * STEP 1: Replaces the plain text content in the figcaption with a hierarchical structure of DOM elements.
   */

  replaceTextWithHTML( figcaption )

  /**
   * STEP 2: YO! YO! YO!
   */

} )


function replaceTextWithHTML( container ) {
  var text = container.textContent.trim()
  var letters = stringToArray( text )
  var html = wrapLettersInHTML( letters )
  appendHTMLToContainer( container, html )
}


function stringToArray( string ) {
  var letters = []
  for ( var i = 0; i < string.length; i++ ) {
    letters.push( string[ i ] === ' ' ? '\n' : string[ i ] )
  }
  return letters
}


function wrapLettersInHTML( letters ) {
  var html = letters.map( letter => {
    var div = document.createElement( 'div' )
    div.textContent = letter
    return div
  } )
  return html
}


function appendHTMLToContainer( container, html ) {
  container.textContent = ''
  html.forEach( el => {
    container.appendChild( el )
  } )
}































// scene.addEventListener('mousemove', e => {
//   var sceneRect = scene.getBoundingClientRect();
//   var mouseX = e.clientX - sceneRect.left;
//   var mouseY = e.clientY - sceneRect.top;

//   var figcaptionRect = figcaption.getBoundingClientRect();
//   var figcaptionCenterX = figcaptionRect.left + figcaptionRect.width / 2 - sceneRect.left;
//   var figcaptionCenterY = figcaptionRect.top + figcaptionRect.height / 2 - sceneRect.top;

//   var distanceX = mouseX - figcaptionCenterX;
//   var distanceY = mouseY - figcaptionCenterY;

//   // Минимальное и максимальное смещение
//   var minShift = 1;
//   var maxShift = 50;

//   // Рассчитываем смещение с использованием линейной интерполяции
//   var shiftX = minShift + (maxShift - minShift) * (1 - Math.exp(-Math.abs(distanceX) / 100));
//   var shiftY = minShift + (maxShift - minShift) * (1 - Math.exp(-Math.abs(distanceY) / 100));

//   // Отрицательное смещение, если курсор находится слева или сверху от центра figcaption
//   if (mouseX < figcaptionCenterX) shiftX *= -1;
//   if (mouseY < figcaptionCenterY) shiftY *= -1;

//   console.log('hor:', shiftX);
//   console.log('ver:', shiftY);

//   figcaption.style.transform = `translate(${shiftX}%, ${shiftY}%)`;
// });