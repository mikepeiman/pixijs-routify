import {Engine, Sink, Drag} from 'heegs'

// Create a new instance
const numberOfParticles = 10
const h = new Engine(numberOfParticles)

/**
 * [Optional]
 * Set particles initial mass, position and velocity
 * default values are:
 * mass = 1
 * position = [0, 0]
 * velocity = [0, 0]
 */
h.setParticlesParams((index, {setMass, setPosition, setVelocity}) => {
  const mass = 1 + index
  const x = Math.random()
  const y = Math.random()
  const v_x = Math.random()
  const v_y = Math.random()
  setMass(mass)
  setPosition(x, y)
  setVelocity(v_x, v_y)
})

// Add a new behavior to the engine
const s = h.addBehavior(Sink)
// Customize behavior's parameters
s.setIntensity(10)
s.setCenter(1, 1)

// Behaviors can be added/removed while engine is running
setTimeout(() => {
  h.removeBehavior(s)

  const d = h.addBehavior(Drag)
  const fixedCoeff = 1
  const randomCoeff = 1
  d.setIntensity(fixedCoeff, randomCoeff)
}, 2000)

// Start calculation
h.start(performance.now())
play()

function play() {
  // Update particles
  h.update(performance.now())

  // position of particles is accessible via h.positionData
  // h.positionData is a Float32Array
  // so we can put it in a webGL buffer directly
  webGL.replacePositionBuffer(h.positionData)

  requestAnimationFrame(play)
}