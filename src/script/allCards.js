// To show all cards with questions and answers on one page:
// 1) fetch data.json
// 2) write a function that will create an element-card for each data.json array item
// 3) write a function that will append 2 child elements to each card that will contain a question and an answer

fetch('data.json').then(response => response.json())
   .then(data => spreadCards(data))
   .catch(err => console.log(`There's an error! ${err}`))



   async function spreadCards(data){
       for(let i = 0; i < data.length; ++i){
         let card = document.createElement('div');
         card.classList.add('card-stack');
         card.setAttribute('style', `z-index: ${i}; position: absolute; top: calc(${i}*10%)`)
         document.body.appendChild(card) 
       }
   }