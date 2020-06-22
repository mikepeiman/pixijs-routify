<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
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

    PIXI.utils.sayHello(type);
    console.log(PIXI.utils.TextureCache);
    PIXI.utils.sayHello(PIXI.utils.TextureCache);
    let loader = PIXI.Loader.shared;
    loader
      .add("fav", "/favicon.png")
      .add("star", "/Ic_star_outline_24px.svg.png");

    // this is the method given by docs http://pixijs.download/release/docs/PIXI.Loader.html
    loader.onLoad.add(handleLoadAsset); // fired every time an individual asset completes loading
    loader.onError.add(handleLoadAssetError); // fired whenever there is an error loading an asset
    loader.onProgress.add(handleLoadAssetProgress); // progress updates on the status of our loader
    loader.load(handleLoadAssetComplete);
    function handleLoadAssetProgress(loader, resource) {
      console.log(loader.progress + "% loaded");
    }

    function handleLoadAsset(loader, resource) {
      console.log("asset loaded: " + resource.name);
    }

    function handleLoadAssetError(loader, resource) {
      console.log("load error");
    }

    let texMask = new PIXI.Graphics();
    texMask.beginFill(0xff00ff);
    texMask.drawRect(0, 0, 1000, 1000);
    texMask.endFill();

    let delta = 0;

    let tex1 = new PIXI.Texture.from("/Ic_star_outline_24px.svg.png");
    let tex2 = new PIXI.Texture.from("/favicon.png");

    function handleLoadAssetComplete() {
      let fav = loader.resources.fav.texture;
      let star = loader.resources.star.texture;
      let sprite1 = new PIXI.Sprite(fav);
      let sprite2 = new PIXI.Sprite(star);
      sprite1.anchor.set(0.5);
      sprite1.position.set(
        app.renderer.screen.width / 2,
        app.renderer.screen.height / 2
      );

      sprite1.tint = 0xaa00ff;
      app.stage.addChild(sprite1);
      app.ticker.add(animate);
      // replaceTex(1500);
    }

    function replaceTex(duration) {
      setTimeout(() => {
        delta += 1;
        sprite1.texture = loader.resources.star.texture;
        sprite1.scale = new PIXI.Point(0.1, 0.1);
        sprite1.rotation -= 0.01;
        sprite1.y = 10 + Math.sin(delta) * 1;
        sprite1.mask = texMask;
        app.ticker.add(animate2);
      }, duration);
    }

    let _w = window.innerWidth;
    let _h = window.innerHeight;

    window.addEventListener("resize", resize);
    function resize() {
      _w = window.innerWidth;
      _h = window.innerHeight;
      app.renderer.resize(_w, _h);
    }

    let starsGroup = new PIXI.Container();
    app.stage.addChild(starsGroup);

    app.renderer.backgroundColor = 0xe0f0ff;

    let xdot = new PIXI.Graphics();
    let xstar = new PIXI.Graphics();

    xstar.x = app.renderer.width / 3;
    xstar.y = app.renderer.height / 3;
    app.stage.addChild(xstar);

    app.ticker.speed = 0.01;
    app.ticker.start();

    // let delta = 0;
    function animate() {
      let fav = loader.resources.fav.texture;
      let star = loader.resources.star.texture;
      let sprite1 = new PIXI.Sprite(fav);
      let sprite2 = new PIXI.Sprite(star);
      delta += 0.1;
      sprite1.x = app.renderer.screen.width / 2;
      sprite1.y = app.renderer.screen.height / 2;
      sprite1.rotation += 0.01;
      app.renderer.render(app.stage);
      sprite1.interactive = true;
      sprite1.buttonMode = true;

      for(let i = 0; i < ships.length; i++){
        ships[i].rotation += Math.random() * 0.05
      }
    }
    function animate2() {
      delta += 0.1;
      sprite1.rotation -= 0.01;
      app.renderer.render(app.stage);
    }

    let ships = [];
    let container = new PIXI.Container();
    app.stage.addChild(container);

    for (let i = 0; i < 50; i++) {
      // let star = loader.resources.star.texture;
      let ship = new PIXI.Sprite(tex2);
      let rand = Math.random()
      ship.scale = new PIXI.Point(rand,rand)
      ship.x = Math.random() * app.renderer.screen.width;
      ship.y = Math.random() * app.renderer.screen.height;
      ship.tint = Math.random() * 0xffffff;
      ship.anchor.set(0.5);
      // ship.blendMode = PIXI.BLEND_MODES.MULTIPLY
      container.addChild(ship);
      ships.push(ship);
    }

    function animate3() {}
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
