//All variables are imported as constants (regardless being declared with 'let') and can't be reassigned in another module !

let showAnswer = document.querySelector(".show-answer");
let nextQuestion = document.querySelector(".next-random");
let question = document.querySelector(".question");
let answer = document.querySelector(".answer");
let card = document.querySelector(".card");
let remaining = document.querySelector(".remaining"); // 'Cards remaining: number'
let reshuffle = document.querySelector(".reshuffle"); // 'START' and 'RESTART' button
let categories = document.querySelectorAll(".category-selection > button");
let val; // this variable will take the selected category once initGetCategory() runs

export { showAnswer, nextQuestion, question, answer, card, remaining, reshuffle, categories, val }

