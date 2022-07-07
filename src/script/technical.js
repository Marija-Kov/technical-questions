import { categories, val, nextQuestion, reshuffle, remaining, question, answer, showAnswer } from "./variables.js";
import { initGetCategory, randomByCategory, asciiConverter, showLast } from "./helperFunctions.js";
import { getRandomQuestion } from "./getRandomQuestion.js";

initGetCategory();

if (!localStorage.getItem("i")) {
  // 'i' represents the number of randomly picked unique questions at and will be subtracted from data.length with every getRandomCard() call to calculate the remaining number of cards/questions. It will be set to 0 only if item 'i' isn't in the localStorage yet, i.e. only before the 'START' button is clicked.
  localStorage.setItem("i", "0"); // Val would be implicitly set to undefined here, so...
} else {
  val = localStorage.getItem("category"); // ...this makes sure that getRandomQuestion preserves the reference to the selected category after refresh and keeps drawing questions from that category.
}

if (localStorage.length > 1) {
  // This condition makes sure that the session doesn't restart on refresh. It's '> 1' not '> 0' because there will always be at least one item ('i') in the localStorage.
  showLast(); // This function can be found under '///////Helper functions' below.
}

reshuffle.addEventListener("click", () => {
  if (reshuffle.innerText.toLowerCase() === "start") {
    // This conditional makes sure that, when 'START' is clicked,...
    showAnswer.style.visibility = "visible"; // buttons on the card become visible,
    nextQuestion.style.visibility = "visible";
    reshuffle.innerText = "restart"; //...'START' changes into 'RESTART',
    reshuffle.classList.remove("blink"); // ...the blinking animation stops...
    getRandomQuestion(); //...and the first random question is shown.
  } else {
    // This 'else' block makes sure that, when 'RESTART' is clicked,...
    localStorage.clear(); // localStorage is cleared and
    window.location.reload(); // ...the page is reloaded.
  }
});

nextQuestion.addEventListener("click", getRandomQuestion); // Pretty obvious what this does.
showAnswer.addEventListener("click", () => {
  answer.setAttribute("style", "height: fit-content"); // Answer is revealed by setting height to the element.
});

// fetch WORKS in the browser console with the live SERVER - I get the data as I wanted it.
//HOWEVER, in the VS integrated terminal, it first requires fetch to be installed (npm init -y ; npm install node-fetch ; add "type":"module" to package.json ; import fetch from "node-fetch" in the js file where fetch is being used -- this works perfectly for online API data, but not for local json file)
//after fetch has been installed and implemented, it throws TypeError [ERR_INVALID_URL]: Invalid URL.....  input: 'data.json', code: 'ERR_INVALID_URL'
//Conclusion: To fetch from a local file and get data not using browser + live server, it would be necessary to set up a local server somehow.
//All of the above commented would be an issue if the app was to be offline. Also, for the purpose of an offline app, the JSON file could be converted to .js
