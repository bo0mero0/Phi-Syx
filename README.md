# **Phyics**

## **[Live Weblink](http://bo0mero0.github.io/Phi-Syx)**

## **Background**

  Using interaction between objects of various shapes to move a designated object to the finish line.
This game will demonstrate and simulate real life physics.

### **Rules**
- player must move(drag and drop) the designated object pass the finish line to pass the round
- player will only have a certain amount of moves per round
- player can restart a round as many time as they need

## **Functionality & MVP**

Basic functionalities are:
-[ ] restart round at any point
- [ ] drag and drop object
- [ ] object interaction obey they law of physics
- [ ] will lose if number of moves are up and goal have not been met

## **Wireframe**

This app will consist of a main start page and all interaction will be made with the mouse. Each round will render a new level on completion of the previous.

![Alt Text](./physic_wireframe.png?raw=true "Physic Wireframe")

## **Architecture and Technologies**

- Javascript and canvas will be the main structure
- Will also use the matter.js physic engine to help with object interaction
- webpack to bundle and serve up scripts

## **Implementation Timeline**

### **Day 1**
- get the start page and game window set up
  - clicking on start page should start the first round
  - aesthetics should be as expected
### **Day 2**
- Implementation of matter.js
  - objects should interact the way it is intented
  - set shapes to spawn per round
  - designated object should be labeled
- drag and drop interactions
  - should be able to pick up and drop object anywhere on the window

### **Day 3**
- continue drag and drop interactions.
- add winning condition
  - once designated object hits red line, round should end
  - drag and drop disable for designated object

### **Bonus**
- add random round
- highscore base on timer
