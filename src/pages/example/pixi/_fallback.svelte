<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import { circular } from "./circular.js";
  //  using video tutorial at https://www.youtube.com/watch?v=2J0VUiozAVM&list=PL08jItIqOb2oGcyrgREbrm_b9OW7TE1ji&index=3
  let ships = [],
    radialInterval,
    numShips;
  $: {
    numShips = ships.length || 1;
    console.log(`numShips reactive update ${numShips}`);
  }
  $: {
    radialInterval = 360 / numShips;
    console.log(`radialInterval ${radialInterval}`);
  }
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
    let rw = app.renderer.width;
    let rh = app.renderer.height;
    container.position = new PIXI.Point(0, 0);
    container.width = rw;
    container.height = rh;
    app.stage.addChild(container);
    let delta = 0;
    let _w = window.innerWidth;
    let _h = window.innerHeight;
    let w = _w / 2;
    let h = _h / 2;
    let angle = 0;
    // generate array of ships Graphics() objects

    generateShips(30);
    setTimeout(() => {
      generateShips(30);
      // setTimeout(() => {
      //   generateShips(30);
      //   setTimeout(() => {
      //     generateShips(30);
      //     setTimeout(() => {
      //       generateShips(30);
      //       setTimeout(() => {
      //         generateShips(30);
      //       }, 500);
      //     }, 500);
      //   }, 500);
      // }, 500);
    }, 1500);

    // app.ticker.deltaMS = 1000000;
    // app.ticker.deltaTime = 0.001;
    // app.ticker.add(animate);
    // app.ticker.start();

    PIXI.utils.sayHello(type);
    console.log(PIXI.utils.TextureCache);
    PIXI.utils.sayHello(PIXI.utils.TextureCache);

    window.addEventListener("resize", resize);
    function resize() {
      _w = window.innerWidth;
      _h = window.innerHeight;
      app.renderer.resize(_w, _h);
    }

    let shipC = new PIXI.Graphics();
    shipC.lineStyle(3, 0xafb0ff);
    shipC.beginFill(0xafbbff);
    shipC.drawCircle(0, 0, 15);
    shipC.endFill();
    // shipC.position = new PIXI.point(0,0)
    container.addChild(shipC);

    function makeShipCircle(el, w, h, i) {
      el.x = w + w * Math.cos(((angle + radialInterval * i) * Math.PI) / 180);
      el.y = h + h * Math.sin(((angle + radialInterval * i) * Math.PI) / 180);
      angle++;
      if (angle > 360) {
        angle = 0;
      }
      // angle > 360 ? angle : (angle = 0);
      // setTimeout(() => {
      //   makeShipCircle(el, w, h, i);
      // }, 16);
    }

    makeShipCircle(shipC, w, h, 1);

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
        // ship.x = Math.random() * app.renderer.screen.width;
        // ship.y = Math.random() * app.renderer.screen.height;
        ship.tint = Math.random() * 0xffffff;
        // ship.anchor.set(0.5);
        // ship.blendMode = PIXI.BLEND_MODES.MULTIPLY
        container.addChild(ship);
        // ships.push(ship);
        ships = [...ships, ship];
        makeShipCircle(ship, w, h, i);
      }
    }
    let i = 0, j = 0
    function draw(el) {
      // requestAnimationFrame(draw(el));
      // el.fillStyle = "rgba(255, 255, 255, 0.4)";
      // el.fillRect(0, 0, canvas.width, canvas.height);

      // mouseOld.x += (mouse.x - mouseOld.x) * 0.05;
      // mouseOld.y += (mouse.y - mouseOld.y) * 0.05;
      let x = w + Math.cos(j) * 100;
      let y = h + Math.sin(j) * 100;

      let xx = x + Math.cos(i + j) * 50;
      let yy = y + Math.sin(i + j) * 50;
      el.x = xx
      el.y = yy
      i += 0.08;
      j += 0.05;
    }

    draw(shipC);

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function animate() {
      // requestAnimationFrame(animate)
      // for (let i = 0; i < ships.length; i++) {
      //   makeShipCircle(ships[i], w, h, i);
      // }
      // app.renderer.render(app.stage)
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
