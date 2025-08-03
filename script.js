let vocabulary = [];
let currentIndex = 0;
let isFlipped = false;

// grab elements
const frontEl = document.getElementById("front");
const backEl = document.getElementById("back");
const audioEl = document.getElementById("audio");

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
  backEl.classList.add("hidden");
  
  if (card.audio) {
    audioEl.src = card.audio;
    audioEl.style.display = "block";
  } else {
    audioEl.style.display = "none";
  }
}

function flipCard() {
  if (!vocabulary.length) return;
  isFlipped = !isFlipped;
  if (isFlipped) {
    backEl.classList.remove("hidden");
  } else {
    backEl.classList.add("hidden");
  }
}

function nextCard() {
  if (!vocabulary.length) return;
  currentIndex = (currentIndex + 1) % vocabulary.length;
  showCard();
}
