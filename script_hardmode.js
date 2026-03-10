// --------------------
// Paramètres
const TOTAL_CARDS = 62; // change ici si tu rajoutes de nouvelles cartes
const MAX_QUEUE = 3;      // nombre de cartes en mémoire

// Sélecteurs
const card = document.getElementById("card");
const questionImg = document.getElementById("questionImg");
const answerImg = document.getElementById("answerImg");

// Variables
let cards = [];
let deck = [];
let queue = [];
let state = 0;

// --------------------
// Génération automatique des cartes
for(let i = 1; i <= TOTAL_CARDS; i++){
  cards.push({
    q: `hardmode/q${i}.jpg`,
    a: `hardmode/r${i}.jpg`
  });
}

// --------------------
// Mélange Fisher-Yates
function shuffle(array){
  let currentIndex = array.length, randomIndex;
  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// --------------------
// Remplir la file (queue) de MAX_QUEUE cartes
function fillQueue(){
  while(queue.length < MAX_QUEUE && deck.length > 0){
    queue.push(deck.pop());
  }
}

// --------------------
// Charger la carte actuelle
function loadCard(){
  fillQueue();
  if(queue.length === 0) return; // plus de cartes

  let current = queue[0];
  questionImg.src = current.q;
  answerImg.src = current.a;

  card.classList.remove("flip");
  state = 0;
}

// --------------------
// Initialisation
deck = shuffle([...cards]); // copie du tableau original
loadCard();

// --------------------
// Gestion clic flip
card.addEventListener("click", () => {
  if(state === 0){
    card.classList.add("flip"); // voir réponse
    state = 1;
  } else {
    queue.shift(); // carte suivante
    loadCard();
  }
});

