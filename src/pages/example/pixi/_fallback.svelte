<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";

  onMount(() => {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }

    PIXI.utils.sayHello(type);
    let canvas = document.querySelector("#pixi");
    let app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight
    });

    // pixidiv.appendChild(app.view);
    app.renderer.backgroundColor = 0xe0f0ff;
    // app.renderer.view.style.position = "absolute";
    // app.renderer.view.style.display = "block";
    // app.renderer.autoResize = true;
    // app.renderer.resize(window.innerWidth, window.innerHeight);

    // PIXI.loader.add("images/anyImage.png").load(setup);
    const fav = PIXI.Texture.from("/favicon.png");
    const star = PIXI.Texture.from(
      "/Ic_star_outline_24px.svg.png"
    );

    const starSprite = new PIXI.Sprite(star);
    starSprite.x = 100; // app.renderer.width / 1.2;
    starSprite.y = 100; // app.renderer.height / 1.2;
    starSprite.anchor.x = 0.5;
    starSprite.anchor.y = 0.5;
    app.stage.addChild(starSprite);

    const favSprite = new PIXI.Sprite(fav);
    favSprite.x = app.renderer.width / 2;
    favSprite.y = app.renderer.height / 2;
    favSprite.anchor.x = 0.5;
    favSprite.anchor.y = 0.5;
    app.stage.addChild(favSprite);

    app.ticker.add(animate);
    function animate() {
      starSprite.rotation += 0.01;
      favSprite.rotation += 0.01;
    }

    // app.loader.add("bunny", "./favicon.png").load((loader, resources) => {
    //   // This creates a texture from a 'bunny.png' image
    //   const bunny = new PIXI.Sprite(resources.bunny.texture);
    //   console.log(`inside app.loader.add`);

    //   console.log(bunny);
    //   // Setup the position of the bunny
    //   bunny.x = app.renderer.width / 2;
    //   bunny.y = app.renderer.height / 2;

    //   // Rotate around the center
    //   bunny.anchor.x = 0.5;
    //   bunny.anchor.y = 0.5;

    //   bunny.position.x = 200;
    //   bunny.position.y = 150;

    //   // Add the bunny to the scene we are building
    //   app.stage.addChild(bunny);

    //   // Listen for frame updates
    //   app.ticker.add(() => {
    //     // each frame we spin the bunny around a bit
    //     bunny.rotation += 0.01;
    //   });
    // });

    // function setup() {
    //   //This code will run when the loader has finished loading the image
    //   let star = new PIXI.Sprite(
    //     PIXI.loader.resources["favicon.png"].texture
    //   );
    //   // ../../../static/Ic_star_outline_24px.svg
    //   app.stage.addChild(star);
    // }
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
