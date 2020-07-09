<script>
  import { onMount } from "svelte";
  import Stats from "stats.js";
  import Proton from "proton-engine";
  import RAFManager from "raf-manager";

  let stats;
  let canvas;
  let context;
  let proton;
  let renderer;
  let emitter;

  onMount(() => {
    main();

    function main() {
      initCanvas();
      initStats();
      createProton();
      render();
    }

    function initCanvas() {
      canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context = canvas.getContext("2d");

      window.onresize = function(e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        emitter.p.x = canvas.width / 2;
        emitter.p.y = canvas.height / 2;
      };
    }

    function initStats() {
      stats = new Stats();
      stats.setMode(2);
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "0px";
      stats.domElement.style.top = "0px";
      document.body.appendChild(stats.domElement);
    }

    function createProton() {
      proton = new Proton();
      emitter = new Proton.Emitter();
      let vector = new Proton.Vector2D(canvas.width / 2, canvas.height / 2);
      emitter.rate = new Proton.Rate(
        new Proton.Span(1, 2),
        new Proton.Span(0.1)
      );
      emitter.addInitialize(new Proton.Mass(10));
      emitter.addInitialize(new Proton.Radius(1, 2));
      emitter.addInitialize(new Proton.Life(20, 4));
      emitter.addInitialize(
        new Proton.Velocity(
          new Proton.Span(1, 2),
          new Proton.Span(12, 15),
          "polar"
        )
      );
      emitter.addBehaviour(new Proton.RandomDrift(0.1, 0.1, 0.01)); // 30, 30, 0.05
      emitter.addBehaviour(
        new Proton.Color("0f00ff", "random", Infinity, Proton.easeOutQuart)
      );
      emitter.addBehaviour(new Proton.Scale(1, 0.7));
      // emitter.addBehaviour(new Proton.Gravity(10, Infinity));
      // emitter.addBehaviour(new Proton.Attraction(vector, 10, 500, Infinity));
      // emitter.addBehaviour(
      //   new Proton.Force(
      //     canvas.width / 2 + 50 * Math.cos(emitter.rotation),
      //     canvas.height / 2 + 50 * Math.sin(emitter.rotation)
      //   )
      // );
      emitter.p.x = canvas.width / 2;
      emitter.p.y = canvas.height / 2;
      emitter.emit();

      proton.addEmitter(emitter);
      renderer = new Proton.CanvasRenderer(canvas);
      renderer.onProtonUpdate = () => {
        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
      };
      proton.addRenderer(renderer);
    }

    function render() {
      RAFManager.add(() => {
        stats.begin();
        emitter.rotation += 1.5;
        proton.update();
        stats.end();
      });
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
  #canvas {
    max-width: 100%;
    max-height: 70vh;
    min-width: 70vw;
    left: 15vw;
  }
</style>

<div style="text-align: center">
  <h1>Proton Engine playground</h1>
  <canvas id="canvas" />
</div>
