<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";
  //  using video tutorial at https://www.youtube.com/watch?v=2J0VUiozAVM&list=PL08jItIqOb2oGcyrgREbrm_b9OW7TE1ji&index=3

  onMount(() => {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }

    PIXI.utils.sayHello(type);
    let canvas = document.querySelector("#pixi");

    // let app = new PIXI.Application({
    //   view: canvas,
    //   width: window.innerWidth,
    //   height: window.innerHeight
    // });

    let _w = window.innerWidth;
    let _h = window.innerHeight;

    const renderer = new PIXI.Renderer({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight
      resolution: window.devicePixelRatio,
      autoDensity: true
    });

    window.addEventListener("resize", resize);
    function resize() {
      _w = window.innerWidth;
      _h = window.innerHeight;

      renderer.resize(_w, _h);
    }

    const stage = new PIXI.Container();

    // pixidiv.appendChild(app.view);
    renderer.backgroundColor = 0xe0f0ff;

    const fav = PIXI.Texture.from("/favicon.png");
    const star = PIXI.Texture.from("/Ic_star_outline_24px.svg.png");

    const starSprite = new PIXI.Sprite(star);
    starSprite.width = 50;
    starSprite.height = 50;
    starSprite.anchor.x = 0.5;
    starSprite.anchor.y = 0.5;
    stage.addChild(starSprite);

    const favSprite = new PIXI.Sprite(fav);

    favSprite.anchor.x = 0.5;
    favSprite.anchor.y = 0.5;
    stage.addChild(favSprite);

    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();

    function animate() {
      starSprite.x = renderer.screen.width / 1.2;
      starSprite.y = renderer.screen.height / 1.2;

      favSprite.x = renderer.screen.width / 2.2;
      favSprite.y = renderer.screen.height / 2.2;

      starSprite.rotation += 0.01;
      favSprite.rotation -= 0.01;
      renderer.render(stage);
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
