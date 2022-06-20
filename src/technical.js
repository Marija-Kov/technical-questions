//the app should get a random question
//the user should be able to pick the category from which the question is drawn (general CS, javascript, css, html, web), or get a random question without a category specified
//GETTING A RANDOM QUESTION OUT OF A RANDOM CATEGORY
//the user should be able to put aside the questions that they don't want to come up again 
let showAnswer = document.querySelector('.show-answer');
let nextQuestion = document.querySelector(".next-random");
let question = document.querySelector(".question");
let answer = document.querySelector(".answer");

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
    const randomQuestion = await data[Math.round(Math.random()*96)];
    localStorage.setItem("deck", randomQuestion.q);
    console.log(localStorage.getItem('deck'));
    question.innerText = `${randomQuestion.q}`;
    answer.setAttribute('style', "height: 0");
    answer.innerText = `${randomQuestion.a}`;
  
}

getRandomQuestion(); 


// function asciiConverter(string) {
//   for (let i = 0; i < string.length; ++i){
//   return string.split("").map(letter => letter.charCodeAt(i));
//   }
// }
// //console.log(asciiConverter("buzz"))


// fetch WORKS in the browser console with the live SERVER - I get the data as I wanted it. 
//HOWEVER, in the VS integrated terminal, it first requires fetch to be installed (npm init -y ; npm install node-fetch ; add "type":"module" to package.json ; import fetch from "node-fetch" in the js file where fetch is being used -- this works perfectly for online API data, but not for local json file)
//after fetch has been installed and implemented, it throws TypeError [ERR_INVALID_URL]: Invalid URL.....  input: 'data.json', code: 'ERR_INVALID_URL'
//Conclusion: To fetch from a local file and get data not using browser + live server, it would be necessary to set up a local server somehow. 
//All of the above commented would be an issue if the app was to be offline. Also, for the purpose of an offline app, the JSON file could be converted to .js
