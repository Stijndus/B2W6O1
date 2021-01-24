var input = document.getElementById('input');
var random = Math.floor(Math.random() * words.length);
var goed = new Audio('audio/goed.mp3');
var fout = new Audio('audio/fout.mp3');
var half = new Audio('audio/half.mp3');
var loss = new Audio('audio/loss.mp3');
var win = false;
var wordSplit;
var attempt;
var wordCopy;
var goodArray;
input.addEventListener('input', function (a) {
    onchange(a);
})

reset(words[random]);

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

function onchange() {
    console.log(input.value)
    var inputWord = input.value;
    var inputArray = inputWord.split('');
    for (i = 0; i < wordSplit.length; i++) {
        let id = `w${attempt}l${i}`;
        let letter = document.getElementById(id);
        if (inputArray.length > i) {
            letter.innerText = inputArray[i];
        } else {
            letter.innerText = '.';
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
                letter.innerText = '.';
            }
        }
    }
}

function checkWord(word) {
    var inputWord = word;
    var colors = new Array(wordSplit.length);
    var inputArray = inputWord.split('');
    wordCopy = words[random].split('');
    if (attempt < 4) {
        for (i = 0; i < wordSplit.length; i++) {
            colors[i] = 0;
            if (wordCopy[i] === inputArray[i]) {
                colors[i] = 2;
                wordCopy[i] = '';
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
            }, i * 300)
        })
        setTimeout(function () {
            if (goodArray.every(element => element === true) && attempt < 5) {
                alert('You won!');
                location.reload();
            }
            if (colors.includes(1) || colors.includes(0)) {
                attempt++;
                initRow();
            }
            input.value = '';
        }, 1500)
    } else {
        loss.play();
        alert('Dat waren te veel pogingen');
        location.reload();
    }
    
}

function colorLetter(colors, i, attempts) {
    let id = `w${attempts}l${i}`;
    let letter = document.getElementById(id);
    let colorClass;
    switch (colors[i]) {
        case 1:
            colorClass = 'almostColor';
            half.play();
            break;
        case 2:
            colorClass = 'goodColor';
            goed.play();
            break;
        default:
            colorClass = 'wrongColor';
            fout.play()
    }
    letter.classList.remove('goodColor', 'almostColor', 'wrongColor');
    letter.classList.add(colorClass);
}