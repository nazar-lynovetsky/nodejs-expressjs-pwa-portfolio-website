document.addEventListener( "DOMContentLoaded", () => {

  /**
   * Get HTML Elements
   */

  var scene = document.querySelector( '#scene' )
  var sceneName = scene.querySelector( '#scene-name' )

  /**
   * STEP 1: Replaces the plain text content in the figcaption with a hierarchical structure of DOM elements.
   */

  replaceTextWithHTML( sceneName )

  /**
   * STEP 2: Init Letter animation
   */

  const letterConfig = [
    {
      translateXFrom: -134,
      translateYFrom: -80,
      translateXTo: -34,
      translateYTo: -30,
      rotateFrom: -61,
      rotateTo: -31,
      duration: 5600,
      delay: 1900,
    },
    {
      translateXFrom: -48,
      translateYFrom: -27,
      translateXTo: 2,
      translateYTo: 23,
      rotateFrom: 93,
      rotateTo: 63,
      duration: 5800,
      delay: 2200,
    },
    {
      translateXFrom: -23,
      translateYFrom: -74,
      translateXTo: -23,
      translateYTo: -26,
      rotateFrom: -46,
      rotateTo: -16,
      duration: 6200,
      delay: 3100,
    },
    {
      translateXFrom: 72,
      translateYFrom: -35,
      translateXTo: 22,
      translateYTo: 15,
      rotateFrom: -65,
      rotateTo: -35,
      duration: 6000,
      delay: 2600,
    },
    {
      translateXFrom: 195,
      translateYFrom: -84,
      translateXTo: 95,
      translateYTo: -34,
      rotateFrom: 53,
      rotateTo: 23,
      duration: 6800,
      delay: 3900,
    },
    {
      translateXFrom: -75,
      translateYFrom: -25,
      translateXTo: -25,
      translateYTo: -75,
      rotateFrom: 50,
      rotateTo: 20,
      duration: 5500,
      delay: 1700,
    },
    {
      translateXFrom: -80,
      translateYFrom: 37,
      translateXTo: -40,
      translateYTo: -13,
      rotateFrom: -40,
      rotateTo: -10,
      duration: 5700,
      delay: 2100,
    },
    {
      translateXFrom: -60,
      translateYFrom: -2,
      translateXTo: -18,
      translateYTo: -52,
      rotateFrom: 65,
      rotateTo: 35,
      duration: 6100,
      delay: 2700,
    },
    {
      translateXFrom: -65,
      translateYFrom: 64,
      translateXTo: -40,
      translateYTo: 14,
      rotateFrom: 60,
      rotateTo: 90,
      duration: 6600,
      delay: 3400,
    },
    {
      translateXFrom: -23,
      translateYFrom: 65,
      translateXTo: -13,
      translateYTo: 15,
      rotateFrom: -40,
      rotateTo: -10,
      duration: 6600,
      delay: 3700,
    },
    {
      translateXFrom: -23,
      translateYFrom: 14,
      translateXTo: -34,
      translateYTo: -36,
      rotateFrom: -68,
      rotateTo: -38,
      duration: 5400,
      delay: 1400,
    },
    {
      translateXFrom: -15,
      translateYFrom: 78,
      translateXTo: -41,
      translateYTo: 28,
      rotateFrom: 57,
      rotateTo: 27,
      duration: 5900,
      delay: 2400,
    },
    {
      translateXFrom: 82,
      translateYFrom: 25,
      translateXTo: 32,
      translateYTo: -27,
      rotateFrom: 84,
      rotateTo: 54,
      duration: 6300,
      delay: 2900,
    },
    {
      translateXFrom: 110,
      translateYFrom: 15,
      translateXTo: 45,
      translateYTo: -35,
      rotateFrom: -33,
      rotateTo: -3,
      duration: 6200,
      delay: 2800,
    },
    {
      translateXFrom: 90,
      translateYFrom: -40,
      translateXTo: -6,
      translateYTo: -96,
      rotateFrom: -80,
      rotateTo: -50,
      duration: 6200,
      delay: 3000,
    },
  ]

  var letters = sceneName.querySelectorAll( 'div' )

  letters.forEach( (letter, i) => {

    var animation = letter.animate(
      [
        {
          transform: `
            translate(${letterConfig[i].translateXFrom}%, ${letterConfig[i].translateYFrom}%)
            rotate(${letterConfig[i].rotateFrom}deg)
            scale(3)`,
          opacity: '0',
          filter: 'blur(8px)',
        },
        {
          transform: `
            translate(${letterConfig[i].translateXTo}%, ${letterConfig[i].translateYTo}%)
            rotate(${letterConfig[i].rotateTo}deg)
            scale(1.4)`,
          opacity: '1',
          filter: 'blur(0px)',
        },
      ],
      {
        duration: letterConfig[i].duration,
        delay: letterConfig[i].delay,
        easing: 'cubic-bezier(.68,-0.55,.27,1.55)',
        fill: 'forwards',
      }
    )

  } )

 /**
   * STEP 3
   */

 var spans = sceneName.querySelectorAll( 'span' )


scene.addEventListener('mousemove', e => {
    var sceneRect = scene.getBoundingClientRect();
    var mouseX = e.clientX - sceneRect.left;
    var mouseY = e.clientY - sceneRect.top;

    spans.forEach( (span, i) => {
      var figcaptionRect = span.getBoundingClientRect();
      var figcaptionCenterX = figcaptionRect.left + figcaptionRect.width / 2 - sceneRect.left;
      var figcaptionCenterY = figcaptionRect.top + figcaptionRect.height / 2 - sceneRect.top;
  
      var distanceX = mouseX - figcaptionCenterX;
      var distanceY = mouseY - figcaptionCenterY;
  
      var minShift = 0;
      var maxShift = 3;
  
      var shiftX = minShift + (maxShift - minShift) * (1 - Math.exp(-Math.abs(distanceX) / 100));
      var shiftY = minShift + (maxShift - minShift) * (1 - Math.exp(-Math.abs(distanceY) / 100));
  
      if (mouseX < figcaptionCenterX) shiftX *= -1;
      if (mouseY < figcaptionCenterY) shiftY *= -1;
  
      const translation = `translate(${shiftX}%, ${shiftY}%)`;
  
      const anim = span.animate(
        { transform: translation },
        { duration: 10000, easing: 'cubic-bezier(.21,.47,.52,.81)' }
      );
    } )


})

scene.addEventListener('mouseleave', e => {

  spans.forEach( (span, i) => {
    const translation = `translate(${0}%, ${0}%)`;
    const anim = span.animate(
      { transform: translation },
      { duration: 6000, easing: 'cubic-bezier(.21,.47,.52,.81)', fill: 'forwards' }
    );
  } )

} )




} )























// function trackMouseMove( scene, figcaption ) {
//   scene.addEventListener('mousemove', e => {
//     var sceneRect = scene.getBoundingClientRect();
//     var mouseX = e.clientX - sceneRect.left;
//     var mouseY = e.clientY - sceneRect.top;

//     var figcaptionRect = figcaption.getBoundingClientRect();
//     var figcaptionCenterX = figcaptionRect.left + figcaptionRect.width / 2 - sceneRect.left;
//     var figcaptionCenterY = figcaptionRect.top + figcaptionRect.height / 2 - sceneRect.top;

//     var distanceX = mouseX - figcaptionCenterX;
//     var distanceY = mouseY - figcaptionCenterY;

//     // Минимальное и максимальное смещение
//     var minShift = 0;
//     var maxShift = 3;

//     // Рассчитываем смещение с использованием линейной интерполяции
//     var shiftX = minShift + (maxShift - minShift) * (1 - Math.exp(-Math.abs(distanceX) / 100));
//     var shiftY = minShift + (maxShift - minShift) * (1 - Math.exp(-Math.abs(distanceY) / 100));

//     // Отрицательное смещение, если курсор находится слева или сверху от центра figcaption
//     if (mouseX < figcaptionCenterX) shiftX *= -1;
//     if (mouseY < figcaptionCenterY) shiftY *= -1;

//     console.log('hor:', shiftX);
//     console.log('ver:', shiftY);

//     const translation = `translate(${shiftX}%, ${shiftY}%)`;

//     const anim = figcaption.animate(
//       { transform: translation },
//       { duration: 30, fill: 'forwards' }
//     );
//   });
// }













function replaceTextWithHTML( sceneName ) {
  var text = sceneName.textContent.trim()
  var letters = stringToArray( text )
  var html = wrapLettersInHTML( letters )
  appendHTMLToContainer( sceneName, html )
}


function stringToArray( string ) {
  var letters = []
  for ( var i = 0; i < string.length; i++ ) {
    letters.push( string[ i ] === ' ' ? 'br' : string[ i ] )
  }
  return letters
}


function wrapLettersInHTML( letters ) {
  var html = letters.map( letter => {
    var element
    if ( letter === 'br' ) {
      element = document.createElement( 'br' )
    } else {
      element = document.createElement('div')
      var span = document.createElement('span')
      span.textContent = letter
      element.appendChild(span)
    }
    return element
  } )
  return html
}


function appendHTMLToContainer( container, html ) {
  container.textContent = ''
  html.forEach( el => {
    container.appendChild( el )
  } )
}































