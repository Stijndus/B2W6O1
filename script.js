var input = document.getElementById('input');
var random = Math.floor(Math.random() * words.length);
var wordSplit = words[random].split('');
var attempt = 0;
var wordCopy = words[random].split('');

for (i = 0; i < wordSplit.length; i++) {
    letter = document.createElement('h2');
    letter.id = i;
    letter.classList.add('letter')
    document.getElementById('letters').appendChild(letter);
    letter.innerText = i + 1;
}

document.getElementById('0').innerText = wordSplit[0];

function check() {
    var inputWord = input.value;
    var inputArray = inputWord.split('');
    attempt = attempt + 1;
    wordCopy = words[random].split('')
    for (i = 0; i < wordSplit.length; i++) {
        let letter = document.getElementById(i);
        letter.innerText = inputArray[i];
        if (wordCopy[i] === inputArray[i]) {
            letter.style.backgroundColor = 'red';
            wordCopy[i] = ''
        } else if (wordCopy.includes(inputArray[i])) {
            wordCopy[wordSplit.indexOf(inputArray[i])] = ''
            letter.style.backgroundColor = 'yellow'
        }
    }
}