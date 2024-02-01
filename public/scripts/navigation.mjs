var navEl = document.querySelector( '#nav' )
var buttonEl = nav.querySelector( 'button' )

buttonEl.addEventListener( 'click', e => {
  setAriaExpanded( buttonEl, !getAriaExpanded( buttonEl ) )
} )

navEl.addEventListener( 'keyup', e => {
  if ( e.code === 'Escape' ) {
    setAriaExpanded( buttonEl, false )
  }
} )

function getAriaExpanded( el ) {
  return el.getAttribute( 'aria-expanded' ) === 'true'
}

function setAriaExpanded( el, val ) {
  el.setAttribute( 'aria-expanded', val )
}

