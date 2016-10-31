let round1Bubble;
let round2Bubble;
let round3Bubble;
let round4Bubble;
let headingEngine;
let instructionsTimeout;

let heading = function() {

  headingEngine = Engine.create({
    sceneEvents: [],
    render: {
      element: document.getElementById('title-canvas'),
      options: { width: 700, height: 200,
                 showPositions: false,
                 showCollisions: false,
                 background: './images/headerbackground.png',
                 wireframes: false}
    }
  });
  headingEngine.world.gravity.y = -1.5;

  let headingP = Body.create({
    name: "P",
    position: { x: 300, y: 50},
    vertices: JSON.parse(JSON.stringify(P)),
    render: {
      sprite: {
        xScale: 1,
        yScale: 1,
        texture: './images/cloudp.png'
      }
    }
  });
  let headingH = Body.create({
    name: "H",
    position: { x: 340, y: 50},
    vertices: JSON.parse(JSON.stringify(H)),
    render: {
      sprite: {
        xScale: 1,
        yScale: 1,
        texture: './images/cloudh.png'
      }
    }
  });
  let headingI = Body.create({
    name: "I",
    position: { x: 380, y: 50},
    vertices: JSON.parse(JSON.stringify(I)),
    render: {
      sprite: {
        xScale: 1,
        yScale: 1,
        texture: './images/cloudi.png'
      }
    }
  });
  let headingS = Body.create({
    name: "S",
    position: { x: 470, y: 50},
    vertices: JSON.parse(JSON.stringify(S)),
    render: {
      sprite: {
        xScale: 1,
        yScale: 1,
        texture: './images/clouds.png'
      }
    }
  });
  let headingY = Body.create({
    name: "Y",
    position: { x: 520, y: 50},
    vertices: JSON.parse(JSON.stringify(Y)),
    render: {
      sprite: {
        xScale: .8,
        yScale: .8,
        texture: './images/cloudy.png'
      }
    }
  });
  let headingX = Body.create({
    name: "X",
    position: { x: 560, y: 50},
    vertices: JSON.parse(JSON.stringify(X)),
    render: {
      sprite: {
        xScale: .7,
        yScale: .7,
        texture: './images/cloudx.png'
      }
    }
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
let midshelf = Bodies.rectangle(310, 90, 620, 10, { name: "midshelf",isStatic: true, render: {opacity: .0} });
Body.rotate(midshelf, 3.05);
let midshelfBlock = Bodies.rectangle(620, 25, 10, 70, { name: "midselfBlock", isStatic: true, render: {opacity: 0} });
let headingSelector = Bodies.rectangle(660, 7, 100, 20, { name: "selector", isStatic: true, render: {opacity: 0} });
let ceiling = Bodies.rectangle(400, 0, 800, 5, { name: "ceiling", isStatic: true, render: {opacity: 0} });
let wallL = Bodies.rectangle(0, 100, 5, 200, { name: "wallL", isStatic: true, render: {opacity: 0} });
let wallR = Bodies.rectangle(700, 100, 5, 200, { name: "wallR", isStatic: true, render: {opacity: 0} });
let selectorRailR = Bodies.rectangle(693, 15, 10, 30, { name: "railR", isStatic: true, render: {opacity: 0} });
let selectorRailL = Bodies.rectangle(625, 15, 10, 30, { name: "railL", isStatic: true, render: {opacity: 0} });
let gifPlaceholder = Bodies.rectangle(117, 100, 165, 102, { name: "railL", isStatic: true, render: {opacity: 0 } });
round1Bubble = Bodies.circle(700, 150, 25, {mass: 2, name: "bubble", round: 1, render: {sprite: {xScale: .14, yScale: .14, texture: './images/round1selector.png'}}});
round2Bubble = Bodies.circle(630, 150, 25, {mass: 2, name: "bubble", round: 2, render: {sprite: {xScale: .14, yScale: .14, texture: './images/round2selector.png'}}});
round3Bubble = Bodies.circle(550, 150, 25, {mass: 2, name: "bubble", round: 3, render: {sprite: {xScale: .14, yScale: .14, texture: './images/round3selector.png'}}});
round4Bubble = Bodies.circle(470, 150, 25, {mass: 2, name: "bubble", round: 4, render: {sprite: {xScale: .14, yScale: .14, texture: './images/round4selector.png'}}});



let headingMouse = MouseConstraint.create(headingEngine);
headingMouse.constraint.render.visible = false;
World.add(headingEngine.world, [ceiling, round1Bubble, round2Bubble, round3Bubble,
                                round4Bubble, wallL, wallR, ground, gifPlaceholder,
                                midshelf, midshelfBlock, headingSelector,
                                headingP, headingH, headingI, headingS, headingY,
                                headingX, headingMouse, selectorRailL, selectorRailR]);      


Events.on(headingEngine, "collisionStart", (e) => {
  if (e.pairs[0].bodyA.name === "selector" && e.pairs[0].bodyB.name === "bubble") {
    if (currentRound !== e.pairs[0].bodyB.round) {
      currentRound = e.pairs[0].bodyB.round
      Events.off(phisyxEngine);
      $(document).off("keypress");
      window.clearInterval(timeInterval);
      window.clearTimeout(startTimeout);
      window.clearTimeout(instructionsTimeout);
      window.clearTimeout(headerInstructionsTimeout);
      $('.instructions').css({"padding-top":"100px"});
      $('.instructions2').text(``);
      $('.score').text(``);
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
