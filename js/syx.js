var W = [{x:26,y:20},{x:38,y:69},{x:51,y:53},{x:64,y:69},{x:79,y:20},{x:67,y:20},{x:62,y:40},{x:51,y:30},{x:43,y:40},{x:39,y:20}];
var I = [{x:47,y:13},{x:47,y:72},{x:66,y:72},{x:66,y:13}];
var N = [{x:28,y:72},{x:28,y:16},{x:44,y:16},{x:56,y:45},{x:56,y:16},{x:71,y:16},{x:71,y:72},{x:58,y:72},{x:44,y:44},{x:43,y:72}];
var P = [{x:33,y:15},{x:33,y:75},{x:48,y:75},{x:48,y:43},{x:72,y:42},{x:75,y:30},{x:73,y:19},{x:66,y:15},{x:33,y:15},{x:41,y:21},{x:62,y:22},{x:62,y:31},{x:41,y:32},{x:41,y:21}];
var H = [{x:29,y:12},{x:29,y:70},{x:46,y:70},{x:46,y:51},{x:65,y:51},{x:65,y:70},{x:81,y:70},{x:81,y:12},{x:65,y:12},{x:65,y:33},{x:46,y:33},{x:46,y:12}];


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

  round1Engine.render.options.background = '#85f74c'
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
      stiffness: 0.2,
      render: {
          lineWidth: 3,
          strokeStyle: '#dfa417'
      }
  });


  let p = Body.create({
    position: { x: 600, y: 100},
    vertices: JSON.parse(JSON.stringify(P)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001},
    render: {fillStyle:'#000000'}
  });

  let h = Body.create({
    position: { x: 1300, y: 200},
    vertices: JSON.parse(JSON.stringify(H)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });

  let i = Body.create({
    position: { x: 1400, y: 300},
    vertices: JSON.parse(JSON.stringify(I)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });

  let ground = Bodies.rectangle(800, 500, 1600, 5, { isStatic: true });
  let ceiling = Bodies.rectangle(800, 0, 1600, 5, { isStatic: true });
  let wallL = Bodies.rectangle(0, 250, 5, 500, { isStatic: true });
  let wallR = Bodies.rectangle(1600, 250, 5, 500, { isStatic: true });

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
  World.add(round1Engine.world, [background, p, h, i, rock, sling, ceiling, wallL, wallR, ground, dragMouse]);



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

  Events.on(round1Engine, "collisionEnd", (e) => {
    if (e.pairs[0].bodyA.name === "box A" && e.pairs[0].bodyB.name === "trash") {
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
        World.clear(round1Engine.world, false);
          round1();
      }, 3000);
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
