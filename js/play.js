let phisyxEngine = Engine.create({
  sceneEvents: [],
  render: {
    element: document.getElementById('canvas'),
    options: { width: 800, height: 500,
               showPositions: true,
               showCollisions: true,
               wireframes: false}
  }
});
let currentRound = 1;
let dragMouse;

heading();
round1();

let rounds = {
  1: round1,
  2: round2,
  3: round3,
  4: round4
}

$(".reset").click(() => {
  Events.off(phisyxEngine);
  $(document).off("keypress");
  window.clearInterval(timeInterval);
  window.clearTimeout(startTimeout);
  World.clear(phisyxEngine.world, false);
  rounds[currentRound]();
})

Engine.run(phisyxEngine);
Render.run(phisyxEngine.render);
