const letters = {	A: { name: "a", pos: -500, vertices: A },
	              B: { name: "b",	pos: 0,	vertices: B	},
	              C: { name: "c",	pos: -200, vertices: C },
	              D: { name: "d",	pos: -300, vertices: D },
	              E: { name: "e",	pos: -300, vertices: E },
	              F: { name: "f",	pos: -200, vertices: F },
	              G: { name: "g",	pos: 0, vertices: G	},
	              H: { name: "h",	pos: 100,	vertices: H	},
	              I: { name: "i",	pos: 200,	vertices: I	},
	              J: { name: "j",	pos: 100,	vertices: J	},
	              K: { name: "k",	pos: 200,	vertices: K	},
	              L: { name: "l",	pos: 300,	vertices: L	},
	              M: { name: "m",	pos: 300,	vertices: M	},
                N: { name: "n",	pos: 200,	vertices: N	},
                O: { name: "o",	pos: 300,	vertices: O	},
                P: { name: "p",	pos: 400,	vertices: P	},
                Q: { name: "q",	pos: -500, vertices: Q },
                R: { name: "r",	pos: -200, vertices: R },
                S: { name: "s",	pos: -400, vertices: S },
                T: { name: "t", pos: -100, vertices: T },
                U: { name: "u",	pos: 100,	vertices: U	},
                V: { name: "v",	pos: -100, vertices: V },
                W: { name: "w",	pos: -400, vertices: W },
                X: { name: "x", pos: -300, vertices: X },
                Y: { name: "y",	pos: 0, vertices: Y	},
                Z: { name: "z",	pos: -400, vertices: Z }
};

let round4 = function() {

dragMouse = MouseConstraint.create(phisyxEngine);
phisyxEngine.render.bounds.max = {x: 800, y: 500};
phisyxEngine.render.bounds.min = {x: 0, y: 0};
phisyxEngine.render.options.background= './images/syx_Background.png';



let ground = Bodies.rectangle(400, 500, 810, 5, { isStatic: true, render: {opacity: 0} });
let ceiling = Bodies.rectangle(400, 0, 800, 5, { isStatic: true, render: {opacity: 0} });
let wallL = Bodies.rectangle(0, 300, 5, 600, { isStatic: true, render: {opacity: 0} });
let wallR = Bodies.rectangle(800, 300, 5, 600, { isStatic: true, render: {opacity: 0} });

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
  debugger
  let letterBody = Body.create({
                    		position: {
                    			x: window.innerWidth / 2 + letters[letter].pos,
                    			y: 400
                    		},
                    		vertices: JSON.parse(JSON.stringify(letters[letter].vertices)),
                    		mass: 0.0017,
                    		friction: 0,
                    		restitution: 1
  });

  debugger
  letterBody.angle = Math.random() * 0.5 - 0.25;
  letterBody.force.y -= 0.00015;
  letterBodies.push(letterBody);
  World.add(phisyxEngine.world, letters[letterBodies.length - 1]);

  if (letterBodies.length > 30) {
    World.remove(phisyxEngine.world, letterBodies[0]);
    letterBodies = letterBodies.slice(1);
  }
}

World.add(phisyxEngine.world, [ceiling, wallL, wallR, ground, dragMouse]);

$(document).keypress(function(e) {
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

Events.on(phisyxEngine, "collisionStart", (e) => {
  if (roundEnd === false && e.pairs[0].bodyA.name === "bubble" && e.pairs[0].bodyB.name === "goal") {


    window.setTimeout(() => {
      roundEnd = false;
        round2();
    }, 3000);
  }
});

};
