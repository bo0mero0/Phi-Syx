const letters = {	A: { name: "a", pos: -390, vertices: A, mask: 0x0002, group: -3 },
	              B: { name: "b",	pos: 0,	vertices: B, mask: 0x0004, group: -3 },
	              C: { name: "c",	pos: -200, vertices: C, mask: 0x0008, group: 2 },
	              D: { name: "d",	pos: -300, vertices: D, mask: 0x00016, group: 2 },
	              E: { name: "e",	pos: -300, vertices: E, mask: 0x00032, group: 2 },
	              F: { name: "f",	pos: -200, vertices: F, mask: 0x00064, group: 2 },
	              G: { name: "g",	pos: 0, vertices: G, mask: 0x0006, group: 2 },
	              H: { name: "h",	pos: 100,	vertices: H, mask: 0x0010, group: 2 },
	              I: { name: "i",	pos: 200,	vertices: I, mask: 0x0012, group: 2 },
	              J: { name: "j",	pos: 100,	vertices: J, mask: 0x0014, group: 2 },
	              K: { name: "k",	pos: 200,	vertices: K, mask: 0x0018, group: 2 },
	              L: { name: "l",	pos: 300,	vertices: L, mask: 0x0020, group: 2 },
	              M: { name: "m",	pos: 300,	vertices: M, mask: 0x0004, group: 2 },
                N: { name: "n",	pos: 200,	vertices: N, mask: 0x0004, group: 2 },
                O: { name: "o",	pos: 300,	vertices: O, mask: 0x0004, group: 2 },
                P: { name: "p",	pos: 390,	vertices: P, mask: 0x0004, group: 2 },
                Q: { name: "q",	pos: -390, vertices: Q, mask: 0x0004, group: 2 },
                R: { name: "r",	pos: -200, vertices: R, mask: 0x0004, group: 2 },
                S: { name: "s",	pos: -390, vertices: S, mask: 0x0004, group: 2 },
                T: { name: "t", pos: -100, vertices: T, mask: 0x0004, group: 2 },
                U: { name: "u",	pos: 100,	vertices: U, mask: 0x0004, group: 2 },
                V: { name: "v",	pos: -100, vertices: V, mask: 0x0002, group: -3 },
                W: { name: "w",	pos: -390, vertices: W, mask: 0x0004, group: 2 },
                X: { name: "x", pos: -300, vertices: X, mask: 0x0004, group: 2 },
                Y: { name: "y",	pos: 0, vertices: Y, mask: 0x0004, group: -2 },
                Z: { name: "z",	pos: -390, vertices: Z, mask: 0x0004, group: 2 }
};

let timeInterval;
let startTimeout;

let round4 = function() {
  let gameover = false;
  dragMouse = MouseConstraint.create(phisyxEngine);
  phisyxEngine.render.bounds.max = {x: 800, y: 500};
  phisyxEngine.render.bounds.min = {x: 0, y: 0};
  phisyxEngine.render.options.background= './images/round4background.jpg';

  let countdown1 = Bodies.circle(600, 100, 72, {isStatic: true, mass: 1,name: "countdown", collisionFilter: {mask: 0x0001 | 0x0004}, render:  {sprite: {xScale: .4, yScale: .4, texture: './images/countdown1.png'}}})
  let countdown2 = Bodies.circle(400, 100, 72, {isStatic: true, mass: 1,name: "countdown", collisionFilter: {mask: 0x0001 | 0x0004}, render:  {sprite: {xScale: .4, yScale: .4, texture: './images/countdown2.png'}}})
  let countdown3 = Bodies.circle(200, 100, 72, {isStatic: true, mass: 1,name: "countdown", collisionFilter: {mask: 0x0001 | 0x0004}, render:  {sprite: {xScale: .4, yScale: .4, texture: './images/countdown3.png'}}})

  let ground = Bodies.rectangle(400, 500, 810, 5, { name: "ground", isStatic: true, render: {opacity: 0} });
  let ceiling = Bodies.rectangle(400, 0, 800, 5, { isStatic: true, render: {opacity: 0} });
  let wallL = Bodies.rectangle(0, 300, 5, 600, { isStatic: true, render: {opacity: 0} });
  let wallR = Bodies.rectangle(800, 300, 5, 600, { isStatic: true, render: {opacity: 0} });
  ground.collisionFilter.category = 0x0002 | 0x0004;

  function createLetter(x, y, key) {
  	return Body.create({
  		position: {
  			x: x,
  			y: y
  		},
  		vertices: JSON.parse(JSON.stringify(letters[key].vertices)),
  		mass: 0.0017,
  		friction: 0,
  		restitution: 1
  	});
  }

  var letterBodies = [];

  function addLetter(letter) {
    let letterBody = Body.create({
                          name: "gameLetter",
                          letterType: "shooting",
                          letterChar: letter,
                          letter: letter,
                          render: {
                            fillStyle: "#ffffff",
                            strokeStyle: "#ffffff"
                          },
                      		position: {
                      			x: phisyxEngine.render.options.width / 2 + letters[letter].pos,
                      			y: 430
                      		},
                      		vertices: JSON.parse(JSON.stringify(letters[letter].vertices)),
                      		mass: 0.0017,
                      		friction: 0,
                      		restitution: 1
    });
    // letterBody.collisionFilter.group = letters[letter].group;
    // letterBody.collisionFilter.mask = letters[letter].mask;
    // letterBody.collisionFilter.category = letters[letter].mask;
    Body.scale(letterBody, .5, .5);
    // letterBody.angle = Math.random() * 0.5 - 0.25;
    letterBody.force.y -= 0.00003;
    letterBodies.push(letterBody);
    World.add(phisyxEngine.world, letterBodies[letterBodies.length - 1]);

    if (letterBodies.length > 30) {
      World.remove(phisyxEngine.world, letterBodies[0]);
      letterBodies = letterBodies.slice(1);
    }
  }

  World.add(phisyxEngine.world, [ceiling, wallL, wallR, ground, countdown1, countdown2, countdown3]);

  $(document).on("keypress", function(e) {
    var key = String.fromCharCode(e.which).toUpperCase();
    if(Object.keys(letters).includes(key)){
      addLetter(key);
    }
  });

  // $(".key").bind("click touch",function(e) {
  //   e.preventDefault();
  //   var key = String.fromCharCode($(this).attr("id").charCodeAt(0)).toUpperCase();
  //   if(key in letters){
  //     addLetter(key);
  //   }
  // });
  let time = 700;

  let createFallingLetter = () => {
      time -= 3;
      let letterArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let randLetter = letterArr[Math.floor(Math.random() * 25)];
      let fallingLetter = Body.create({
                            name: "gameLetter",
                            letterType: "falling",
                            letterChar: randLetter,
                        		position: {
                        			x: phisyxEngine.render.options.width / 2 + letters[randLetter].pos,
                        			y: 30
                        		},
                        		vertices: JSON.parse(JSON.stringify(letters[randLetter].vertices)),
                        		mass: 10000,
                        		friction: 0,
                        		restitution: 1
      });
      // fallingLetter.timeScale = .1;
      Body.scale(fallingLetter, .5, .5);
      World.add(phisyxEngine.world, fallingLetter);
      window.setTimeout(() => {
        fallingLetter.timeScale = .01;
        }, 100)
    }


  startTimeout = window.setTimeout(() => {
    countdown3.isStatic = false;
    startTimeout = window.setTimeout(() => {
      countdown2.isStatic = false;
      startTimeout = window.setTimeout(() => {
        countdown1.isStatic = false;
        startTimeout = window.setTimeout(() => {
          World.remove(phisyxEngine.world, [countdown3, countdown2, countdown1]);
          window.clearInterval(timeInterval);
          timeInterval = window.setInterval(createFallingLetter, time);
        }, 1500);
      }, 1000);
    }, 1000);

  }, 1000);

  let score = 0
  let recentHighScore = 0;
  Events.on(phisyxEngine, "collisionStart", (e) => {
    console.log(gameover);
    if (gameover === false && recentHighScore !== score && time - (score * 5) > 50 && score % 10 === 0 ) {
      recentHighScore = score;
      window.clearInterval(timeInterval);
      timeInterval = window.setInterval(createFallingLetter, time - (score * 5));
    }
    if (e.pairs[0].bodyA.name === "ground" && e.pairs[0].bodyB.letterType === "falling") {
      gameover = true
      window.clearInterval(timeInterval);
      World.clear(phisyxEngine.world, false);
      score = 0;
    } else if (e.pairs[0].bodyA.name === "ground" && e.pairs[0].bodyB.letterType === "shooting") {
      $('.score').text(`Score: ${score -= 2}`);
      World.remove(phisyxEngine.world, [e.pairs[0].bodyB]);
    } else {
      if (e.pairs[0].bodyA.name === "gameLetter" && e.pairs[0].bodyB.name === "gameLetter") {
        if (e.pairs[0].bodyA.letterType !== e.pairs[0].bodyB.letterType && e.pairs[0].bodyA.letterChar === e.pairs[0].bodyB.letterChar) {
          World.remove(phisyxEngine.world, [e.pairs[0].bodyA, e.pairs[0].bodyB]);
          $('.score').text(`Score: ${score += 1}`);
          // window.setTimeout(() => {
          //   roundEnd = false;
          //     round2();
          // }, 3000);
        } else {
          if (e.pairs[0].bodyA.letterType === "shooting") {
            e.pairs[0].bodyA.collisionFilter.category = 0x0001;
            World.remove(phisyxEngine.world, [e.pairs[0].bodyA]);
          } else if (e.pairs[0].bodyB.letterType === "shooting") {
            e.pairs[0].bodyB.collisionFilter.category = 0x0001;
            World.remove(phisyxEngine.world, [e.pairs[0].bodyB]);
          }
        }
      }
    }
  });

};
