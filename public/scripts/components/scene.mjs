import { stringToArray } from '../utils/string.mjs'
import { appendElemets } from '../utils/dom.mjs'


document.addEventListener("DOMContentLoaded", () => {

  const scene = document.querySelector('#scene')
  const sceneName = scene.querySelector('#scene-name')

  replaceSceneNameWithHTML(sceneName)

  const letterDivs = sceneName.querySelectorAll('div')
  const letterFadeInConfig = [
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

  letterFadeIn(letterDivs, letterFadeInConfig)

  const letterSpans = sceneName.querySelectorAll('span')
  const sceneImage = scene.querySelector('img')

  scene.addEventListener('mousemove', evt => {
    letterMoveStart(evt, scene, letterSpans)
    imageMoveStart(evt, scene, sceneImage)
  })
  scene.addEventListener('mouseleave', () => {
    letterMoveStop(letterSpans)
  })

})


function replaceSceneNameWithHTML(sceneName) {
  const text = sceneName.textContent.trim()
  const letters = stringToArray(text)
  const html = generateSceneNameHtml(letters)
  sceneName.textContent = ''
  appendElemets(sceneName, html)
}

function generateSceneNameHtml(letters) {
  const html = letters.map(letter => {
    let el
    if (letter === 'br') {
      el = document.createElement('br')
    } else {
      el = document.createElement('div')
      const span = document.createElement('span')
      span.textContent = letter
      el.appendChild(span)
    }
    return el
  })
  return html
}

function letterFadeIn(letterDivs,  letterFadeInConfig) {
  letterDivs.forEach((div, i) => {
    const animationFrames = [
      {
        transform: `
          translate(${letterFadeInConfig[i].translateXFrom}%, ${letterFadeInConfig[i].translateYFrom}%)
          rotate(${letterFadeInConfig[i].rotateFrom}deg)
          scale(3)`,
        opacity: '0',
        filter: 'blur(8px)',
      },
      {
        transform: `
          translate(${letterFadeInConfig[i].translateXTo}%, ${letterFadeInConfig[i].translateYTo}%)
          rotate(${letterFadeInConfig[i].rotateTo}deg)
          scale(1.4)`,
        opacity: '1',
        filter: 'blur(0px)',
      },
    ]
    const animationConfig = {
      duration: letterFadeInConfig[i].duration,
      delay: letterFadeInConfig[i].delay,
      easing: 'cubic-bezier(.68,-0.55,.27,1.55)',
      fill: 'forwards',
    }
    div.animate(animationFrames, animationConfig)
  })
}

function letterMoveStart(evt, scene, letterSpans) {
  const sceneRect = scene.getBoundingClientRect()
  const mouseX = Math.round(evt.clientX - sceneRect.left)
  const mouseY = Math.round(evt.clientY - sceneRect.top)

  letterSpans.forEach(span => {
    const {shiftX, shiftY} = calculateShift(mouseX, mouseY, sceneRect, span)
    span.animate(
      {transform: `translate(${shiftX*3}%, ${shiftY}%)`},
      {duration: 10000, easing: 'cubic-bezier(.21,.47,.52,.81)', fill: 'forwards'}
    )
  })
}

function calculateShift(mouseX, mouseY, sceneRect, span) {
  const spanRect = span.getBoundingClientRect()
  const spanCenterX = spanRect.left + spanRect.width / 2 - sceneRect.left
  const spanCenterY = spanRect.top + spanRect.height / 2 - sceneRect.top

  const distanceX = mouseX - spanCenterX
  const distanceY = mouseY - spanCenterY

  const minShift = 0
  const maxShift = 2

  let shiftX = minShift + (maxShift - minShift) * (1 - Math.exp(-Math.abs(distanceX) / 100))
  let shiftY = minShift + (maxShift - minShift) * (1 - Math.exp(-Math.abs(distanceY) / 100))

  if (mouseX < spanCenterX) shiftX *= -1
  if (mouseY < spanCenterY) shiftY *= -1

  return {shiftX, shiftY}
}

function letterMoveStop(letterSpans) {
  letterSpans.forEach(span => {
    span.animate(
      {transform: 'translate(0%, 0%)'},
      {duration: 4000, easing: 'cubic-bezier(.21,.47,.52,.81)', fill: 'forwards'}
    )
  })
}

function imageMoveStart(evt, scene, sceneImage) {
  const sceneRect = scene.getBoundingClientRect()
  
  const mouseX = Math.round(evt.clientX - sceneRect.left)
  const mouseY = Math.round(evt.clientY - sceneRect.top)

  const centerX = sceneRect.width / 2
  const centerY = sceneRect.height / 2

  const offsetyX = ((mouseX - centerX) / centerX) * 10
  const offsetyY = ((mouseY - centerY) / centerY) * 10

  sceneImage.animate(
    {transform: `rotateX(${-1 * offsetyY}deg) rotateY(${offsetyX}deg) translateZ(-100px)`},
    {duration: 1000, easing: 'linear', fill: 'forwards'}
  )
}