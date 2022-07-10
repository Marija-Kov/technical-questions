import { val, categories, nextQuestion, reshuffle, remaining, question, answer, showAnswer, setVal } from "./variables.js";
import { initGetCategory, randomByCategory, asciiConverter, showLast } from "./helperFunctions.js";
import { getRandomQuestion } from "./getRandomQuestion.js";



initGetCategory();

if (!localStorage.getItem("i")) {
  // 'i' represents the number of randomly picked unique questions at and will be subtracted from data.length with every getRandomCard() call to calculate the remaining number of cards/questions. It will be set to 0 only if item 'i' isn't in the localStorage yet, i.e. only before the 'START' button is clicked.
  localStorage.setItem("i", "0"); // Val would be implicitly set to undefined here, so...
} else {
  let ctg = localStorage.getItem("category");
  setVal(ctg) // ...this makes sure that getRandomQuestion preserves the reference to the selected category after refresh and keeps drawing questions from that category.
}

if (localStorage.length > 1) {
  // This condition makes sure that the session doesn't restart on refresh. It's '> 1' not '> 0' because there will always be at least one item ('i') in the localStorage.
  showLast(); // This function can be found in helperFunctions.js
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

nextQuestion.addEventListener("click", getRandomQuestion); // Pretty obvious what this does.. getRandomQuestion is in the module of the same name.
showAnswer.addEventListener("click", () => {
  answer.setAttribute("style", "height: fit-content"); // Answer is revealed by setting height to the element.
});



