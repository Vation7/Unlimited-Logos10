const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('./lib/shapes');

// Questions for user input
const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo:',
    validate: input => input.length <= 3 || 'Please enter up to three characters.',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter a color for the text (keyword or hexadecimal):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['Circle', 'Triangle', 'Square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a color for the shape (keyword or hexadecimal):',
  },
];

// Function to generate the SVG logo with a unique name
function generateLogo({ text, textColor, shape, shapeColor }) {
  let shapeObj;
  switch (shape) {
    case 'Circle':
      shapeObj = new Circle();
      break;
    case 'Triangle':
      shapeObj = new Triangle();
      break;
    case 'Square':
      shapeObj = new Square();
      break;
  }

  shapeObj.setColor(shapeColor);

  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
  ${shapeObj.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;

  // Create a unique filename using a timestamp
  const timestamp = Date.now();
  const filePath = `./examples/logo_${timestamp}.svg`;

  // Ensure the examples folder exists
  if (!fs.existsSync('./examples')) {
    fs.mkdirSync('./examples');
  }

  // Write the SVG file with the unique name
  fs.writeFileSync(filePath, svgContent);
  console.log(`Generated ${filePath}`);
}
inquirer.prompt(questions).then(generateLogo);