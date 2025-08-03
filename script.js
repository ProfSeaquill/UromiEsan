let vocabulary = [];
let currentIndex = 0;
let isFlipped = false;

// grab elements
const frontEl = document.getElementById("front");
const backEl = document.getElementById("back");

// fetch the vocab from JSON
fetch("data/vocabulary.json")
  .then(response => response.json())
  .then(data => {
    vocabulary = data;
    showCard();
  })
  .catch(err => {
    console.error("Error loading vocabulary.json", err);
    frontEl.textContent = "Error loading words";
  });

function showCard() {
  isFlipped = false;
  const card = vocabulary[currentIndex];
  frontEl.textContent = card.esan;
  backEl.textContent = card.english;

  frontEl.style.display = "block";
  backEl.style.display = "none";
}


function flipCard() {
  if (!vocabulary.length) return;
  isFlipped = !isFlipped;

  if (isFlipped) {
    frontEl.style.display = "none";
    backEl.style.display = "block";
  } else {
    frontEl.style.display = "block";
    backEl.style.display = "none";
  }
}

function previousCard() {
  if (!vocabulary.length) return;

  const cardEl = document.getElementById("flashcard");
  cardEl.classList.add("fade-out");

  setTimeout(() => {
    currentIndex = (currentIndex - 1 + vocabulary.length) % vocabulary.length;
    showCard();
    cardEl.classList.remove("fade-out");
    cardEl.classList.add("fade-in");

    setTimeout(() => {
      cardEl.classList.remove("fade-in");
    }, 300);
  }, 300);
}

function nextCard() {
  if (!vocabulary.length) return;

  const cardEl = document.getElementById("flashcard");
  cardEl.classList.add("fade-out");

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % vocabulary.length;
    showCard();
    cardEl.classList.remove("fade-out");
    cardEl.classList.add("fade-in");

    // Remove the class after the transition to allow future transitions
    setTimeout(() => {
      cardEl.classList.remove("fade-in");
    }, 300);
  }, 300);
}

