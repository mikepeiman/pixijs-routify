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

    // let loader = new PIXI.Loader();
    let loader = PIXI.Loader.shared;
    loader.add("/favicon.png");
    loader.add("/Ic_star_outline_24px.svg.png");
    loader.onComplete.add(handleLoadAssetComplete);
    loader.onLoad.add(handleLoadAsset); // fired every time an individual asset completes loading
    loader.onError.add(handleLoadAssetError); // fired whenever there is an error loading an asset
    loader.onProgress.add(handleLoadAssetProgress); // progress updates on the status of our loader

    function handleLoadAssetProgress(loader, resource) {
      console.log(loader.progress + "% loaded");
    }

    function handleLoadAsset() {
      console.log("asset loaded");
    }

    function handleLoadAssetError() {
      console.log("load error");
    }

    let tex1;
    function handleLoadAssetComplete() {
      let texture = loader.resources["/favicon.png"].texture;
      tex1 = new PIXI.Sprite(texture);
      tex1.anchor.x = 0.15;
      tex1.anchor.y = 0.85;
      app.stage.addChild(tex1);
      app.ticker.add(animate);
    }

    loader.load();

    let _w = window.innerWidth;
    let _h = window.innerHeight;

    const renderer = new PIXI.Renderer({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight
      // resolution: window.devicePixelRatio,
      // autoDensity: true
    });

    window.addEventListener("resize", resize);
    function resize() {
      _w = window.innerWidth;
      _h = window.innerHeight;

      renderer.resize(_w, _h);
    }

    // const stage = new PIXI.Container();
    let starsGroup = new PIXI.Container();
    app.stage.addChild(starsGroup);

    // pixidiv.appendChild(app.view);
    renderer.backgroundColor = 0xe0f0ff;

    let xdot = new PIXI.Graphics();
    let xstar = new PIXI.Graphics();

    xstar.x = renderer.width / 3;
    xstar.y = renderer.height / 3;
    app.stage.addChild(xstar);

    const fav = PIXI.Texture.from("/favicon.png");
    const star = PIXI.Texture.from("/Ic_star_outline_24px.svg.png");
    // star.width = 300
    // star.height = 300

    const starSprite1 = new PIXI.Sprite(star);
    starSprite1.width = 50;
    starSprite1.height = 50;
    starSprite1.tint = 0xccbbaa;
    starSprite1.position.set(0.25, 0.75);
    starsGroup.addChild(starSprite1);
    // stage.addChild(starSprite1)
    const starSprite2 = new PIXI.Sprite(star);
    starSprite2.width = 35;
    starSprite2.height = 35;
    starSprite2.tint = 0xaabbcc;
    starSprite2.anchor.x = 0.5;
    starSprite2.anchor.y = 0.5;
    starsGroup.addChild(starSprite2);
    const starSprite3 = new PIXI.Sprite(star);
    starSprite3.width = 65;
    starSprite3.height = 65;
    starSprite3.tint = 0x00ccff;
    starSprite3.anchor.x = 0.975;
    starSprite3.anchor.y = 0.975;
    starsGroup.addChild(starSprite3);

    const favSprite = new PIXI.Sprite(fav);

    favSprite.anchor.x = 0.5;
    favSprite.anchor.y = 0.5;
    app.stage.addChild(favSprite);

    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.speed = 0.01;
    ticker.start();

    let delta = 0;
    function animate() {
      delta += 1;

      starsGroup.x = renderer.screen.width / 1.7;
      starsGroup.y = renderer.screen.height / 1.7;

      // starSprite.x = renderer.screen.width / 1.2;
      // starSprite.y = renderer.screen.height / 1.2;

      favSprite.x = renderer.screen.width / 2.2;
      favSprite.y = renderer.screen.height / 2.2;

      starsGroup.rotation += 0.01;

      // starSprite1.x = 50 + Math.sin(delta) * 1
      // starSprite1.y = 10 + Math.sin(delta) * 1
      // starSprite2.alpha = Math.sin(delta)
      // starSprite.rotation += 0.01;
      favSprite.rotation -= 0.01;
      app.renderer.render(app.stage);
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
