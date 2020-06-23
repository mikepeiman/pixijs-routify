<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import { circular } from "./circular.js";
  //  using video tutorial at https://www.youtube.com/watch?v=2J0VUiozAVM&list=PL08jItIqOb2oGcyrgREbrm_b9OW7TE1ji&index=3

  onMount(() => {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }

    let canvas = document.querySelector("#pixi");
    let app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight
    });
    app.renderer.backgroundColor = 0xe0f0ff;

    // initialize container for ships
    let container = new PIXI.Container();
    // container.position.x = 0 - app.renderer.screen.width / 2;
    // container.position.y = 0 - app.renderer.screen.height / 2;
    // container.width = app.renderer.screen.width
    // container.height = app.renderer.screen.height
    let rw = app.renderer.width;
    let rh = app.renderer.height;
    container.position = new PIXI.Point(0, 0);
    // container.x = rw / 2;
    // container.x = rw / 2;
    // container.y = 0;
    // container.y = 0;
    container.width = rw;
    container.height = rh;
    app.stage.addChild(container);
    let delta = 0;
    let _w = window.innerWidth;
    let _h = window.innerHeight;

    // generate array of ships Graphics() objects
    let ships = [];
    generateShips(50);

    app.ticker.deltaMS = 1000;
    app.ticker.deltaTime = 0.1;
    app.ticker.add(animate);
    app.ticker.start();

    PIXI.utils.sayHello(type);
    console.log(PIXI.utils.TextureCache);
    PIXI.utils.sayHello(PIXI.utils.TextureCache);

    window.addEventListener("resize", resize);
    function resize() {
      _w = window.innerWidth;
      _h = window.innerHeight;
      app.renderer.resize(_w, _h);
    }

    // let starsGroup = new PIXI.Container();
    // app.stage.addChild(starsGroup);

    // app.stage.addChild(ship)
    function circular(element, windowWidth, windowHeight, x, y, angle) {
      let w = windowWidth;
      let h = windowHeight;
      let el = element;
      console.log(`circular.js imported not IIFE`);
      x = w + w * Math.cos((angle * Math.PI) / 180);
      y = h + h * Math.sin((angle * Math.PI) / 180);
      angle++;
      angle > 360 ? angle : (angle = 0);
      setTimeout(() => {
        circular(el, w, h, x, y, angle);
      }, 20);
    }
    let angle = 0;
    let shipC = new PIXI.Graphics();
    shipC.lineStyle(3, 0xafb0ff);
    shipC.beginFill(0xafbbff);
    shipC.drawCircle(0, 0, 15);
    shipC.endFill();
    // shipC.position = new PIXI.point(0,0)
    container.addChild(shipC);

    function makeShipCircle(el, w, h) {
      // el = shipC
      // let w = container.width
      // let h = container.height
      // w = 300
      // h = 300
      // w = parseInt(w)
      // h = parseInt(h)
      shipC.x = w + w * Math.cos((angle * Math.PI) / 180);
      shipC.y = h + h * Math.sin((angle * Math.PI) / 180);
      angle++;
      // console.log(`makeShipCircle: w ${w} h ${h} angle ${angle}, shipX ${shipC.x}, shipY ${shipC.y}`)
      if (angle > 360) {
        angle = 0;
      }
      // angle > 360 ? angle : (angle = 0);
      setTimeout(() => {
        makeShipCircle(el, w, h);
      }, 16);
    }
    let w = _w / 2;
    let h = _h / 2;
    makeShipCircle(shipC, w, h);

    function nextCircle(el, w, h) {
      el.x = w + w * Math.cos((angle * Math.PI) / 180);
      el.y = h + h * Math.sin((angle * Math.PI) / 180);
      angle++;
      if (angle > 360) {
        angle = 0;
      }
    }

    function generateShips(fleetSize) {
      for (let i = 0; i < fleetSize; i++) {
        let ship = new PIXI.Graphics();
        ship.lineStyle(1, 0x0fb0ff);
        ship.beginFill(0xaabbff);
        ship.drawCircle(0, 0, 5);
        ship.endFill();
        let rand = Math.random() * 0.1;
        // ship.scale = new PIXI.Point(5, 5);
        let x = 0,
          y = 0,
          angle = 0;
        // circular(ship, _w, _h, x, y, angle);
        ship.x = Math.random() * app.renderer.screen.width;
        ship.y = Math.random() * app.renderer.screen.height;
        ship.tint = Math.random() * 0xffffff;
        // ship.anchor.set(0.5);
        // ship.blendMode = PIXI.BLEND_MODES.MULTIPLY
        container.addChild(ship);
        ships.push(ship);
      }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    let deltaX, deltaY;
    console.log(`container (ships) children `, container.children);
    // let delta = 0;
    function animate() {
      deltaX = 0.01;
      for (let i = 0; i < ships.length; i++) {
        nextCircle(ships[i], w, h);
      }
    }
  });
</script>

<style>
  #pixi {
    max-width: 100%;
    max-height: 70vh;
    min-width: 70vw;
    left: 15vw;
  }
</style>

<div style="text-align: center">
  <h1>PixiJS playground</h1>
  <canvas id="pixi" />
</div>
