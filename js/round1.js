let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let MouseConstraint = Matter.MouseConstraint;
let Mouse = Matter.Mouse;
let Bodies = Matter.Bodies;
let Bounds = Matter.Bounds;
let Body = Matter.Body;
let Vector = Matter.Vector;
let Constraint = Matter.Constraint;
let Composite = Matter.Composite;
let Composites = Matter.Composites;
let Events = Matter.Events;
let roundEnd = false;


let round1 = function() {

$('.instructions').text(`Get the paperball inside the trash by moving OTHER objects`);
instructionsTimeout = window.setTimeout(() => {
  $('.instructions').text(``);
}, 5000);
$('.instruction-gif-img').attr("src", "./images/round1.gif");

dragMouse = MouseConstraint.create(phisyxEngine);
dragMouse.constraint.render.visible = false;
phisyxEngine.render.bounds.max = {x: 800, y: 500};
phisyxEngine.render.bounds.min = {x: 0, y: 0};
phisyxEngine.render.options.background= './images/syx_Background.png';
dragMouse.collisionFilter.category = 0x0004

let bubble = Bodies.circle(200, 200, 30, {mass: 1,name: "bubble", collisionFilter: {mask: 0x0001}, render:  {sprite: {xScale: .25, yScale: .25, texture: './images/paper_ball.png'}}});
let basketball = Bodies.circle(170, 200, 30, {mass: 1,name: "basketball", collisionFilter: {mask: 0x0001 | 0x0004}, render:  {sprite: {xScale: .05, yScale: .05, texture: './images/basketball.png'}}})
let goal = Bodies.rectangle(710, 400, 70, 10, { name: "goal", collisionFilter: {mask: 0x0001 | 0x0004}, render: {opacity: .5}, isStatic: true });
let trashWall = Bodies.rectangle(675, 410, 2, 110, { name: "trashWall", collisionFilter: {mask: 0x0001 | 0x0004}, render: {opacity: 1}, isStatic: true });
Body.rotate(trashWall, 3);
let trash = Bodies.rectangle(710, 410, 10, 10, {name: "trash", isStatic: true, render:  {
  sprite: {
    xScale: .05,
    yScale: .05,
    opacity: .5,
    texture: './images/trash.png'
  }
}});

let boxB = Bodies.rectangle(450, 50, 80, 80, {
  collisionFilter: {mask: 0x0001 | 0x0004},
  render: {
    sprite: {
      xScale: .162,
      yScale: .162,
      opacity: .5,
      texture: './images/letterpblock.png'
    }
  }
});
let boxC = Bodies.rectangle(300, 50, 180, 60, {collisionFilter: {mask: 0x0001 | 0x0004}, render:  {sprite: {xScale: .05, yScale: .05, texture: './images/questionblock.png'}}});
let ground = Bodies.rectangle(400, 470, 810, 10, { isStatic: true, render: {opacity: 0} });
let ceiling = Bodies.rectangle(400, 25, 800, 5, { isStatic: true, render: {opacity: 0} });
let wallL = Bodies.rectangle(30, 300, 5, 600, { isStatic: true, render: {opacity: 0} });
let wallR = Bodies.rectangle(767, 300, 5, 600, { isStatic: true, render: {opacity: 0} });
let trapezoid = Bodies.trapezoid(100, 100, 90, 90, 1, {mass: 1,name: "triangle", collisionFilter: {mask: 0x0001 | 0x0004}, render:  {sprite: {xScale: .11, yScale: .11, texture: './images/triangle.png'}}});

World.add(phisyxEngine.world, [trashWall, goal, boxC, ceiling, wallL, wallR, trapezoid, bubble, basketball, boxB, ground, trash, dragMouse]);


Events.on(phisyxEngine, "collisionStart", (e) => {
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
    World.add(phisyxEngine.world, [w, i, n]);

    window.setTimeout(() => {
      Body.setPosition(round1Bubble, { x: 400, y: 150 });
    }, 3000);
  }
});

};


// window.setTimeout(() => {
//   World.clear(phisyxEngine.world, false);
//   let boxA = Bodies.rectangle(200, 200, 80, 80, {collisionFilter: {group: -4},name: "box A", render:  {sprite: {xScale: .2, yScale: .2, texture: 'https://40.media.tumblr.com/e8258a36ccf95080f68f2ecf1a0ad021/tumblr_inline_nvs0vwJyjO1r33elg_540.png'}}});
//   World.add(phisyxEngine.world, [boxA]);
//   Render.run(phisyxEngine.render);
//
// }, 2000)
