let heading = function() {

  let headingEngine = Engine.create({
    sceneEvents: [],
    render: {
      element: document.getElementById('title-canvas'),
      options: { width: 700, height: 200,
                 showPositions: true,
                 showCollisions: true,
                 background: '#cccccc',
                 wireframes: false}
    }
  });
  headingEngine.world.gravity.y = -1.5;

  let headingP = Body.create({
    name: "P",
    position: { x: 150, y: 50},
    vertices: JSON.parse(JSON.stringify(P)),
  });
  let headingH = Body.create({
    name: "H",
    position: { x: 200, y: 50},
    vertices: JSON.parse(JSON.stringify(H)),
  });
  let headingI = Body.create({
    name: "I",
    position: { x: 250, y: 50},
    vertices: JSON.parse(JSON.stringify(I)),
  });
  let headingS = Body.create({
    name: "S",
    position: { x: 500, y: 50},
    vertices: JSON.parse(JSON.stringify(S)),
  });
  let headingY = Body.create({
    name: "Y",
    position: { x: 550, y: 50},
    vertices: JSON.parse(JSON.stringify(Y)),
  });
  let headingX = Body.create({
    name: "X",
    position: { x: 600, y: 50},
    vertices: JSON.parse(JSON.stringify(X)),
  });

// let trash2 = Bodies.rectangle(550, 10, 10, 10, {name: "trash", render:  {
//   sprite: {
//     xScale: .05,
//     yScale: .05,
//     opacity: .5,
//     texture: './images/trash.png'
//   }
// }});

let ground = Bodies.rectangle(400, 200, 810, 10, { isStatic: true, render: {opacity: 0} });
let midshelf = Bodies.rectangle(310, 90, 620, 10, { name: "midshelf",isStatic: true, render: {opacity: .5} });
Body.rotate(midshelf, 3.05);
let midshelfBlock = Bodies.rectangle(620, 25, 10, 70, { name: "midselfBlock", isStatic: true, render: {opacity: .5} });
let headingSelector = Bodies.rectangle(660, 0, 100, 20, { name: "selector", isStatic: true, render: {opacity: .5} });

let ceiling = Bodies.rectangle(400, 0, 800, 5, { name: "ceiling", isStatic: true, render: {opacity: 0} });
let wallL = Bodies.rectangle(0, 100, 5, 200, { name: "wallL", isStatic: true, render: {opacity: 0} });
let wallR = Bodies.rectangle(700, 100, 5, 200, { name: "wallR", isStatic: true, render: {opacity: 0} });

let round1Bubble = Bodies.circle(700, 150, 25, {mass: 1, name: "bubble", round: 1, render: {sprite: {xScale: .14, yScale: .14, texture: './images/round1selector.png'}}});
let round2Bubble = Bodies.circle(630, 150, 25, {mass: 1, name: "bubble", round: 2, render: {sprite: {xScale: .17, yScale: .17, texture: './images/bubble.png'}}});
let round3Bubble = Bodies.circle(550, 150, 25, {mass: 1, name: "bubble", round: 3, render: {sprite: {xScale: .14, yScale: .14, texture: './images/round3selector.png'}}});
let round4Bubble = Bodies.circle(470, 150, 25, {mass: 1, name: "bubble", round: 4, render: {sprite: {xScale: .14, yScale: .14, texture: './images/round4selector.png'}}});


let headingMouse = MouseConstraint.create(headingEngine);
World.add(headingEngine.world, [ceiling, round1Bubble, round2Bubble, round3Bubble,
                                round4Bubble, wallL, wallR, ground,
                                midshelf, midshelfBlock, headingSelector,
                                headingP, headingH, headingI, headingS, headingY,
                                headingX, headingMouse]);      


Events.on(headingEngine, "collisionStart", (e) => {
  if (e.pairs[0].bodyA.name === "selector") {console.log(e.pairs[0].bodyA.name);}
  if (e.pairs[0].bodyA.name === "bubble") {console.log(e.pairs[0].bodyB.name);}
  if (e.pairs[0].bodyA.name === "selector" && e.pairs[0].bodyB.name === "bubble") {
    if (currentRound !== e.pairs[0].bodyB.round) {
      currentRound = e.pairs[0].bodyB.round
      Events.off(phisyxEngine);
      $(document).off("keypress");
      window.clearInterval(timeInterval);
      window.clearTimeout(startTimeout);
      // Events.off(dragMouse);
      World.clear(phisyxEngine.world, false);
      switch (e.pairs[0].bodyB.round) {
        case 1:
          round1();
          break;
        case 2:
          round2();
          break;
        case 3:
          round3();
          break;
        case 4:
          round4();
          break;
        default:
          break;
      }
    }
    // window.setTimeout(() => {
    //   Events.off(headingEngine, "collisionStart");
    //   World.clear(headingEngine.world, false);
    //   Engine.clear(headingEngine);
    //   roundEnd = false;
    //     round2();
    // }, 3000);
  }
});

Engine.run(headingEngine);
Render.run(headingEngine.render);
};
