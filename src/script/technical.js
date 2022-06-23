const showAnswer = document.querySelector('.show-answer');
const nextQuestion = document.querySelector(".next-random");
const question = document.querySelector(".question");
const answer = document.querySelector(".answer");
const card = document.querySelector(".card");
const remaining = document.querySelector(".remaining"); // 'Cards remaining: number'
const reshuffle = document.querySelector(".reshuffle"); // 'START' and 'RESTART' button

if(!localStorage.getItem('i')) // 'i' represents the number of randomly picked unique questions at and will be subtracted from data.length with every getRandomCard() call to calculate the remaining number of cards/questions. It will be set to 0 only if item 'i' isn't in the localStorage yet, i.e. only before the 'START' button is clicked.
{
  localStorage.setItem('i', '0') 
}


if (localStorage.length > 1) {  // This condition makes sure that the practice session doesn't restart on refresh. It's '> 1' not '> 0' because there will always be at least one item ('i') in the localStorage.
 showLast()  // This function can be found under '///////Helper functions' below.
}

reshuffle.addEventListener('click', ()=> {   
if(reshuffle.innerText.toLowerCase() === 'start') {  // This 'then' block makes sure that, when 'START' is clicked,...   
  showAnswer.style.visibility = "visible";  // buttons on the card become visible,
  nextQuestion.style.visibility = "visible"; 
  reshuffle.innerText = 'restart';  //...'START' changes into 'RESTART',
  reshuffle.classList.remove('blink'); // ...the blinking blinkation stops...
  getRandomQuestion(); //...and the first random question is shown.
} else { // This 'else' block makes sure that, when 'RESTART' is clicked,...
  localStorage.clear();  // localStorage is cleared and
  window.location.reload(); // ...the page is reloaded.

}

})

nextQuestion.addEventListener('click', getRandomQuestion); // Pretty obvious what this does.
showAnswer.addEventListener('click', () => {
  answer.setAttribute('style', "height: fit-content"); // Answer is revealed by setting height to the element.
})

async function getRandomQuestion() {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
   
    const randomQuestion = await data[Math.round(Math.random()*data.length)];

    if (remaining.innerText === 'Cards remaining: 0') { // This conditional determines what happens when all cards have been picked out: ...
      nextQuestion.disabled = "true";  // ..'NEXT' button gets disabled
      //nextQuestion.style = "display: none";  // or hidden, too...
      setTimeout(() => {
      remaining.innerText = "No more cards! Press 'RESTART' to practice again.";  // and the user is pointed to the 'RESTART' button
      reshuffle.classList.add('blink'); // ...which starts blinking, also.
      }, 1000) 
    }

    if (!localStorage.getItem(`${asciiConverter(randomQuestion.q)}`)) { // This conditional checks if the randomQuestion is not yet in localStorage...
      localStorage.setItem(  
        `${asciiConverter(randomQuestion.q)}`,  // ...sets it in localStorage under a unique key,
        randomQuestion.q
      );
      localStorage.setItem('lastQ', `${randomQuestion.q}`); // makes sure the browser remembers the last picked question and answer in case of refreshing / closing and reopening the window.
      localStorage.setItem("lastA", `${randomQuestion.a}`);
      localStorage.setItem("i", `${(Number(localStorage.getItem('i')) + 1)}`);  // stores the new value (increments it by one) under the key 'i' that represents the number of picked cards 

    question.innerText = `${randomQuestion.q}`; // ...gets the corresponding question and answer to be displayed on the card,
    answer.setAttribute('style', "height: 0");  // ..makes sure the answer remains hidden until manually revealed;
    answer.innerText = `${randomQuestion.a}`;
    card.style =`background-position-x: ${Math.round(Math.random() * 100)}%`; //
    card.style = `background-position-y: ${Math.round(Math.random() * 100)}%`; // ...This will give the background illusion that the cards are being switched css sprite-style
  } else {
    getRandomQuestion()  // if the item picked by getRandomQuestion is already in the localStorage, run it again. Btw, this whole solution poses an issue/gives errors as with each next call it's taking longer and longer to randomly bump into items not already into localStorage. There is a way around this - by shuffling the array of cards before pulling them one by one start to end, which would get rid of the collision and all collateral issues. It was an interesting challenge doing it the hard, buggy way. 
  }
   let questionsLeft = data.length - localStorage.getItem('i'); // Knowing that 'i' represents the number of picked cards, this is self-explanatory.
    remaining.innerText = `Cards remaining: ${questionsLeft}`; 
    localStorage.setItem(
      "remaining",
      `${questionsLeft}` // Each time a unique card is picked, the value of 'remaining' in localStorage is updated.
    );
}



//////////// Helper functions below: 


function asciiConverter(string) {  // I used this function to create an unique key for each question at the time it's randomly picked. 
  for (let i = 0; i < string.length; ++i){
  return string.split("").map(letter => letter.charCodeAt(i)).join(''); 
  }
}

function showLast() {  // This function ensures that....
  question.innerText = `${localStorage.getItem('lastQ')}`; // the question shown is the last random unique question from the localStorage,
  answer.innerText = `${localStorage.getItem('lastA')}`;  // ...the answer shown is the corresponding answer to it,
   showAnswer.style.visibility = "visible";  // ...that both buttons on the card remain visible,
   nextQuestion.style.visibility = "visible";
   reshuffle.innerText = "restart";  // ...that 'RESTART' is shown
   remaining.innerText = `Cards remaining: ${localStorage.getItem(
     "remaining"
   )}`; // ... that the remaining amount of cards is the last remaining amount of cards/questions stored and 
   reshuffle.classList.remove('blink'); // ...that the 'RESTART' button doesn't start blinking.
}



// fetch WORKS in the browser console with the live SERVER - I get the data as I wanted it. 
//HOWEVER, in the VS integrated terminal, it first requires fetch to be installed (npm init -y ; npm install node-fetch ; add "type":"module" to package.json ; import fetch from "node-fetch" in the js file where fetch is being used -- this works perfectly for online API data, but not for local json file)
//after fetch has been installed and implemented, it throws TypeError [ERR_INVALID_URL]: Invalid URL.....  input: 'data.json', code: 'ERR_INVALID_URL'
//Conclusion: To fetch from a local file and get data not using browser + live server, it would be necessary to set up a local server somehow. 
//All of the above commented would be an issue if the app was to be offline. Also, for the purpose of an offline app, the JSON file could be converted to .js
