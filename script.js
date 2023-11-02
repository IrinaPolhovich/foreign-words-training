const flipCard = document.querySelector('.flip-card');
const buttonBack = document.querySelector('#back');
const buttonNext = document.querySelector('#next');
const buttonExam = document.querySelector('#exam');
const examCards = document.querySelector("#exam-cards");
let currentWord = document.querySelector('#current-word');
let totalWord = document.querySelector('#total-word');
let frontCard = document.querySelector('.flip-card-front h1');
let backCard = document.querySelector('.flip-card-back h1');
let backExample = document.querySelector('.flip-card-back span');
let i = 1;

const words = [{
        english: 'wardrobe',
        translate: 'гардероб',
        example: 'a wardrobe assistant',
    },
    {
        english: 'respect',
        translate: 'уважать',
        example: 'she was respected by everyone she worked with',
    },
    {
        english: 'thoughtfulness',
        translate: 'задумчивость',
        example: 'his face became strange with thoughtfulness',
    },
    {
        english: 'judgment',
        translate: 'суждение',
        example: 'an error of judgment',
    },
    {
        english: 'temptation',
        translate: 'искушение',
        example: 'he resisted the temptation to call Celia',
    }
];


flipCard.addEventListener('click', function() {
    flipCard.classList.toggle('active');
});

function showWords() {
    frontCard.textContent = (words[i - 1]['english']);
    backCard.textContent = (words[i - 1]['translate']);
    backExample.textContent = (words[i - 1]['example']);
};
showWords();

currentWord.value = 1;
totalWord = words.length;

buttonNext.addEventListener('click', function() {
    currentWord.textContent = ++i;
    if (i === totalWord) {
        buttonNext.disabled = true;
    }
    flipCard.classList.remove('active');
    buttonBack.disabled = false;
    showWords();
});

buttonBack.addEventListener('click', function() {
    currentWord.textContent = --i;
    if (i === totalWord) {
        buttonBack.disabled = false;
    } else if (i === 1) {
        buttonBack.disabled = true;
    }
    buttonNext.disabled = false;
    flipCard.classList.remove('active');
    showWords();
});

function showExamCard() {
    const fragment = new DocumentFragment();
    for (let i = 0; i < words.length; i++) {
        const englishElement = document.createElement('div');
        englishElement.classList.add('card');
        englishElement.textContent = words[i].english;
        examCards.append(englishElement);

        const translateElement = document.createElement('div');
        translateElement.classList.add('card');
        translateElement.textContent = words[i].translate;
        examCards.append(translateElement);
    }
    document.body.append(fragment);
};

function getRandom(max) {
    return Math.floor(Math.random() * max);
};

buttonExam.addEventListener("click", () => {
    flipCard.hidden = true;
    document.querySelector("#exam-mode").classList.remove("hidden");
    document.querySelector("#study-mode").hidden = true;
    document.querySelector(".slider-controls").hidden = true;
    showExamCard();
    const cards = document.querySelectorAll("#exam-cards div");
    cards.forEach(card => {
        card.style.order = getRandom(cards.length);
    });
})

const allWords = {
    wardrobe: 'гардероб',
    thoughtfulness: 'задумчивость',
    respect: 'уважать',
    judgment: 'суждение',
    temptation: 'искушение',
};

const wordsAmount = Object.keys(allWords).length;
let firstWord;
let secondWord;
let click = true;
let amount = 0;

examCards.addEventListener('click', function(event) {
    const target = event.target;
    if (click) {
        click = false;
        firstWord = target;
        firstWord.classList.add('correct');
    } else {
        secondWord = target;
        if (allWords[firstWord.textContent] === secondWord.textContent || allWords[secondWord.textContent] === firstWord.textContent) {
            secondWord.classList.add('correct');
            firstWord.classList.add('fade-out');
            secondWord.classList.add('fade-out');
            amount++;
            setTimeout(() => {
                if (amount === wordsAmount) {
                    alert('Замечательно! Ты справилась!');
                }
            }, 200);
        } else {
            secondWord.classList.add('wrong');
            setTimeout(() => {
                firstWord.classList.remove('correct');
                secondWord.classList.remove('wrong');
            }, 500)
        }
        click = true;
    }
});