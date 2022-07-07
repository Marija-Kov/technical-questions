import {val,
  categories,
  nextQuestion,
  reshuffle,
  remaining,
  question,
  answer,
  showAnswer,
  card,
  setVal
} from "./variables.js";

import {
  initGetCategory,
  randomByCategory,
  asciiConverter,
  showLast,
} from "./helperFunctions.js";


export const getRandomQuestion = async function getRandomQuestion() {
  const response = await fetch("data.json");
  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }
  const data = await response.json();

  let randomQuestion; // Declaring a variable that will take in a random question from the selected category or all of them.
  let len; // This variable will take in the length of the category or the total data length.
  if (val) {
    // This conditional asks if val is defined i.e. if a category was selected and stored in val
    let qCategory = randomByCategory(val, data);
    randomQuestion = await qCategory[
      Math.round(Math.random() * qCategory.length)
    ];
    len = qCategory.length;
    console.log(val, `total: ${qCategory.length}`);
  } else {
    randomQuestion = await data[Math.round(Math.random() * data.length)];
    len = data.length;
  }

  if (localStorage.getItem(`${val}-remaining`) === "0") {
    // This conditional determines what happens when all cards have been picked out: ...
    //nextQuestion.disabled = "true";  // ..'NEXT' button gets disabled
    //nextQuestion.style = "display: none";  // or hidden, too...
    document.querySelector(`#${val}`).style =
      "text-decoration: line-through; background: palegoldenrod; border: palegoldenrod;";
    setTimeout(() => {
      remaining.innerText = `No more ${val.toUpperCase()} cards in this session! Please select different category or press 'RESTART'.`; // and the user is pointed to the 'RESTART' button
      reshuffle.classList.add("blink"); // ...which starts blinking, also.
    }, 1000);
  }

  if (!localStorage.getItem(`${asciiConverter(randomQuestion.q)}`)) {
    // This conditional checks if the randomQuestion is not yet in localStorage...
    localStorage.setItem(
      `${asciiConverter(randomQuestion.q)}`, // ...sets it in localStorage under a unique key,
      randomQuestion.q
    );
    localStorage.setItem("lastQ", `${randomQuestion.q}`); // makes sure the browser remembers the last picked question and answer in case of refreshing / closing and reopening the window.
    localStorage.setItem("lastA", `${randomQuestion.a}`);
    localStorage.setItem("i", `${Number(localStorage.getItem("i")) + 1}`); // stores the new value (increments it by one) under the key 'i' that represents the number of picked cards

    if (localStorage.getItem("category")) {
      // This conditional checks if there is a record of passed questions from a specific category...
      let curr = localStorage.getItem("category");
      localStorage.setItem(
        `${curr}`,
        `${Number(localStorage.getItem(`${curr}`)) + 1}`
      ); // ..if yes, increments it by one..
    } else {
      localStorage.setItem(`${localStorage.getItem("category")}`, 0); // ...if no, starts counting the questions under that category.
    }

    question.innerText = `${randomQuestion.q}`; // ...gets the corresponding question and answer to be displayed on the card,
    answer.setAttribute("style", "height: 0"); // ..makes sure the answer remains hidden until manually revealed;
    answer.innerText = `${randomQuestion.a}`;
    card.style = `background-position-x: ${Math.round(Math.random() * 100)}%`; //
    card.style = `background-position-y: ${Math.round(Math.random() * 100)}%`; // ...This will give the background illusion that the cards are being switched css sprite-style
  } else {
    getRandomQuestion(); // if the item picked by getRandomQuestion is already in the localStorage, run it again. Btw, this whole solution poses an issue/gives errors as with each next call it's taking longer and longer to randomly bump into items not already into localStorage. There is a way around this - by shuffling the array of cards before pulling them one by one start to end, which would get rid of the collision and all collateral issues. It was an interesting challenge doing it the hard, buggy way.
  }

  if (val) {
    let valQuestionsLeft = len - localStorage.getItem(`${val}`);
    remaining.innerText = `${val.toUpperCase()} cards remaining: ${valQuestionsLeft}`;
    localStorage.setItem(`${val}-remaining`, `${valQuestionsLeft}`);
  } else {
    let questionsLeft = len - localStorage.getItem("i"); // Knowing that 'i' represents the number of picked cards, this is self-explanatory.
    remaining.innerText = `Cards remaining: ${questionsLeft}`;
    localStorage.setItem(
      "remaining",
      `${questionsLeft}` // Each time a unique card is picked, the value of 'remaining' in localStorage is updated.
    );
  }
};




// fetch WORKS in the browser console with the live SERVER - I get the data as I wanted it.
//HOWEVER, in the VS integrated terminal, it first requires fetch to be installed (npm init -y ; npm install node-fetch ; add "type":"module" to package.json ; import fetch from "node-fetch" in the js file where fetch is being used -- this works perfectly for online API data, but not for local json file)
//after fetch has been installed and implemented, it throws TypeError [ERR_INVALID_URL]: Invalid URL.....  input: 'data.json', code: 'ERR_INVALID_URL'
//Conclusion: To fetch from a local file and get data not using browser + live server, it would be necessary to set up a local server somehow.
//All of the above commented would be an issue if the app was to be offline. Also, for the purpose of an offline app, the JSON file could be converted to .js
