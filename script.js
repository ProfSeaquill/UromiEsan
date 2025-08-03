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
  frontEl.textContent = card.word;
  backEl.textContent = card.translation;
  backEl.classList.add("hidden");
  
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

function nextCard() {
  if (!vocabulary.length) return;
  currentIndex = (currentIndex + 1) % vocabulary.length;
  showCard();
}
