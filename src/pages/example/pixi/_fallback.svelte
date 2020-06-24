<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import { circular } from "./circular.js";
  //  using video tutorial at https://www.youtube.com/watch?v=2J0VUiozAVM&list=PL08jItIqOb2oGcyrgREbrm_b9OW7TE1ji&index=3
  let ships = [],
    stars = [],
    radialInterval,
    numShips,
    rotationSpeed = 0.0001;
  $: {
    numShips = ships.length || 30;
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
    let mainContainer = new PIXI.Container();
    let rw = app.renderer.width;
    let rh = app.renderer.height;
    mainContainer.position = new PIXI.Point(0, 0);
    mainContainer.width = rw;
    mainContainer.height = rh;
    app.stage.addChild(mainContainer);
    let delta = 0;
    let _w = window.innerWidth;
    let _h = window.innerHeight;
    let w = _w / 2;
    let h = _h / 2;
    let origin = { x: w, y: h };
    let angle = 0;
    let radius = 50;

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

    placeShipsAroundStar(origin, radius, _w, _h, 20);
    radius = 75;
    origin = { x: w - radius * 2, y: h + radius * 2 };
    placeShipsAroundStar(origin, radius, _w, _h, 20);
    radius = 35;
    origin = { x: w + radius * 2, y: h - radius * 2 };
    placeShipsAroundStar(origin, radius, _w, _h, 20);

    function createStarContainer(origin) {
      console.log(`createStarContainer(origin) ${origin.x}:${origin.y}`);
      let container = new PIXI.Container();
      // mainContainer.addChild(container);
      container.position = new PIXI.Point(origin.x, origin.y);
      // app.stage.addChild(container);
      return container;
    }

    function createStar(radius, origin) {
      let container = new PIXI.Container();
      let star = new PIXI.Graphics();
      let numStars = stars.length;
      console.log(`number of stars: ${numStars}`);
      star.position = new PIXI.Point(0.5, 0.5);
      star.starNum = numStars + 1;
      star.lineStyle(1, 0x0fb0ff);
      star.beginFill(0xaabbff);
      star.drawCircle(0, 0, radius - 15);
      star.endFill();
      star.tint = 0xffffff;
      star.x = container.x;
      star.y = container.y;
      star.origin = origin;
      // console.log('container: ',container)
      container.addChild(star);
      stars = [...stars, star];
      return container;
    }

    async function placeShipsAroundStar(origin, radius, w, h, numShips) {
      let container = createStar(radius, origin);
      container.position = new PIXI.Point(origin.x, origin.y);
      mainContainer.addChild(container);

      let increase = (Math.PI * 2) / numShips;
      for (let z = 0; z < stars.length; z++) {
        console.log(`separate stars loop, star ${z}`);
      }
      // work for tomorrow: create ships for each star as array in that star object
      // add animation loop as distinct function for each star-ships array
      for (let j = 0; j < numShips; j++) {
        let ship = new PIXI.Graphics();
        ship.lineStyle(1, 0x0fb0ff);
        ship.beginFill(0xaabbff);
        ship.drawCircle(0, 0, 5);
        ship.endFill();
        ship.tint = Math.random() * 0xffffff;
        ship.x = origin.x + radius * Math.cos(angle);
        ship.y = origin.y + radius * Math.sin(angle);
        mainContainer.addChild(ship);
        ships = [...ships, ship];
        angle += increase;
      }
      ships;
      makeShipCircle(radius, origin, ships, increase);
    }

    function makeShipCircle(radius, origin, ships, increase) {
      let ship;
      // await numShips;
      // let increase = (Math.PI * 2) / numShips;
      for (let i = 0; i < ships.length; i++) {
        ship = ships[i];
        // console.log(`inside of animate ships loop #${i}/${numShips}`);
        ship.x = origin.x + radius * Math.cos(angle);
        ship.y = origin.y + radius * Math.sin(angle);
        angle += increase + rotationSpeed;
      }
      setTimeout(() => {
        makeShipCircle(radius, origin, ships, increase);
      }, 16);
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
        // ship.x = Math.random() * app.renderer.screen.width;
        // ship.y = Math.random() * app.renderer.screen.height;
        ship.tint = Math.random() * 0xffffff;
        // ship.anchor.set(0.5);
        // ship.blendMode = PIXI.BLEND_MODES.MULTIPLY
        mainContainer.addChild(ship);
        // ships.push(ship);
        ships = [...ships, ship];
        makeShipCircle(ship, w, h, i);
      }
    }
    let i = 0,
      j = 0;
    function draw(el) {
      // requestAnimationFrame(draw(el));

      let x = w + Math.cos(j) * 100;
      let y = h + Math.sin(j) * 100;

      let xx = x + Math.cos(i + j) * 50;
      let yy = y + Math.sin(i + j) * 50;
      el.x = xx;
      el.y = yy;
      i += 0.08;
      j += 0.05;
    }

    // draw(shipC);

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
