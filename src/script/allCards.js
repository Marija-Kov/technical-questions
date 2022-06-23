// To show all cards with questions and answers on one page:
// 1) fetch data.json
// 2) write a function that will create an element-card for each data.json array item
// 3) write a function that will append 2 child elements to each card that will contain a question and an answer

fetch('data.json').then(response => response.json())
   .then(data => spreadCards(data))
   .then(topCard) 
   .catch(err => console.log(`There's an error! ${err}`))


   async function spreadCards(data){
       for(let i = 0; i < data.length; ++i){
         let card = document.createElement('div');
         let question = document.createElement("p");
         let answer = document.createElement("p");
         question.innerText = `${data[i].q}`;
         question.style = 'padding: 5%';
         answer.innerText = `${data[i].a}`;
         answer.style = "padding: 5%";
         card.classList.add('card-stack');
         card.setAttribute('style', `z-index: ${i}; position: absolute; top: calc(${i}*10%); background-position-x: ${Math.round(Math.random() * 100)}%`)
         document.body.appendChild(card) 
         card.appendChild(question);
         card.appendChild(answer);

       }
   }

   async function topCard(){
       let cards = document.querySelectorAll('.card-stack');
          cards.forEach(c => { 
               c.addEventListener('click', () => {
                   console.log(getComputedStyle(c))
                   c.style = `z-index: ${cards.length}; position: absolute`
               })
           })
       
   }