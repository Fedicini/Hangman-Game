var wordBank = ["ironman", "captainamerica", "thor", "hulk"];
var pictures = ["ironman.jpeg", "Captain-america.jpg", "thor.jpg", "hulk.jpg"];
var index = 10;
var usedLetters = [];
var guessesLeft = 10;
var wordInPlay = "";
var puzzle = document.getElementById("puzzle");
// placeholder displays the "_" and letters guessed correctly
var placeholder = "";
var wins = 0;
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
// generating word
var wordGenerator = function(){
    index = Math.floor(Math.random() * wordBank.length);
    word = wordBank[index];
   placeholder = "";
    for (let i = 0; i < word.length; i++) {
        //console.log("_ "); 
        placeholder = placeholder + "_";
    };
    puzzle.textContent = placeholder;
    //console.log(word);
    wordInPlay = word;
};
reset();
var isKeyAcceptable = function(letter){
for (let l = 0; l < usedLetters.length; l++) {
        if (letter === usedLetters[l]) {
            return false;
        }
        
    }
for(var k = 0; k<alphabet.length ; k++){
        if (letter === alphabet[k]) {
            return true;
        }
    }
    return false;
}
document.onkeyup = function(event){
    // checking if guess is a letter or is a letter that has not been used
    
    if (isKeyAcceptable(event.key)===true) {
        //  var userGuess = event.key;
    //  alert("your guess: " + userGuess);
    //  checking for letters equal to user's guess
     for (let j = 0; j < wordInPlay.length; j++) {
        if (event.key === wordInPlay.charAt(j)) {
           placeholder = placeholder.substring(0,j) + event.key + placeholder.substring(j+1);
           //console.log(placeholder);
           puzzle.textContent = placeholder;
        }
        
    }
    // checking if conditions for either a win or loss have been met
    if(placeholder === wordInPlay || guessesLeft === 1){
        if(placeholder === wordInPlay){
            alert("you win");
            wins++;
            document.querySelector("#win-count").innerHTML = "Wins: " + wins;
            document.querySelector("#image-div").innerHTML = "<img id='image' src='assets/images/" + pictures[index] +"' style= 'height:200px; width: 200px;'>";
        }
        else{
            alert("youLose");
        }
        reset();
    }
    // one less guess if game continues
    // adds used letter to array
    // print used letters to html
    else{
        guessesLeft--;
        document.querySelector("#guess-countdown").innerHTML = "Guesses Left: " + guessesLeft;
        usedLetters.push(event.key);
        //console.log(usedLetters)
        document.querySelector("#guess-list").innerHTML = "";
        for(var m = 0; m<usedLetters.length; m++){
            document.querySelector("#guess-list").innerHTML = document.querySelector("#guess-list").innerHTML + " " + usedLetters[m];
            
            
        }
    }
    }
    else{
        alert("Not a Playable Letter");
    }
};

// resets puzzle after a win or loss
function reset(){
wordGenerator();
guessesLeft = 10;
usedLetters = [];
document.querySelector("#guess-list").innerHTML = "";
document.querySelector("#guess-countdown").innerHTML = "Guesses Left: " + guessesLeft;

}
