const container = document.getElementById('container-background');
const wrapperOfContent = document.querySelector('.wrapper');
const buttonStart = document.getElementById('button-start');
const nav = document.getElementById('navi');
const levelParent = document.querySelector('.level');
const length = levelParent.children.length;
const level = {
  sipmle: document.getElementById('level-easy'),
  normal: document.getElementById('level-normal'),
  hard: document.getElementById('level-hard'),
};
const levels = document.querySelectorAll('.level__label');

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
  let attrib;

  function startGame() {
    if (level.sipmle.checked) {
      attrib = level.sipmle.getAttribute('data-ratio');
      // level.normal = false;
      // level.hard = false;
      goToPlay(attrib);
    } else if (level.normal.checked) {
      attrib = level.normal.getAttribute('data-ratio');
      // level.sipmle = false;
      // level.hard = false;
      wrapper.classList.add('cardsFeld_6');
      goToPlay(attrib);
    } else if (level.hard.checked) {
      attrib = level.hard.getAttribute('data-ratio');
      // level.sipmle = false;
      // level.normal = false;
      goToPlay(attrib);
    } else if (!level.sipmle.checked && !level.normal.checked && !level.hard.checked) {
      attrib = level.sipmle.getAttribute('data-ratio');
      // level.normal = false;
      // level.hard = false;
      goToPlay(attrib);
    }


    const allCards = document.querySelectorAll('.card-wrapper');
    const random = Math.floor(Math.random() * attrib);
    for (let i = 0; i < attrib; i++) {
      if (i == random) {
        allCards[i].firstElementChild.src = './img/winner.png';
      }
    }

    function hideGame() {
      wrapper.classList.remove('cardsFeld');
      wrapper.innerHTML = '';
      wrapperOfContent.classList.add('show');
      container.classList.remove('container_style');
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