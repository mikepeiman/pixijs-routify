
// import this IIFE just like a regular exported object: import { test } from "./circular.js";
export const test = (function() {
  console.log(`circular.js imported`)
}())

// import this exported function as usual:   import { circular } from "./circular.js";
export function circular(element, windowWidth, windowHeight, x, y, angle) {
  let w = windowWidth
  let h = windowHeight
  let el = element
  console.log(`circular.js imported not IIFE`)
  x = w + w * Math.cos(angle * Math.PI / 180)
  y = h + h * Math.sin(angle * Math.PI / 180)
  angle++
  angle > 360 ? angle : angle = 0
  setTimeout(() => {
    circular(el, w, h, x, y, angle)
  }, 20);
}

export function circular2(element, windowWidth, windowHeight, x, y, angle) {
  let w = windowWidth
  let h = windowHeight
  let el = element
  console.log(`circular.js imported not IIFE`)
  x = w + w * Math.cos(angle * Math.PI / 180)
  y = h + h * Math.sin(angle * Math.PI / 180)
  angle++
  angle > 360 ? angle : angle = 0
  setTimeout(() => {
    circular(el, w, h, x, y, angle)
  }, 20);
}