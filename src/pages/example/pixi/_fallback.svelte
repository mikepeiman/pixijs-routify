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
    container.position = new PIXI.Point(0.5, 0.5);
    app.stage.addChild(container);
    let delta = 0;
    let _w = window.innerWidth;
    let _h = window.innerHeight;

    // generate array of ships Graphics() objects
    let ships = [];
    // generateShips(50);

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
    shipC.lineStyle(1, 0xffb0ff);
    shipC.beginFill(0xffbbff);
    shipC.drawCircle(0, 0, 15);
    shipC.endFill();
    container.addChild(shipC)
    function makeShipCircle() {
      let w = container.width
      let h = container.height
      shipC.x = w + w * Math.cos((angle * Math.PI) / 180);
      shipC.y = h + h * Math.sin((angle * Math.PI) / 180);
      angle++;
      console.log(`makeShipCircle: angle ${angle}`)
      if(angle > 360){angle = 0}
      // angle > 360 ? angle : (angle = 0);
      setTimeout(() => {
        makeShipCircle()
      }, 16);
    }
    makeShipCircle()

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

    // function sleep(milliseconds) {
    //   const date = Date.now();
    //   let currentDate = null;
    //   // console.log(`inside sleep(${milliseconds})`);
    //   do {
    //     currentDate = Date.now();
    //     // console.log(`inside currentDate(${currentDate})`);
    //   } while (currentDate - date < milliseconds);
    // }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    let deltaX, deltaY;
    console.log(`container (ships) children `, container.children);
    // let delta = 0;
    function animate() {
      // delta += 360 / ships.length;
      deltaX = 0.01;
      let rand1 = Math.random();
      let rand2 = Math.random();
      let thisX = Math.round(rand1) > 0 ? 0.01 * rand1 : -0.01 * rand1;
      let thisY = Math.round(rand2) > 0 ? 0.01 * rand2 : -0.01 * rand2;
      // deltaY = deltaY + thisY
      // console.log(`rand1 ${rand1} rand2 ${rand2} thisY `, thisY);
      // delta = Math.random()
      // app.renderer.render(app.stage);
      // sleep(250);
      // container.position.x = 100 + Math.sin(delta) * 10;
      for (let i = 0; i < ships.length; i++) {
        // console.log(`ships[${i}] counted inside of animate()`);
        // ships[i].x = Math.random() * 0.05;
        let randX = Math.random();
        let randY = Math.random();
        if (Math.round(randX) > 0) {
          ships[i].x +=
            Math.sin(Math.random() * thisX) *
            Math.random() *
            _w *
            Math.round(Math.random());
        } else {
          ships[i].x -=
            Math.sin(Math.random() * thisX) *
            Math.random() *
            _w *
            Math.round(Math.random());
        }
        if (Math.round(randY) > 0) {
          ships[i].y +=
            Math.sin(Math.random() * thisY) *
            Math.random() *
            _h *
            Math.round(Math.random());
        } else {
          ships[i].y -=
            Math.sin(Math.random() * thisY) *
            Math.random() *
            _h *
            Math.round(Math.random());
        }

        // ship[i].y = 100 + Math.sin(delta) * 10
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
