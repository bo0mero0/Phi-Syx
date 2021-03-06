let phisyxEngine = Engine.create({
  sceneEvents: [],
  render: {
    element: document.getElementById('canvas'),
    options: { width: 800, height: 500,
               showPositions: false,
               showCollisions: false,
               wireframes: false}
  }
});
let currentRound = 1;
let dragMouse;

heading();
round1();
$('.instruction-gif-img').attr("src", "./images/header.gif");
headerInstructionsTimeout = window.setTimeout(() => {
  $('.instruction-gif-img').attr("src", "./images/round1.gif");
}, 5000);

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
