var input = document.getElementById('input');
var random = Math.floor(Math.random() * words.length);
var wordSplit;
var attempt;
var wordCopy;
var goodArray;
input.addEventListener('input', function (a) {
    onchange(a)
})

reset('rapen');

function check() {
    checkWord(input.value);
}


function reset(word) {
    wordSplit = word.split('');
    wordCopy = word.split('');
    attempt = 0;
    goodArray = new Array(word.length).fill(false);
    initRow();
}

function onchange(val) {
    console.log(input.value)
    var inputWord = input.value;
    var inputArray = inputWord.split('');
    for (i = 0; i < wordSplit.length; i++) {
        let id = `w${attempt}l${i}`;
        let letter = document.getElementById(id);
        if (inputArray.length > i) {
            letter.innerText = inputArray[i];
        } else {
            letter.innerText = '.'
        }
    }
}

function initRow() {
    for (i = 0; i < wordSplit.length; i++) {
        letter = document.createElement('h2');
        letter.id = `w${attempt}l${i}`;
        letter.classList.add('letter')
        document.getElementById('letters').appendChild(letter);
        if (i === 0) {
            letter.innerText = wordSplit[0];
        } else {
            if (goodArray[i]) {
                letter.innerText = wordSplit[i];
            } else {
                letter.innerText = '.'
            }
        }
    }
}


function checkWord(word) {
    var inputWord = word;
    var colors = new Array(wordSplit.length);

    var inputArray = inputWord.split('');
    wordCopy = 'rapen'.split('')
    for (i = 0; i < wordSplit.length; i++) {
        colors[i] = 0;
        let id = `w${attempt}l${i}`;
        let letter = document.getElementById(id);
        if (wordCopy[i] === inputArray[i]) {
            colors[i] = 2;
            wordCopy[i] = ''
            goodArray[i] = true;
        }
    }
    for (i = 0; i < wordSplit.length; i++) {
        if (wordCopy.includes(inputArray[i])) {
            wordCopy[wordSplit.indexOf(inputArray[i])] = ''
            colors[i] = 1;
        }
    }
    colors.forEach((v, i, a) => {
        console.log(v, i, a);
        setTimeout(function () {
            colorLetter(a, i, attempt);
        }, i * 500)
    })

    setTimeout(function () {
        if (colors.includes(1) || colors.includes(0)) {
            attempt++;
            initRow();
        }
        input.value = '';
    }, 3000)
}

function colorLetter(colors, i, attempts) {
    let id = `w${attempts}l${i}`;

    let letter = document.getElementById(id);
    let colorClass;
    switch (colors[i]) {
        case 1:
            colorClass = 'goodColor'
            break;
        case 2:
            colorClass = 'allmostColor'
            break;
        default:
            colorClass = 'wrongColor'
    }
    letter.classList.remove('goodColor', 'allmostColor', 'wrongColor');
    letter.classList.add(colorClass);
    
}