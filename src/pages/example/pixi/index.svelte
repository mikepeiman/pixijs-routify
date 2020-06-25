<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  import { circular } from "./circular.js";
  import { PoissonDiskSampler } from "./poisson-disk";
  import Proton from "proton-engine";
  // import { Engine, Sink, Drag } from "heegs";
  //  using video tutorial at https://www.youtube.com/watch?v=2J0VUiozAVM&list=PL08jItIqOb2oGcyrgREbrm_b9OW7TE1ji&index=3
  let ships = [],
    stars = [],
    starSystems = [],
    globalCount = 0,
    starBuffer = 40,
    orbitBuffer = 6,
    shipSize = 2,
    rotationSpeed = 0.00001;

  onMount(() => {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }
    // const heegs = new Engine(numberOfParticles);
    let canvas = document.querySelector("#pixi");
    let app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight
    });
    app.renderer.backgroundColor = 0x00060f;
    let mainContainer = new PIXI.Container();
    let rw = app.renderer.width;
    let rh = app.renderer.height;
    mainContainer.position = new PIXI.Point(0, 0);
    // mainContainer.width = rw - 150;
    // mainContainer.height = rh - 150;
    app.stage.addChild(mainContainer);
    let delta = 0;
    let mainContainerBuffer = 75;
    let _w = window.innerWidth;
    let _h = window.innerHeight;
    let w = _w / 2;
    let h = _h / 2;
    let main_w = _w - 150;
    let main_h = _h - 150;
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

    // look for a js snippet or library that can generate a non-overlapping coordinate system
    //  https://github.com/jeffrey-hearn/poisson-disk-sample/blob/master/demo.js

    function seedRandomUniverse(
      numStars,
      radiusMin,
      radiusMax,
      starBuffer,
      shipsMin,
      shipsMax
    ) {
      let sampler = new PoissonDiskSampler(
        _w - mainContainerBuffer * 2,
        _h - mainContainerBuffer * 2,
        radiusMax + starBuffer,
        5
      );
      let solution = sampler.sampleUntilSolution();
      let galaxy = getRandom(solution, numStars);
      galaxy.forEach((point, i) => {
        let radius =
          radiusMin + Math.floor(Math.random() * (radiusMax - radiusMin));
        let numShips =
          shipsMin + Math.floor(Math.random() * (shipsMax - shipsMin));
        console.log(
          `galaxy.forEach i: ${i} point {x: ${point.x}, y: ${point.y}}=> radius ${radius}, # of ships ${numShips}`
        );
        point.x = point.x + mainContainerBuffer;
        point.y = point.y + mainContainerBuffer;
        point.i = i
        createStarAndShips(point, radius, numShips, starBuffer);
      });
    }

    seedRandomUniverse(10, 10, 30, starBuffer, 30, 120);

    function getCircumference(radius) {
      let c = radius * Math.PI * 2;
      return c;
    }

    function createStarAndShips(point, radius, numShips, starBuffer) {
      let container = createStar(radius, point, starBuffer);
      // container.position = new PIXI.Point(point.x, point.y);
      // container.x = point.x;
      // container.y = point.y
      addShipsToStar(container, point, numShips, starBuffer);
    }

    function createStar(radius, point) {
      let container = new PIXI.Container();
      mainContainer.addChild(container);
      let star = new PIXI.Graphics();
      container.addChild(star);
      let numStars = stars.length;
      container.id = numStars;
      let c = getCircumference(radius + orbitBuffer);
      star.starBuffer = starBuffer;
      star.orbitBuffer = orbitBuffer;
      star.orbitCirc = c;
      star.origin = point;
      star.radius = radius;
      // star.lineStyle(1, 0x0fb0ff);
      star.beginFill(Math.random() * 0xffffff);
      star.drawCircle(0, 0, radius);
      star.endFill();
      star.tint = 0xffffff;
      star.x = point.x;
      star.y = point.y;
      star.id = point.i
      star.position = new PIXI.Point(point.x, point.y);
      console.log(
        `createStar(radius, point): star.id ${star.id}, circumference ${c}`
      );
            console.log(
        `createStar(radius, point): 30 ships @ 2px each with equal spacing: ${30*2*2}`
      );
      // console.log("container.x: ", container.x);
      // console.log("container.y: ", container.y);
      // console.log("container.position: ", container.position);
      // console.log("star.x: ", star.x);
      // console.log("star.y: ", star.y);
      // console.log("star.position: ", star.position);

      // console.log("container with star: ", container);
      stars = [...stars, star];
      return container;
    }

    function addShipsToStar(container, origin, numShips, starBuffer) {
      mainContainer.addChild(container);

      let increase = (Math.PI * 2) / numShips;
      let id = container.id;
      let star = stars[id];
      ships = [];
      star.numShips = numShips;
            // we need to determine number of ships in one complete orbit to determine angle and radius increment
      
      let numShipsInOneOrbit = star.orbitCirc / (shipSize * 3)
      let outwardSpiralIncrease =  (shipSize * 3) / numShipsInOneOrbit
      let spiral = 0
      let newIncrease = Math.PI * 2 / numShipsInOneOrbit
      console.log(`addShipsToStar, numShipsInOneOrbit star radius ${star.radius}: ${numShipsInOneOrbit}`);
      for (let i = 0; i < numShips; i++) {
        let ship = new PIXI.Graphics();
        // ship.lineStyle(1, 0x0fb0ff);
        ship.beginFill(0xaabbff);
        ship.drawCircle(0, 0, shipSize);
        ship.endFill();
        ship.tint = 0xffffff;
        ship.x = origin.x + (star.radius + orbitBuffer + spiral) * Math.cos(angle);
        ship.y = origin.y +  (star.radius + orbitBuffer + spiral) * Math.sin(angle);
        container.addChild(ship);
        ships = [...ships, ship];
        angle += newIncrease;
        spiral += outwardSpiralIncrease
        
      }
      star.ships = ships;
    }

    function makeShipsCircle() {
      let ship, star;
      for (let z = 0; z < stars.length; z++) {
        star = stars[z];
        origin = star.origin;
        radius = star.radius;
        let increase = (Math.PI * 2) / star.ships.length;
        for (let i = 0; i < star.numShips; i++) {
          // console.log("star.ships.length: ", star.ships.length);
          // console.log("star.numShips: ", star.numShips);
          ship = star.ships[i];
          // console.log(`This ship x and y: ${ship.x}, ${ship.y}`);
          ship.x =
            star.origin.x + (star.orbitBuffer + star.radius) * Math.cos(angle);
          ship.y =
            star.origin.y + (star.orbitBuffer + star.radius) * Math.sin(angle);
          angle += increase + rotationSpeed;
        }
      }
    }
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function animate() {
      globalCount++;
      // console.log(`GLOBAL COUNT ${globalCount} `);
      // makeShipsCircle();
      // requestAnimationFrame(animate)
      // for (let z = 0; z < stars.length; z++) {
      //   let star = stars[z]
      //   console.log(`GLOBAL COUNT ${globalCount} animate function, star ${z}, id ${star.id}, ships ${star.ships.length} numShips ${star.numShips}`);
      //   makeShipsCircle(star)
      // }
      // app.renderer.render(app.stage)
    }
  });

  // get n number of random elements from array:
  // great solution here: https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
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
