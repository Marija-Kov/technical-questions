
    
async function getRandomQuestion() {

    const response = await fetch('data.json');

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log(data)
  

}

getRandomQuestion(); // this WORKS in the browser console with the live server - I get the data as I wanted it. 
//HOWEVER, in the VS integrated terminal, it first requires fetch to be installed (npm init -y ; npm install node-fetch ; add "type":"module" to package.json ; import fetch from "node-fetch" in the js file where fetch is being used -- this works perfectly for online API data, but not for local json file)
//after fetch has been installed and implemented, it throws TypeError [ERR_INVALID_URL]: Invalid URL.....  input: 'data.json', code: 'ERR_INVALID_URL'
//Conclusion: I suspect that, to fetch from a local file and get data not using browser + live server, it would be necessary to set up a local server somehow. 
//All of the above commented would be an issue if the app was to be offline. Also, for the purpose of an offline app, the JSON file could be converted to .js
