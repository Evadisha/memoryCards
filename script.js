const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current cards
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
let cardsData = getCardsData();

// cardsData = [
//     {
//         question: 'What is a variable?',
//         answer: 'It is a memory location used to hold data and the value can change.'
//     },
//     {
//         question: 'What is a constant?',
//         answer: 'It is an actual values fixed into the source code.'
//     },
//     {
//         question: 'What is a HTML?',
//         answer: 'It is a formatting system for displaying material retrieved over the Internet.'
//     },
//     {
//         question: 'What is a CSS?',
//         answer: 'It describes how HTML elements are to be displayed on screen, paper, or in other media.'
//     },
// ]

// Functions
// 1. Creating all the cards
function createCards() {
    cardsData.forEach((data, index) => { createCard(data, index) });
}

// 2. Creating single card in DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index == 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${data.question}
            </p>
        </div>
        <div class="inner-card-back">
            <p>
                ${data.answer}
            </p>
        </div>
    </div>
    `

    card.addEventListener('click', () => {
        card.classList.toggle('show-answer');
    });

    // Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText(); 
}

// 3. Updating number on the cards
function updateCurrentText() {
    currentEl.innerText = `
            ${currentActiveCard + 1}/${cardsEl.length}
    `;
}

// 4. Get card data from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// 5. Adding cards to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

// Event Listeners
// 1. For next Button on cards
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard += 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
})

// 2. For previous Button on cards
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard -= 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
})

// 3. Showing card addition container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// 4. Hiding card addition container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// 5. Adding new card element
addCardBtn.addEventListener('click', () => {
    console.log('def');
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };
        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

// 6. Clear button for cards
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})


// Init function
createCards();