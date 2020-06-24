<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import { circular } from "./circular.js";
  //  using video tutorial at https://www.youtube.com/watch?v=2J0VUiozAVM&list=PL08jItIqOb2oGcyrgREbrm_b9OW7TE1ji&index=3
  let ships = [],
    stars = [],
    // radialInterval,
    // numShips,
    globalCount = 0,
    rotationSpeed = 0.0001;
  // $: {
  //   numShips = ships.length || 30;
  //   console.log(`numShips reactive update ${numShips}`);
  // }
  // $: {
  //   radialInterval = 360 / numShips;
  //   console.log(`radialInterval ${radialInterval}`);
  // }
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

    createStarAndShips(origin, radius, 20);
    radius = 75;
    origin = { x: w - radius * 2, y: h + radius * 2 };
    createStarAndShips(origin, radius, 12);
    radius = 35;
    origin = { x: w + radius * 2, y: h - radius * 2 };
    createStarAndShips(origin, radius, 7);

    function createStarAndShips(origin, radius, numShips) {
      let container = createStar(radius, origin);
      addShipsToStar1(container, numShips);
    }

    function createStar(radius, origin) {
      let container = new PIXI.Container();
      let star = new PIXI.Graphics();
      let numStars = stars.length;
      container.id = numStars;
      console.log(
        `number of stars: ${numStars}, star.id ${star.id}, container.id ${container.id}`
      );
      star.position = new PIXI.Point(0.5, 0.5);
      star.id = numStars;
      star.origin = origin;
      star.radius = radius;
      star.lineStyle(1, 0x0fb0ff);
      star.beginFill(Math.random() * 0xffffff);
      star.drawCircle(0, 0, radius - 15);
      star.endFill();
      star.tint = 0xffffff;
      star.x = container.x;
      star.y = container.y;

      // console.log('container: ',container)
      container.addChild(star);
      stars = [...stars, star];
      return container;
    }

    async function addShipsToStar1(container, numShips) {
      container.position = new PIXI.Point(origin.x, origin.y);
      mainContainer.addChild(container);
      let increase = (Math.PI * 2) / numShips;
      let id = container.id;
      console.log(`addShipsToStar1 container.id ${container.id}`);
      let star = stars[id];
      ships = [];
      star.numShips = numShips;
      for (let i = 0; i < numShips; i++) {
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
      star.ships = ships;
    }

    function makeShipsCircle() {
      let ship, star;

      for (let z = 0; z < stars.length; z++) {
        star = stars[z];
        origin = star.origin;
        radius = star.radius;
        // console.log(
        //   `makeShipsCircle() stars loop - star id ${star.id}, ships array length ${star.ships.length}, numShips value ${star.numShips}`
        // );
        // console.log(
        //   `makeShipsCircle() stars loop - star x ${star.x}, y ${star.y}, radius ${star.radius} `
        // );
        //         console.log(
        //   `makeShipsCircle() stars loop - star ORIGIN x ${star.origin.x}, y ${star.origin.y}, radius ${star.radius} `
        // );
        let increase = (Math.PI * 2) / star.numShips;
        for (let i = 0; i < star.numShips; i++) {
          // console.log("star.ships.length: ", star.ships.length);
          // console.log("star.numShips: ", star.numShips);
          ship = star.ships[i];
          // console.log(`This ship x and y: ${ship.x}, ${ship.y}`);
          ship.x = star.origin.x + star.radius * Math.cos(angle);
          ship.y = star.origin.y + star.radius * Math.sin(angle);
          angle += increase + rotationSpeed;
        }
      }
    }
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function animate() {
      globalCount++;
      console.log(`GLOBAL COUNT ${globalCount} `);
      makeShipsCircle();
      // requestAnimationFrame(animate)
      // for (let z = 0; z < stars.length; z++) {
      //   let star = stars[z]
      //   console.log(`GLOBAL COUNT ${globalCount} animate function, star ${z}, id ${star.id}, ships ${star.ships.length} numShips ${star.numShips}`);
      //   makeShipsCircle(star)
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
