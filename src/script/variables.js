//All variables are imported as constants (regardless being declared with 'let') and can't be reassigned in another module !

export let showAnswer = document.querySelector(".show-answer");
export let nextQuestion = document.querySelector(".next-random");
export let question = document.querySelector(".question");
export let answer = document.querySelector(".answer");
export let card = document.querySelector(".card");
export let remaining = document.querySelector(".remaining"); // 'Cards remaining: number'
export let reshuffle = document.querySelector(".reshuffle"); // 'START' and 'RESTART' button
export let categories = document.querySelectorAll(".category-selection > button");
export let val; // this variable will take the selected category once initGetCategory() runs
export let setVal = function setVal(value){ // This is a way around reassigning val in other modules, which would throw an error.
    val = value
    return val
}


