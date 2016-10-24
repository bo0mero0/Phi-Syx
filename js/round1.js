var W = [{x:26,y:20},{x:38,y:69},{x:51,y:53},{x:64,y:69},{x:79,y:20},{x:67,y:20},{x:62,y:40},{x:51,y:30},{x:43,y:40},{x:39,y:20}];
var I = [{x:47,y:13},{x:47,y:72},{x:66,y:72},{x:66,y:13}];
var N = [{x:28,y:72},{x:28,y:16},{x:44,y:16},{x:56,y:45},{x:56,y:16},{x:71,y:16},{x:71,y:72},{x:58,y:72},{x:44,y:44},{x:43,y:72}];
var P = [{x:33,y:15},{x:33,y:75},{x:48,y:75},{x:48,y:43},{x:72,y:42},{x:75,y:30},{x:73,y:19},{x:66,y:15},{x:33,y:15},{x:41,y:21},{x:62,y:22},{x:62,y:31},{x:41,y:32},{x:41,y:21}];
var H = [{x:29,y:12},{x:29,y:70},{x:46,y:70},{x:46,y:51},{x:65,y:51},{x:65,y:70},{x:81,y:70},{x:81,y:12},{x:65,y:12},{x:65,y:33},{x:46,y:33},{x:46,y:12}];
var Y = [{x:31,y:15},{x:49,y:15},{x:58,y:32},{x:66,y:15},{x:85,y:15},{x:65,y:43},{x:65,y:69},{x:52,y:69},{x:52,y:43}];
var O = [{x:47,y:15},{x:33,y:23},{x:26,y:32},{x:24,y:49},{x:38,y:60},{x:59,y:60},{x:70,y:49},{x:70,y:28},{x:61,y:18},{x:47,y:15},{x:49,y:25},{x:57,y:29},{x:61,y:40},{x:51,y:51},{x:40,y:45},{x:38,y:31},{x:49,y:25}];
var U = [{x:32,y:16},{x:32,y:58},{x:42,y:70},{x:54,y:73},{x:71,y:73},{x:78,y:70},{x:85,y:58},{x:85,y:16},{x:71,y:16},{x:71,y:51},{x:65,y:58},{x:51,y:58},{x:46,y:51},{x:45,y:16}];
var R = [{x:33,y:12},{x:33,y:69},{x:47,y:69},{x:47,y:51},{x:59,y:69},{x:72,y:69},{x:56,y:35},{x:73,y:33},{x:75,y:22},{x:73,y:14},{x:33,y:12},{x:45,y:19},{x:61,y:20},{x:61,y:25},{x:45,y:27},{x:45,y:19}];
var E = [{x:28,y:14},{x:28,y:72},{x:77,y:72},{x:77,y:59},{x:49,y:59},{x:49,y:46},{x:64,y:46},{x:65,y:33},{x:49,y:33},{x:49,y:23},{x:77,y:23},{x:76,y:14}];
var D = [{x:28,y:18},{x:28,y:71},{x:71,y:71},{x:81,y:63},{x:84,y:44},{x:82,y:31},{x:72,y:19},{x:28,y:18},{x:37,y:28},{x:61,y:29},{x:67,y:41},{x:66,y:53},{x:59,y:56},{x:37,y:55},{x:37,y:28}];
var C = [{x:80,y:17},{x:43,y:20},{x:35,y:29},{x:30,y:44},{x:32,y:56},{x:40,y:61},{x:56,y:62},{x:80,y:62},{x:80,y:52},{x:63,y:49},{x:50,y:41},{x:53,y:30},{x:80,y:30}];
var T = [{x:45,y:32},{x:45,y:72},{x:63,y:72},{x:63,y:32},{x:91,y:32},{x:91,y:16},{x:21,y:16},{x:21,y:32}];

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

let bubble = Bodies.circle(200, 200, 30, {mass: 1,name: "bubble", render:  {sprite: {xScale: .25, yScale: .25, texture: './images/paper_ball.png'}}});
let bubble2 = Bodies.circle(200, 200, 30)
let goal = Bodies.rectangle(710, 400, 70, 10, { name: "goal", render: {opacity: .5}, isStatic: true });
let trashWall = Bodies.rectangle(675, 410, 2, 110, { name: "trashWall", render: {opacity: 1}, isStatic: true });
Body.rotate(trashWall, 3);
let trash = Bodies.rectangle(710, 410, 10, 10, {name: "trash", isStatic: true, render:  {
  sprite: {
    xScale: .05,
    yScale: .05,
    opacity: .5,
    texture: './images/trash.png'
  }
}});

let boxB = Bodies.rectangle(450, 50, 80, 80);
let boxC = Bodies.rectangle(300, 50, 40, 20);
let ground = Bodies.rectangle(400, 470, 810, 10, { isStatic: true, render: {opacity: 0} });
let ceiling = Bodies.rectangle(400, 25, 800, 5, { isStatic: true, render: {opacity: 0} });
let wallL = Bodies.rectangle(30, 300, 5, 600, { isStatic: true, render: {opacity: 0} });
let wallR = Bodies.rectangle(767, 300, 5, 600, { isStatic: true, render: {opacity: 0} });
let trapezoid = Bodies.trapezoid(100, 100, 100, 100, 3);

let dragMouse = MouseConstraint.create(phisyxEngine);
World.add(phisyxEngine.world, [trashWall, goal, boxC, ceiling, wallL, wallR, trapezoid, bubble, bubble2, boxB, ground, trash, dragMouse]);      


Events.on(dragMouse, "mousedown", (e) => {
  console.log("phi mouse down");
  bubble.isStatic = true;
});
Events.on(dragMouse, "mouseup", (e) => {
  console.log("Phi mouse up");
  bubble.isStatic = false;
});

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
      Events.off(phisyxEngine, "collisionStart");
      Events.off(dragMouse, "mousedown");
      Events.off(dragMouse, "mouseup");
      World.clear(phisyxEngine.world, false);
      Engine.clear(phisyxEngine);
      roundEnd = false;
        round2();
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
