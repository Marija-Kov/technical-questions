//it should be ensured that a random card does not get drawn twice until the end of the deck
const showAnswer = document.querySelector('.show-answer');
const nextQuestion = document.querySelector(".next-random");
const question = document.querySelector(".question");
const answer = document.querySelector(".answer");
const card = document.querySelector(".card");
const remaining = document.querySelector(".remaining");
const reshuffle = document.querySelector(".reshuffle");

if(!localStorage.getItem('i')) 
{
  localStorage.setItem('i', '0') 
}



if (localStorage.length > 1) {
 showLast()
}

reshuffle.addEventListener('click', ()=> {
if(reshuffle.innerText.toLowerCase() === 'start') {
  showAnswer.style.visibility = "visible";
  nextQuestion.style.visibility = "visible";
  reshuffle.innerText = 'restart';
  reshuffle.classList.remove('anim');
  getRandomQuestion();
} else {
  localStorage.clear();
  window.location.reload();

}

})

nextQuestion.addEventListener('click', getRandomQuestion);
showAnswer.addEventListener('click', () => {
  answer.setAttribute('style', "height: fit-content");
})

async function getRandomQuestion() {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
    let questionsLeft = data.length - 1 - localStorage.getItem('i');
    remaining.innerText = `Cards remaining: ${questionsLeft}`;
    localStorage.setItem(
      "remaining",
      `${questionsLeft}`
    );
    const randomQuestion = await data[Math.round(Math.random()*data.length)];
    if (remaining.innerText === 'Cards remaining: 0') {
      nextQuestion.disabled = "true";  
      nextQuestion.style = "display: none";
      setTimeout(() => {
      remaining.innerText = "No more cards! Press 'RESTART' to practice again.";
      reshuffle.classList.add('anim');
      }, 1000) 
    }

    if (!localStorage.getItem(`${asciiConverter(randomQuestion.q)}`)) {
      
      localStorage.setItem(
        `${asciiConverter(randomQuestion.q)}`,
        randomQuestion.q
      );
      localStorage.setItem('lastQ', `${randomQuestion.q}`);
      localStorage.setItem("lastA", `${randomQuestion.a}`);
      localStorage.setItem("i", `${(Number(localStorage.getItem('i')) + 1)}`);
    // console.log(
    //   `Item: ${randomQuestion.q} - number: ${asciiConverter(
    //     localStorage.getItem(`${asciiConverter(randomQuestion.q)}`)
    //   )} - is now inside local storage.`
    // );
    question.innerText = `${randomQuestion.q}`;
    answer.setAttribute('style', "height: 0");
    answer.innerText = `${randomQuestion.a}`;
    card.style =`background-position-x: ${Math.round(Math.random() * 100)}%`; //
    card.style = `background-position-y: ${Math.round(Math.random() * 100)}%`; // this will give the illusion as if the cards are being switched css sprite-style
  } else {
    getRandomQuestion()  // if the item picked by getRandomQuestion is already in the localStorage, run it again. This solution poses an issue/gives errors as with each next call it's taking longer and longer to randomly bump into items not already into localStorage.
  }
}



// helper functions below: 


function asciiConverter(string) {
  for (let i = 0; i < string.length; ++i){
  return string.split("").map(letter => letter.charCodeAt(i)).join(''); 
  }
}

function showLast() {
  question.innerText = `${localStorage.getItem('lastQ')}`;
  answer.innerText = `${localStorage.getItem('lastA')}`;
   showAnswer.style.visibility = "visible";
   nextQuestion.style.visibility = "visible";
   reshuffle.innerText = "restart";
   remaining.innerText = `Cards remaining: ${localStorage.getItem(
     "remaining"
   )}`;
   reshuffle.classList.remove('anim');
}



// fetch WORKS in the browser console with the live SERVER - I get the data as I wanted it. 
//HOWEVER, in the VS integrated terminal, it first requires fetch to be installed (npm init -y ; npm install node-fetch ; add "type":"module" to package.json ; import fetch from "node-fetch" in the js file where fetch is being used -- this works perfectly for online API data, but not for local json file)
//after fetch has been installed and implemented, it throws TypeError [ERR_INVALID_URL]: Invalid URL.....  input: 'data.json', code: 'ERR_INVALID_URL'
//Conclusion: To fetch from a local file and get data not using browser + live server, it would be necessary to set up a local server somehow. 
//All of the above commented would be an issue if the app was to be offline. Also, for the purpose of an offline app, the JSON file could be converted to .js
