let heading = function() {

  let headingEngine = Engine.create({
    sceneEvents: [],
    render: {
      element: document.getElementById('title-canvas'),
      options: { width: 800, height: 200,
                 showPositions: true,
                 showCollisions: true,
                 background: '#cccccc',
                 wireframes: false}
    }
  });

  let h = Body.create({
    name: "H",
    position: { x: 1400, y: 200},
    vertices: JSON.parse(JSON.stringify(H)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });

let goal = Bodies.rectangle(710, 400, 70, 10, { name: "goal", render: {opacity: .5}, isStatic: true });

let trash = Bodies.rectangle(550, 10, 10, 10, {name: "trash", render:  {
  sprite: {
    xScale: .05,
    yScale: .05,
    opacity: .5,
    texture: './images/trash.png'
  }
}});

let ground = Bodies.rectangle(400, 200, 810, 10, { isStatic: true, render: {opacity: 0} });
let ceiling = Bodies.rectangle(400, 0, 800, 5, { isStatic: true, render: {opacity: 0} });
let wallL = Bodies.rectangle(0, 100, 5, 200, { isStatic: true, render: {opacity: 0} });
let wallR = Bodies.rectangle(800, 100, 5, 200, { isStatic: true, render: {opacity: 0} });
let trapezoid = Bodies.trapezoid(100, 100, 100, 100, 3);

let headingMouse = MouseConstraint.create(headingEngine);
World.add(headingEngine.world, [ceiling, wallL, wallR, ground, trash,  headingMouse]);      



Events.on(headingEngine, "collisionStart", (e) => {
  if (roundEnd === false && e.pairs[0].bodyA.name === "bubble" && e.pairs[0].bodyB.name === "goal") {
    roundEnd = true;
    console.log("collision");
    let w = Body.create({
      position: { x: 200, y: 100},
      vertices: JSON.parse(JSON.stringify(W)),
      mass: 0.0017
    });
    let i = Body.create({
      position: { x: 400, y: 100},
      vertices: JSON.parse(JSON.stringify(I)),
      mass: 0.0017
    });
    let n = Body.create({
      position: { x: 600, y: 100},
      vertices: JSON.parse(JSON.stringify(N)),
      mass: 0.0017
    });
    World.add(headingEngine.world, [w, i, n]);
    window.setTimeout(() => {
      Events.off(headingEngine, "collisionStart");
      Events.off(dragMouse, "mousedown");
      Events.off(dragMouse, "mouseup");
      World.clear(headingEngine.world, false);
      Engine.clear(headingEngine);
      roundEnd = false;
        round2();
    }, 3000);
  }
});

Engine.run(headingEngine);
Render.run(headingEngine.render);
};
