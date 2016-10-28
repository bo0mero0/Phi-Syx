let round3 = function() {
  $('.instructions').text(`Slingshot the weapon to knock of P H I`);

  instructionsTimeout = window.setTimeout(() => {
    $('.instructions').text(``);
  }, 5000);

  phisyxEngine.render.options.background = '#000000';
  let spear = Bodies.rectangle(300, 400, 200, 10, {name: "spear", render: {
          sprite: {
            xScale: .5,
            yScale: .5,
            texture: './images/spear.png'
          }
        } });
  Body.rotate(spear, 3);
  spear.collisionFilter.mask = 0x0001 | 0x0004;
  // spear.mass = 10;
  let slingPoint = { x: 300, y: 400 };
  let sling = Constraint.create({
      pointA: slingPoint,
      bodyB: spear,
      stiffness: 0.3,
      render: {
          lineWidth: 3,
          strokeStyle: '#dfa417'
      }
  });


  let p = Body.create({
    name: "P",
    position: { x: 1400, y: 100},
    vertices: JSON.parse(JSON.stringify(P)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001},
    render: {fillStyle:'#000000'}
  });

  let platform1 = Bodies.rectangle(1400, 130, 100, 5, { isStatic: true });

  let h = Body.create({
    name: "H",
    position: { x: 1400, y: 200},
    vertices: JSON.parse(JSON.stringify(H)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });

  let platform2 = Bodies.rectangle(1400, 230, 100, 5, { isStatic: true });

  let i = Body.create({
    name: "I",
    position: { x: 1400, y: 300},
    vertices: JSON.parse(JSON.stringify(I)),
    mass: 0.0017,
    collisionFilter: {mask: 0x0001}
  });

  let platform3 = Bodies.rectangle(1400, 330, 100, 2, { isStatic: true });

  let shield = Bodies.rectangle(1000, 330, 5, 100, { isStatic: true,
    render: {
      sprite: {
        xScale: .17,
        yScale: .17
        ,
        texture: './images/shield.png'
      }
    }
  });

  let ground = Bodies.rectangle(800, 500, 1600, 5, { name: "ground", isStatic: true });
  let ceiling = Bodies.rectangle(800, 0, 1600, 5, { name: "ceiling", isStatic: true });
  let wallL = Bodies.rectangle(0, 250, 5, 500, { name: "wallL", isStatic: true });
  let wallR = Bodies.rectangle(1600, 250, 5, 500, { name: "wallR", isStatic: true });

  let background = Bodies.rectangle(800, 250, 1600, 500, {
    isStatic: true,
    collisionFilter: { category: 0x0032 },
    render: {
      sprite: {
        texture: './images/round3Background.jpg'
      }
    }
  });



  dragMouse = MouseConstraint.create(phisyxEngine, { constraint: { stiffness: .4 }});
  dragMouse.collisionFilter.category = 0x0004;

  World.add(phisyxEngine.world, [background, shield, platform1, platform2, platform3, p, h, i, spear, sling, ceiling, wallL, wallR, ground, dragMouse]);


  Events.on(phisyxEngine, 'beforeUpdate', function(event) {
    let py = 300 + 150 * Math.sin(phisyxEngine.timing.timestamp * 0.002);
    Body.setVelocity(shield, { x: 0, y: py - shield.position.y });
    Body.setPosition(shield, { x: 1000, y: py - 50 });
  })
  Events.on(phisyxEngine, 'afterUpdate', function() {
    if (dragMouse.mouse.button === -1 && (spear.position.x > 350 || spear.position.y < 380)) {
      spear.collisionFilter.mask = 0x0001;

        spear = Bodies.rectangle(300, 400, 200, 10, {name: "rock2", render: {
          sprite: {
            xScale: .5,
            yScale: .5,
            texture: 'images/spear.png'
          }
        } });
        Body.rotate(spear, 3);
        spear.collisionFilter.mask = 0x0001 | 0x0004;
        World.add(phisyxEngine.world, spear);
        sling.bodyB = spear;
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

  phisyxEngine.world.bounds.min.x = -100;
  phisyxEngine.world.bounds.min.y = -100;
  phisyxEngine.world.bounds.max.x = 1700;
  phisyxEngine.world.bounds.max.y = 700;

  Events.on(phisyxEngine, 'beforeTick', function() {
      let translate;
      let render = phisyxEngine.render;
      let world = phisyxEngine.world;
      // mouse wheel controls zoom
      let scaleFactor = dragMouse.mouse.wheelDelta * -0.1;
      if (scaleFactor !== 0) {
          if ((scaleFactor < 0 && boundsScale.x >= 1) || (scaleFactor > 0 && boundsScale.x <= 1.7)) {
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
    let renderOptions = phisyxEngine.render.options;
       renderOptions.hasBounds = true;
      //  renderOptions.wireframes = false;

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
          Body.setPosition(round3Bubble, { x: 400, y: 150 });
        }, 3000);
      }, 3000);
    }

  });

};
