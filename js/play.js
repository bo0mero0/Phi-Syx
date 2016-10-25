let phisyxEngine = Engine.create({
  sceneEvents: [],
  render: {
    element: document.getElementById('canvas'),
    options: { width: 800, height: 500,
               showPositions: true,
               showCollisions: true,
               wireframes: false}
  }
});

let dragMouse;

heading();
round4();

Engine.run(phisyxEngine);
Render.run(phisyxEngine.render);
