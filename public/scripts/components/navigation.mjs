var nav = document.querySelector( '#nav' )
var button = nav.querySelector( 'button' )

/**
 * Event Listeners
 */

button.addEventListener( 'click', e => {
  setAriaExpanded( button, !getAriaExpanded( button ) )
} )

nav.addEventListener( 'keyup', e => {
  if ( e.code === 'Escape' ) {
    setAriaExpanded( button, false )
  }
} )

/**
 * Methods
 */

function getAriaExpanded( el ) {
  return el.getAttribute( 'aria-expanded' ) === 'true'
}

function setAriaExpanded( el, val ) {
  el.setAttribute( 'aria-expanded', val )
}

