const app = document.querySelector(".app");
let score = 0;
const scoreDisplayer = document.getElementById("score");
const pipeContainer = document.querySelector(".pipe-container");

const bird = {
  element: document.querySelector(".bird"),
  y: 70,
  x: 10,
  alive: true,
};

const windowListenerFunction = ({ code }) => {
  if (code === "Space") {
    bird.y -= 8;
    bird.element.style.top = `${bird.y}% `;
  }
};

const stopGame = () => {
  bird.alive = false;
  alert(`Vous avez perdu votre score est de ${score}`);
  clearInterval(pipeCretationIntervall);
  clearInterval(fallInterval);
  pipeContainer.innerHTML = "";
  score--;
};

const createElement = (type, parent, className) => {
  const element = document.createElement(type);
  element.className = className;
  parent.appendChild(element);
  return element;
};

const pipeMovement = (pipe) => {
  if (bird.alive) {
    pipe.x += 1;
    pipe.element.style.right = `${pipe.x}%`;
    if (pipe.x == 85 - bird.x) {
      if (bird.y > 60) {
        stopGame();
      }
      score++;
      scoreDisplayer.textContent = `${score}`;
    }
    if (pipe.x > 100 && bird.alive) {
      pipeContainer.removeChild(pipe.element);
      return;
    }
    setTimeout(() => {
      pipeMovement(pipe);
    }, 50);
  }
};

const createPipe = () => {
  return {
    element: createElement("div", pipeContainer, "pipe"),
    x: -5,
    y: 0,
  };
};

const fall = () => {
  if (bird.alive) {
    bird.y += 2;
    bird.element.style.top = `${bird.y}% `;
    if (bird.y > 94) {
      bird.alive = false;
    }
    return;
  }
  stopGame();
};

const pipeCretationIntervall = setInterval(() => {
  const pipe = createPipe();
  pipeMovement(pipe);
}, 2000);
const fallInterval = setInterval(fall, 75);

window.addEventListener("keyup", windowListenerFunction);
