
document.body.style = "justify-content: flex-start";

fetch('data.json').then(response => response.json())
   .then(data => showQuestions(data))
   .catch(err => console.log(`There's an error! ${err}`))


   async function showQuestions(data){
       for(let i = 0; i < data.length; ++i){
         let question = document.createElement("p");
         let answer = document.createElement("p");
         question.innerText = `${i+1}. ${data[i].q}`;
         question.style = 'color: rgb(36, 36, 36); font-weight: 900';
         answer.innerText = `${data[i].a}`;
         answer.style = "color: rgb(36, 36, 36)";
         document.body.appendChild(question);
         document.body.appendChild(answer);

       }
   }
