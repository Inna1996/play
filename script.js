const container = document.getElementById('container-background'),
  wrapperOfContent = document.querySelector('.wrapper'),
  buttonStart = document.getElementById('button-start'),
  nav = document.getElementById('navi'),
  levelParent = document.querySelector('.level'),
  length = levelParent.children.length,
  levels = document.querySelectorAll('.level__label');

function playGame() {
  wrapperOfContent.classList.add('hide');
  wrapperOfContent.classList.remove('show');
  container.classList.add('container_style');
  let wrapper = document.createElement("div");
  wrapper.classList.add('cardsFeld');
  container.appendChild(wrapper);

  const goToPlay = (num) => {
    function creatFeld(num) {
      for (let i = 0; i < num; i++) {
        let cardswrapper = document.createElement("div");
        cardswrapper.classList.add('card-wrapper');
        wrapper.appendChild(cardswrapper);
        let cardBack = document.createElement("img");
        cardBack.classList.add('looser');
        cardBack.src = './img/looser.png';
        cardswrapper.appendChild(cardBack);
        let cards = document.createElement("img");
        cards.classList.add('cardBack');
        cards.src = './img/backSide.png';
        cardswrapper.appendChild(cards);
      }
    }
    creatFeld(num);
  }

  function startGame() {
    let current = document.querySelector(".level__checked").getAttribute("id");
    let number;
    if (current == 'level-simple') {
      number = 3;
      goToPlay(3);
    } else if (current == 'level-middle') {
      number = 6;
      wrapper.classList.add('cardsFeld_6');
      goToPlay(6);
    } else if (current == 'level-difik') {
      number = 10;
      goToPlay(10);
    }

    const allCards = document.querySelectorAll('.card-wrapper');
    const random = Math.floor(Math.random() * number);
    for (let i = 0; i < number; i++) {
      if (i == random) {
        allCards[i].firstElementChild.src = './img/winner.png';
      }
    }

    function hideGame() {
      wrapper.classList.remove('cardsFeld');
      wrapper.innerHTML = '';
      wrapperOfContent.classList.add('show');
      container.classList.remove('container_style');
      wrapper.classList.remove('cardsFeld_6');
      playGame.remove;
    }

    allCards.forEach(card => {
      card.addEventListener('click', function turnOver() {
        this.classList.add('click');
        allCards.forEach(elem => {
          elem.addEventListener('click', hideGame);
        });
      });
    });
  }
  startGame();
}

function deleteActive() {
  for (let i = 0; i < length; ++i) {
    let current = levelParent.children[i];
    current.classList.remove('level__checked');
  }
}

function showActive(i = 0) {
  levelParent.children[i].classList.add('level__checked');
  levelParent.children[i].classList.remove('hide');

}

showActive();

levelParent.addEventListener('click', function (event) {
  const target = event.target;
  if (target && target.classList.contains('level__label')) {
    levels.forEach((item, i) => {
      if (target == item) {
        deleteActive();
        showActive(i);
      }
    });
  }
});

buttonStart.addEventListener('click', playGame);