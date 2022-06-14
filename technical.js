import fetch from "node-fetch";

let url = 'data.json'; //this is somehow invalid ! WHY ?

async function getRandomQuestion() {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
  

}

getRandomQuestion();
