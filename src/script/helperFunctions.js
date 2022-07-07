import { categories, val, nextQuestion, reshuffle, remaining, question, answer, showAnswer, card } from './variables.js';

const initGetCategory = function initGetCategory() {
  categories.forEach((c) => {
    c.addEventListener("click", () => {
      val = c.getAttribute("id");
      localStorage.setItem("category", `${val}`);
      localStorage.setItem("i", "0");
      c.style.background = "yellow";
      remaining.innerText = `${val.toUpperCase()} cards remaining: ${localStorage.getItem(
        `${val}-remaining`
      )}`;
      if (localStorage.getItem(`${val}-remaining`) === null) {
        remaining.innerText = `${val.toUpperCase()} selected`;
      }
      nextQuestion.innerText = `NEXT RANDOM ${val.toUpperCase()} QUESTION`;
      reshuffle.classList.remove("blink");
      categories.forEach((cat) => {
        if (cat !== c && cat.style.background != "palegoldenrod") {
          cat.style.background = "transparent";
        }
      });
      return val;
    });
  });
}

const randomByCategory = function randomByCategory(category, data) {
  let qsByCategory = [];
  for (let i = 0; i < data.length; ++i) {
    if (data[i].category === category) {
      qsByCategory.push(data[i]);
    }
  }
  return qsByCategory;
}

const asciiConverter = function asciiConverter(string) {
  // I used this function to create an unique key for each question at the time it's randomly picked.
  for (let i = 0; i < string.length; ++i) {
    return string
      .split("")
      .map((letter) => letter.charCodeAt(i))
      .join("");
  }
}

const showLast = function showLast() {
  // This function ensures that....
  question.innerText = `${localStorage.getItem("lastQ")}`; // the question shown is the last random unique question from the localStorage,
  answer.innerText = `${localStorage.getItem("lastA")}`; // ...the answer shown is the corresponding answer to it,
  showAnswer.style.visibility = "visible"; // ...that both buttons on the card remain visible,
  nextQuestion.style.visibility = "visible";
  nextQuestion.innerText = `NEXT RANDOM ${val.toUpperCase()} QUESTION`;
  document.querySelector(
    `#${localStorage.getItem("category")}`
  ).style.background = "yellow"; // ...the category stays highlighted,
  categories.forEach((c) => {
    if (localStorage.getItem(`${c.getAttribute("id")}-remaining`) === "0") {
      c.style =
        "background: palegoldenrod; text-decoration: line-through; border: palegoldenrod;";
    }
  });
  reshuffle.innerText = "restart"; // ...that 'RESTART' is shown
  if (val) {
    remaining.innerText = `${val.toUpperCase()} cards remaining: ${localStorage.getItem(
      `${val}-remaining`
    )}`;
  } else {
    remaining.innerText = `Cards remaining: ${localStorage.getItem(
      "remaining"
    )}`;
  } // ... that the remaining amount of cards is the last remaining amount of cards/questions stored and
  reshuffle.classList.remove("blink"); // ...that the 'RESTART' button doesn't start blinking.
}
export { initGetCategory, randomByCategory, asciiConverter, showLast } ;