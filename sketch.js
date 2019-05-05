let pend = [];
let polySynth;
let damp = 0.9999;
const notes = ['C2', 'C3', 'C4', 'C5', 'G3', 'G4', 'G5', 'F3','F4','F5','E3','E4','E5','A3','A4','A5'];
let colors;
let colorBody;
const tMax = 24000;
const g = 0.5;
function setStorage(cname, cvalue) {
  window.localStorage.setItem(cname, cvalue);
}
function getStorage(cname) {
  return window.localStorage.getItem(cname);
}
function lengthCalc(k) {
  return function(n) {
    let part = (tMax/(TWO_PI*(k + n + 1)));
    return g * pow(part, 2);
  }
}
function solveK(l) {
  return (tMax/(sqrt(l/g)*TWO_PI)) - 2;
}
function setup() {
  let canvas = createCanvas(1600,800);
  canvas.parent('sketch-holder');
  let lenCalc = lengthCalc(solveK(height - 50));
  colors = getStorage('colors');
  if(!colors || colors === '[]') {
    defaultColors();
  } else {
    colors = JSON.parse(colors).map(function(d) { return color(d);});
  }
  let colorLen = colors.length;
  for(let i = 300; i > 0; i--) {
    let len = lenCalc(i);
    pend.push(new Pendulum(width/2, 10, PI/3, len, colors[i % colorLen], i*10 + 160));
  }
  createColorsInterface();
}
function defaultColors() {
  colors = [color(255,0,0,140), color(0,255,0,140), color(0, 0, 255, 140)];
  setStorage('colors', JSON.stringify(colors.map(function(d) { return d.toString();})));
}
function updatePendulumColors() {
  let colorLen = colors.length;
  for(let i = 0; i < pend.length; i++) {
    pend[i].setColor(colors[i % colorLen]);
  }
}
function addColor(color) {
  colors.push(color);
  updatePendulumColors();
  setStorage('colors', JSON.stringify(colors.map(function(d) { return d.toString();})));
  updateColorList();
}
function removeColor(color) {
  let index = colors.indexOf(color);
  colors.splice(index, 1);
  updatePendulumColors();
  setStorage('colors', JSON.stringify(colors.map(function(d) { return d.toString();})));
  updateColorList();
}
function generateDiv(parent, classValue, content) {
  content = content || '';
  let div = createDiv(content);
  div.parent(parent);
  div.class(classValue);
  return div;
}
function generateFormInput(parent, label, defaultValue, func) {
  let fieldDiv = createDiv('<label>'+ label + '</label>');
  fieldDiv.parent(parent);
  fieldDiv.class('sixteen wide field');
  let input = createInput(defaultValue);
  input.parent(fieldDiv);
  input.input(function() {
    func(input.value());
  });
}
function createColorsInterface() {
  let container = createDiv();
  container.position(1610, 10);
  let header = generateDiv(container, 'ui top attached segment');
  let cPickContainer = generateDiv(header, 'ui form');
  generateFormInput(generateDiv(cPickContainer, 'inline fields'),
          'Dampening Value',
          damp,
          function(d) {
            damp = d;
          });

  let field = generateDiv(cPickContainer, 'inline fields');
  let fieldDiv = generateDiv(field, 'eight wide field', '<label>Color Picker</label>');
  let plusbutton = createColorPicker('rgba(0,0,0,140)');
  plusbutton.parent(fieldDiv);
  plusbutton.input(function() {
    addColor(plusbutton.color());
  });
  let fieldDiv2 = generateDiv(field, 'eight wide field');
  let defaultbutton = createButton('Default');
  defaultbutton.parent(fieldDiv2);
  defaultbutton.mouseClicked(function() {
    defaultColors();
    updatePendulumColors();
    updateColorList();
  });


  colorBody = generateDiv(container, 'ui bottom attached segment');
  updateColorList();
}
function updateColorList() {
  let children = colorBody.child();
  for(let c of children) {
    c.remove();
  }
  let colorsDiv = createDiv();
  colorsDiv.class('ui celled list');
  colorsDiv.parent(colorBody);
  for(let color of colors) {
    let colorDiv = createDiv();
    colorDiv.parent(colorsDiv);
    colorDiv.class('item');
    colorDiv.style('background:' + color.toString('#rrggbbaa'));
    let floatedContent = createDiv();
    floatedContent.parent(colorDiv);
    floatedContent.class('right floated content');
    let minusbutton = createButton('<i class="minus icon"></i>');
    minusbutton.class('ui mini icon button');
    minusbutton.parent(floatedContent);
    minusbutton.mouseClicked(function() {
      removeColor(color);
    });
    let content = createDiv(color.toString());
    content.parent(colorDiv);
    content.class('content');
  }
}
function mouseClicked() {
  if(mouseX < width && mouseY < height)
  for(let p of pend) {
    p.toggleShowLine();
  }
}

function draw() {
  background(0);
  for(let p of pend) {
    p.update();
    p.render();
  }
}
