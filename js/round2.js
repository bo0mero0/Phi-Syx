let round2 = function() {
  $('.instructions').text(`Slingshot the rock to knock off P H I`);
  $('.instructions2').text(`(Use mouse to zoom and shift views)`);

  instructionsTimeout = window.setTimeout(() => {
    $('.instructions').text(``);
    $('.instructions2').text(``);
  }, 5000);

  phisyxEngine.render.options.background = '#85f74c';
  let rock = Bodies.circle(200, 400, 20, {name: "rock", render: {
          sprite: {
            xScale: .2,
            yScale: .2,
            texture: './images/Rock.png'
          }
        } });
  rock.collisionFilter.mask = 0x0001 | 0x0004;
  // rock.mass = 10;
  let slingPoint = { x: 200, y: 400 };
  let sling = Constraint.create({
      pointA: slingPoint,
      bodyB: rock,
      stiffness: 0.3,
      render: {
          lineWidth: 7,
          strokeStyle: '#2f1810'
      }
  });


  let p = Body.create({
    name: "P",
    position: { x: 1000, y: 100},
    vertices: JSON.parse(JSON.stringify(P)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001},
    render: {fillStyle:'#000000'}
  });
  let platform1 = Bodies.rectangle(1000, 200, 100, 5, { isStatic: true, render: {
          sprite: {
            xScale: .3,
            yScale: .3,
            texture: './images/platform1.png'
          }
        } });

  let h = Body.create({
    name: "H",
    position: { x: 1200, y: 100},
    vertices: JSON.parse(JSON.stringify(H)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });
  let platform2 = Bodies.rectangle(1200, 300, 100, 5, { isStatic: true, render: {
          sprite: {
            xScale: .3,
            yScale: .3,
            texture: './images/platform1.png'
          }
        } });

  let i = Body.create({
    name: "I",
    position: { x: 1400, y: 100},
    vertices: JSON.parse(JSON.stringify(I)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });

  let platform3 = Bodies.rectangle(1400, 400, 100, 5, { isStatic: true, render: {
          sprite: {
            xScale: .3,
            yScale: .3,
            texture: './images/platform1.png'
          }
        } });

  let slingshot = Bodies.rectangle(179, 440, 5, 5, { collisionFilter: { category: 0x0002 }, isStatic: true, render: {
      sprite: {
        xScale: .4,
        yScale: .4,
        texture: './images/slingshot.png'
      }
    }
  });

  let slingshotFront = Bodies.rectangle(179, 440, 5, 5, { collisionFilter: { category: 0x0002 }, isStatic: true, render: {
      sprite: {
        xScale: .4,
        yScale: .4,
        texture: './images/slingshot_front.png'
      }
    }
  });
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



  dragMouse = MouseConstraint.create(phisyxEngine, { constraint: { stiffness: .4 }});
  dragMouse.collisionFilter.category = 0x0004
  dragMouse.constraint.render.visible = false;

  World.add(phisyxEngine.world, [background, platform1, platform2, platform3, p, h, i, slingshot, rock, slingshotFront, sling, ceiling, wallL, wallR, ground, dragMouse]);


  Events.on(phisyxEngine, 'afterUpdate', function() {
    if (dragMouse.mouse.button === -1 && (rock.position.x > 250 || rock.position.y < 380)) {
      rock.collisionFilter.mask = 0x0001;

        rock = Bodies.polygon(200, 400, 7, 20, {name: "rock2", render: {
          sprite: {
            xScale: .2,
            yScale: .2,
            texture: './images/Rock.png'
          }
        } });
        rock.collisionFilter.mask = 0x0001 | 0x0004;
        World.add(phisyxEngine.world, [rock, slingshotFront]);
        sling.bodyB = rock;
    }
  });

  let boundsScaleTarget = 1.3;
  let boundsScale = {
          x: 1,
          y: 1
      };

  let viewportCentre = {
       x: phisyxEngine.render.options.width * 0.5,
       y: phisyxEngine.render.options.height * 0.5
   };

  phisyxEngine.world.bounds.min.x = -150;
  phisyxEngine.world.bounds.min.y = -100;
  phisyxEngine.world.bounds.max.x = 1750;
  phisyxEngine.world.bounds.max.y = 700;

  Events.on(phisyxEngine, 'beforeTick', function() {
      let translate;
      let render = phisyxEngine.render;
      let world = phisyxEngine.world;
      // mouse wheel controls zoom
      let scaleFactor = dragMouse.mouse.wheelDelta * -0.1;
      if (scaleFactor !== 0) {
          if ((scaleFactor < 0 && boundsScale.x >= 1) || (scaleFactor > 0 && boundsScale.x <= 2)) {
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
              x: render.options.width * scaleFactor * -1,
              y: render.options.height * scaleFactor * -1
          };

          Bounds.translate(render.bounds, translate);

          // update mouse
          Mouse.setScale(dragMouse.mouse, boundsScale);
          Mouse.setOffset(dragMouse.mouse, render.bounds.min);
      }

      var deltaCentre = Vector.sub(dragMouse.mouse.absolute, viewportCentre),
          centreDist = Vector.magnitude(deltaCentre);


      if (centreDist > 50) {
          // create a vector to translate the view, allowing the user to control view speed
          var direction = Vector.normalise(deltaCentre),
              speed = Math.min(10, Math.pow(centreDist - 50, 2) * 0.0002);

          translate = Vector.mult(direction, speed);

          if (render.bounds.min.x + translate.x < world.bounds.min.x)
              translate.x = world.bounds.min.x - render.bounds.min.x;

          if (render.bounds.max.x + translate.x > world.bounds.max.x)
              translate.x = world.bounds.max.x - render.bounds.max.x;

          if (render.bounds.min.y + translate.y < world.bounds.min.y)
              translate.y = world.bounds.min.y - render.bounds.min.y;

          if (render.bounds.max.y + translate.y > world.bounds.max.y)
              translate.y = world.bounds.max.y - render.bounds.max.y;

          Bounds.translate(render.bounds, translate);


          Mouse.setOffset(dragMouse.mouse, render.bounds.min);
      }
    });
    let renderOptions = phisyxEngine.render.options;
       renderOptions.hasBounds = true;

  let knockP = false;
  let knockH = false;
  let knockI = false;
  let winSpawn = false;
  Events.on(phisyxEngine, "collisionStart", (e) => {
    if (e.pairs[0].bodyA.name === "P" && knockP === false && (e.pairs[0].bodyB.name === "ground" || e.pairs[0].bodyB.name === "wallR")) {
      knockP = true;
    } else if (e.pairs[0].bodyA.name === "H" && knockH === false && (e.pairs[0].bodyB.name === "ground" || e.pairs[0].bodyB.name === "wallR")) {
      knockH = true;
    } else if (e.pairs[0].bodyA.name === "I" && knockI === false && (e.pairs[0].bodyB.name === "ground" || e.pairs[0].bodyB.name === "wallR")) {
      knockI = true;
    } else if (knockP === true && knockH === true && knockI === true && winSpawn === false) {
      winSpawn = true;
      let y = Body.create({
        position: { x: 300, y: 50},
        vertices: JSON.parse(JSON.stringify(Y)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let o = Body.create({
        position: { x: 350, y: 50},
        vertices: JSON.parse(JSON.stringify(O)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let u = Body.create({
        position: { x: 400, y: 50},
        vertices: JSON.parse(JSON.stringify(U)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let quote = Bodies.rectangle(425, 30, 10, 20, {collisionFilter: {mask: 0x0001}});
      let r = Body.create({
        position: { x: 475, y: 50},
        vertices: JSON.parse(JSON.stringify(R)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let e2 = Body.create({
        position: { x: 525, y: 50},
        vertices: JSON.parse(JSON.stringify(E)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let d = Body.create({
        position: { x: 700, y: 50},
        vertices: JSON.parse(JSON.stringify(D)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let e3 = Body.create({
        position: { x: 750, y: 50},
        vertices: JSON.parse(JSON.stringify(E)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let c = Body.create({
        position: { x: 800, y: 50},
        vertices: JSON.parse(JSON.stringify(C)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let e4 = Body.create({
        position: { x: 850, y: 50},
        vertices: JSON.parse(JSON.stringify(E)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let n = Body.create({
        position: { x: 900, y: 50},
        vertices: JSON.parse(JSON.stringify(N)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      let t = Body.create({
        position: { x: 950, y: 50},
        vertices: JSON.parse(JSON.stringify(T)),
        mass: 0.0017,
        collisionFilter: {mask: 0x0001}
      });
      phisyxEngine.timing.timeScale = .2;
      World.add(phisyxEngine.world, [y, o, u, quote, r, e2, d, e3, c, e4, n, t]);
      window.setTimeout(() => {
        phisyxEngine.timing.timeScale = 1;
        window.setTimeout(() => {
          Body.setPosition(round2Bubble, { x: 400, y: 150 });
        }, 3000);
      }, 3000);
    }

  });

};
