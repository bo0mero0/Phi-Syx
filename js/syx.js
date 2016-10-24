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
let round1Engine;
let roundEnd = false;


let round1 = function() {
round1Engine = Engine.create({
  sceneEvents: [],
  render: {
    element: document.getElementById('canvas'),
    options: { width: 800, height: 500,
               showPositions: true,
               showCollisions: true,
               background: 'images/syx_Background.png',
               wireframes: false}
  }
});
// var render = Render.create({
//     element: document.getElementById('canvas'),
//     engine: engine,
//     options: { width: 600, height: 600,
//                showMousePosition: true,
//                showPositions: true,
//                showCollisions: true}
// });

let boxA = Bodies.rectangle(200, 200, 80, 80, {mass: 1, collisionFilter: {group: -4},name: "box A", render:  {sprite: {xScale: .2, yScale: .2, texture: 'https://40.media.tumblr.com/e8258a36ccf95080f68f2ecf1a0ad021/tumblr_inline_nvs0vwJyjO1r33elg_540.png'}}});
let goal = Bodies.rectangle(760, 415, 70, 10, { render: {wireframeBackground: '#000000', opacity: .5}, isStatic: true });
let trash = Bodies.rectangle(761, 450, 60, 70, {name: "box A", isStatic: true, render:  {sprite: {xScale: .2, yScale: .2, texture: 'https://cdn3.iconfinder.com/data/icons/macosxstyle/macosxstyle_png/512/Trash%20Empty.png'}}});

let boxB = Bodies.rectangle(450, 50, 80, 80);
let boxC = Bodies.rectangle(300, 50, 40, 20);
let ground = Bodies.rectangle(400, 500, 810, 10, { isStatic: true });
let ceiling = Bodies.rectangle(400, 0, 800, 5, { isStatic: true });
let wallL = Bodies.rectangle(0, 300, 5, 600, { isStatic: true });
let wallR = Bodies.rectangle(800, 300, 5, 600, { isStatic: true });
let trapezoid = Bodies.trapezoid(100, 100, 100, 100, 3);

let dragMouse = MouseConstraint.create(round1Engine);
World.add(round1Engine.world, [trash, goal, boxC, ceiling, wallL, wallR, trapezoid, boxA, boxB, ground, dragMouse]);      


Events.on(dragMouse, "mousedown", (e) => {
  console.log("phi mouse down");
  // boxA.isStatic = true;
});
Events.on(dragMouse, "mouseup", (e) => {
  console.log("Phi mouse up");
  boxA.isStatic = false;
});

Events.on(round1Engine, "collisionStart", (e) => {
  if (roundEnd === false && e.pairs[0].bodyA.id === 1 && e.pairs[0].bodyB.id === 2) {
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
    World.add(round1Engine.world, [w, i, n]);
    window.setTimeout(() => {
      Events.off(round1Engine, "collisionStart");
      Events.off(dragMouse, "mousedown");
      Events.off(dragMouse, "mouseup");
      World.clear(round1Engine.world, false);
      Engine.clear(round1Engine);
      roundEnd = false;
        round2();
    }, 3000);
  }
});

Engine.run(round1Engine);
Render.run(round1Engine.render);
};

let round2 = function() {

  round1Engine.render.options.background = '#85f74c';
  let rock = Bodies.circle(200, 400, 20, {name: "rock", render: {
          sprite: {
            xScale: .2,
            yScale: .2,
            texture: 'http://vignette3.wikia.nocookie.net/spore/images/7/7b/A_Freaking_Rock.png/revision/latest?cb=20080716163511'
          }
        } });
  rock.collisionFilter.mask = 0x0001;
  // rock.mass = 10;
  let slingPoint = { x: 200, y: 400 };
  let sling = Constraint.create({
      pointA: slingPoint,
      bodyB: rock,
      stiffness: 0.3,
      render: {
          lineWidth: 3,
          strokeStyle: '#dfa417'
      }
  });


  let p = Body.create({
    name: "P",
    position: { x: 1300, y: 100},
    vertices: JSON.parse(JSON.stringify(P)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001},
    render: {fillStyle:'#000000'}
  });

  let h = Body.create({
    name: "H",
    position: { x: 1300, y: 200},
    vertices: JSON.parse(JSON.stringify(H)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });

  let i = Body.create({
    name: "I",
    position: { x: 1300, y: 300},
    vertices: JSON.parse(JSON.stringify(I)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });

  let platform = Bodies.rectangle(1300, 400, 100, 5, { isStatic: true });


  let ground = Bodies.rectangle(800, 500, 1600, 5, { name: "ground", isStatic: true });
  let ceiling = Bodies.rectangle(800, 0, 1600, 5, { name: "ceiling", isStatic: true });
  let wallL = Bodies.rectangle(0, 250, 5, 500, { name: "wallL", isStatic: true });
  let wallR = Bodies.rectangle(1600, 250, 5, 500, { name: "wallR", isStatic: true });

  let background = Bodies.rectangle(800, 250, 1600, 500, {
    isStatic: true,
    collisionFilter: { category: 0x0002 },
    render: {
      sprite: {
        texture: 'images/round2Background.png'
      }
    }
  });



  let dragMouse = MouseConstraint.create(round1Engine, { constraint: { stiffness: .4 }});
  World.add(round1Engine.world, [background, platform, p, h, i, rock, sling, ceiling, wallL, wallR, ground, dragMouse]);



  Events.on(round1Engine, 'afterUpdate', function() {
    if (dragMouse.mouse.button === -1 && (rock.position.x > 250 || rock.position.y < 380)) {
      let rock2 = rock;
      Events.on(dragMouse, "mousedown", (e) => {
        console.log("phi mouse down");
        rock2.isStatic = true;
      });

        rock = Bodies.polygon(200, 400, 7, 20, {name: "rock2", render: {
          sprite: {
            xScale: .2,
            yScale: .2,
            texture: 'http://vignette3.wikia.nocookie.net/spore/images/7/7b/A_Freaking_Rock.png/revision/latest?cb=20080716163511'
          }
        } });
        rock.collisionFilter.mask = 0x0001;
        World.add(round1Engine.world, rock);
        sling.bodyB = rock;
    }
  });

  let boundsScaleTarget = 1;
  let boundsScale = {
          x: 1,
          y: 1
      };

  let viewportCentre = {
       x: round1Engine.render.options.width * 0.5,
       y: round1Engine.render.options.height * 0.5
   };

  round1Engine.world.bounds.min.x = -100;
  round1Engine.world.bounds.min.y = -100;
  round1Engine.world.bounds.max.x = 1700;
  round1Engine.world.bounds.max.y = 650;

  Events.on(round1Engine, 'beforeTick', function() {
      let translate;
      let render = round1Engine.render;
      let world = round1Engine.world;
      // mouse wheel controls zoom
      let scaleFactor = dragMouse.mouse.wheelDelta * -0.1;
      if (scaleFactor !== 0) {
          if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 1.4)) {
              boundsScaleTarget += scaleFactor;
          }
      }
      // if scale has changed
      if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
          // smoothly tween scale factor
          scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
          boundsScale.x += scaleFactor;
          boundsScale.y += scaleFactor;

          // scale the render bounds
          render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
          render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

          // translate so zoom is from centre of view
          translate = {
              x: render.options.width * scaleFactor * -0.5,
              y: render.options.height * scaleFactor * -0.5
          };

          Bounds.translate(render.bounds, translate);

          // update mouse
          Mouse.setScale(dragMouse.mouse, boundsScale);
          Mouse.setOffset(dragMouse.mouse, render.bounds.min);
      }

      var deltaCentre = Vector.sub(dragMouse.mouse.absolute, viewportCentre),
          centreDist = Vector.magnitude(deltaCentre);

      // translate the view if mouse has moved over 50px from the centre of viewport
      if (centreDist > 50) {
          // create a vector to translate the view, allowing the user to control view speed
          var direction = Vector.normalise(deltaCentre),
              speed = Math.min(10, Math.pow(centreDist - 50, 2) * 0.0002);

          translate = Vector.mult(direction, speed);

          // prevent the view moving outside the world bounds
          if (render.bounds.min.x + translate.x < world.bounds.min.x)
              translate.x = world.bounds.min.x - render.bounds.min.x;

          if (render.bounds.max.x + translate.x > world.bounds.max.x)
              translate.x = world.bounds.max.x - render.bounds.max.x;

          if (render.bounds.min.y + translate.y < world.bounds.min.y)
              translate.y = world.bounds.min.y - render.bounds.min.y;

          if (render.bounds.max.y + translate.y > world.bounds.max.y)
              translate.y = world.bounds.max.y - render.bounds.max.y;

          // move the view
          Bounds.translate(render.bounds, translate);

          // we must update the mouse too
          Mouse.setOffset(dragMouse.mouse, render.bounds.min);
      }
    });
    let renderOptions = round1Engine.render.options;
       renderOptions.hasBounds = true;
      //  renderOptions.wireframes = false;

  let knockP = false;
  let knockH = false;
  let knockI = false;
  let winSpawn = false;
  Events.on(round1Engine, "collisionStart", (e) => {
    if (e.pairs[0].bodyA.name === "P" && knockP === false && (e.pairs[0].bodyB.name === "ground" || e.pairs[0].bodyB.name === "wallR")) {
      knockP = true;
    } else if (e.pairs[0].bodyA.name === "H" && knockH === false && (e.pairs[0].bodyB.name === "ground" || e.pairs[0].bodyB.name === "wallR")) {
      knockH = true;
    } else if (e.pairs[0].bodyA.name === "I" && knockI === false && (e.pairs[0].bodyB.name === "ground" || e.pairs[0].bodyB.name === "wallR")) {
      knockI = true;
    } else if (knockP === true && knockH === true && knockI === true && winSpawn === false) {
      winSpawn = true;
      let y = Body.create({
        position: { x: 200, y: 50},
        vertices: JSON.parse(JSON.stringify(Y)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let o = Body.create({
        position: { x: 250, y: 50},
        vertices: JSON.parse(JSON.stringify(O)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let u = Body.create({
        position: { x: 300, y: 50},
        vertices: JSON.parse(JSON.stringify(U)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let quote = Bodies.rectangle(325, 50, 10, 20, {collisionFilter: {mask: 0x0001}});
      let r = Body.create({
        position: { x: 375, y: 50},
        vertices: JSON.parse(JSON.stringify(R)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let e2 = Body.create({
        position: { x: 425, y: 50},
        vertices: JSON.parse(JSON.stringify(E)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let d = Body.create({
        position: { x: 600, y: 50},
        vertices: JSON.parse(JSON.stringify(D)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let e3 = Body.create({
        position: { x: 650, y: 50},
        vertices: JSON.parse(JSON.stringify(E)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let c = Body.create({
        position: { x: 700, y: 50},
        vertices: JSON.parse(JSON.stringify(C)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let e4 = Body.create({
        position: { x: 750, y: 50},
        vertices: JSON.parse(JSON.stringify(E)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let n = Body.create({
        position: { x: 800, y: 50},
        vertices: JSON.parse(JSON.stringify(N)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let t = Body.create({
        position: { x: 850, y: 50},
        vertices: JSON.parse(JSON.stringify(T)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      World.add(round1Engine.world, [y, o, u, quote, r, e2, d, e3, c, e4, n, t]);
      // window.setTimeout(() => {
      //   World.clear(round1Engine.world, false);
      //
      // }, 3000);
    }

  });

};

round1();
// window.setTimeout(() => {
//   World.clear(round1Engine.world, false);
//   let boxA = Bodies.rectangle(200, 200, 80, 80, {collisionFilter: {group: -4},name: "box A", render:  {sprite: {xScale: .2, yScale: .2, texture: 'https://40.media.tumblr.com/e8258a36ccf95080f68f2ecf1a0ad021/tumblr_inline_nvs0vwJyjO1r33elg_540.png'}}});
//   World.add(round1Engine.world, [boxA]);
//   Render.run(round1Engine.render);
//
// }, 2000)
