var input = document.getElementById('input');
var random = Math.floor(Math.random() * words.length);
var wordSplit = words[random].split('');
document.getElementById('0').innerText = wordSplit[0];

function check(){
    var inputWord = input.value;
    var inputArray = inputWord.split('');
    for(i=0;i<wordSplit.length;i++){
        letter = document.getElementById(i);
        letter.innerText = inputArray[i];
        	if(wordSplit.includes(inputArray[i])){
                if(inputArray[i]==wordSplit[i]){
                    letter.style.background = 'red';
                    console.log(i);
                } else {
                    letter.style.backgroundColor = 'yellow';
                    console.log(i)
                }
            } else {
                letter.style.background = 'grey';
            }
    }
}