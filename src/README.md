# Technical Questions Flashcard app
 
- A learning app that I started developing as a personal learning tool.
- Created using HTML, CSS and JavaScript.

## What does it do?

It allows the user to pick a random question from one or all categories combined. The user may see the answer if they want to, they can switch categories and see the number of cards left in each and is signalled when a category runs out of questions. The progress is preserved on reload. Restarting is possible st any point. 
## File structure

 - Two html pages :
    - src/technical.html for flashcard mode
    - src/all-cards.html that shows the list of all questions with answers;

 - src/script/technical.js + several modules. All code is explained in detail in comments.

 - src/sass/technical.scss + partials contain all style rules;
 
 - src/data.json;
   Each JSON object contains: 

      {
        "q": "question",
        "a": "answer",
        "ex": "example",
        "category": "cat"
      }

 - Questions are superficially categorized primarily to enable more flash card app functionality and some of them may belong to two or more categories.

** The practice of adding data to the document usually goes like this:

1) I write a question down when I see a concept come up *

2) I DuckDuckGo the concept and learn about it 

3) A day or two later I write down the answer from what I retained about it in my memory

As I get more familiar with some concepts, I revise the answers and add more detailed explanations. That's why some answers are "meatier" than the others.

* Most of the time I practice asking questions myself, but I also use this repository for reference (and I thank the contributors): 
https://github.com/h5bp/Front-end-Developer-Interview-Questions





