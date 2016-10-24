let phisyxEngine = Engine.create({
  sceneEvents: [],
  render: {
    element: document.getElementById('canvas'),
    options: { width: 800, height: 500,
               showPositions: true,
               showCollisions: true,
               background: './images/syx_Background.png',
               wireframes: false}
  }
});

round1();
Engine.run(phisyxEngine);
Render.run(phisyxEngine.render);
