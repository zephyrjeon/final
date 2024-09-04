/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener('DOMContentLoaded', () => {
  // Array of colors for background change
  const colors = [
    '#F0E68C',
    '#FFDAB9',
    '#FFE4B5',
    '#D8BFD8',
    '#B0E0E6',
    '#AFEEEE',
    '#E0FFFF',
    '#98FB98',
    '#FFDEAD',
    '#F5DEB3',
  ];

  let index = 0;

  // Function to change background color with a gradient effect
  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length; // Loop back to the start
  };

  // Change color every 2 seconds with a smooth transition
  setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById('enter');
let askButton = document.getElementById('ask');
let input = document.getElementById('userInput');
let ul = document.querySelector('ul');
let item = document.getElementsByTagName('li');
let tasks = [];

function inputLength() {
  return input.value.length;
}

function listLength() {
  return item.length;
}

function createListElement(value) {
  if (tasks.find((task) => task === value)) {
    window.alert('Already exist');
    return;
  }

  let li = document.createElement('li'); // creates an element "li"
  li.appendChild(document.createTextNode(value)); //makes text from input field the li text
  ul.appendChild(li); //adds li to ul
  tasks.push(value);
  input.value = ''; //Reset text input field

  //START STRIKETHROUGH
  // because it's in the function, it only adds it for new items
  function crossOut() {
    li.classList.toggle('done');
  }

  li.addEventListener('click', crossOut);
  //END STRIKETHROUGH

  // START ADD DELETE BUTTON
  let dBtn = document.createElement('button');
  dBtn.appendChild(document.createTextNode('X'));
  dBtn.addEventListener('click', () => {
    tasks = tasks.filter((task) => task !== value);
    li.remove();
  });
  li.appendChild(dBtn);
}

function addListAfterClick() {
  if (inputLength() > 0) {
    //makes sure that an empty input field doesn't create a li
    createListElement(input.value);
  }
}

function addListAfterAsk() {
  do {
    const input = window.prompt('Type a pending task');

    if (!input) {
      window.alert('Invalid input. Please try again.');
      continue;
    }

    createListElement(input);
    break;
  } while (true);
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === 13) {
    //this now looks to see if you hit "enter"/"return"
    //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
    createListElement(input.value);
  }
}

enterButton.addEventListener('click', addListAfterClick);
askButton.addEventListener('click', addListAfterAsk);

input.addEventListener('keypress', addListAfterKeypress);
