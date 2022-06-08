//checks local storage onload 
checkDictionary(); 

//fetches data onclick 
document.querySelector('button').addEventListener('click', getData);

//personal dictionary is made up of the user's past searches
//checks local storage for existing dictionary
//if there is one then append terms from the dictionary to the DOM
function checkDictionary() {
  if (!localStorage.getItem('dictionary')) {
    return
  } else {
    setPersonalDictionary();
    document.querySelectorAll('.myDictionary').forEach(word => word.addEventListener('click', fetchHistory));
  }
}

//make a function that checks for dom dictionary
//make a function that removes the dom dictionary
//make a function that sets the localstorage dict to the dom
function setPersonalDictionary() {
  let myDictionary = document.querySelector('#myDictionary');
  let terms = localStorage.getItem('dictionary').split(' ; '); 
  for (let i = 0; i < terms.length; i++) {
    myDictionary.appendChild(document.createElement('p')).className= `myDictionary myDictionary-${i}`;
    document.querySelector(`.myDictionary-${i}`).innerText = terms[i];
  }
}

//for each word displayed in the dictionary section
//clicking on the word requests data from the api for it
function fetchHistory(event) {
  
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Token 203b856643c07ec9c95183122553a5a6bcfb975b");
  
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let word = event.currentTarget.outerText;

  let url = `https://owlbot.info/api/v4/dictionary/${word}`

  fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    let result = document.getElementById('result');
    while (result.firstChild) {
      result.removeChild(result.firstChild)
    };

    if (data.definitions[0].image_url) {
        appendPicture(data);
    } 
    
    appendTextContent(data);
  }
)}


//main function
//sets up the HTTP Authorization request in header
//sets up request options for fetch request 
function getData() {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Token 203b856643c07ec9c95183122553a5a6bcfb975b");
  
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let word = document.querySelector('input').value;
  let url = `https://owlbot.info/api/v4/dictionary/${word}`
  
  fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    removePriorContent();

    if (data.definitions[0].image_url) {
      appendPicture(data);
    } 
    
    appendTextContent(data);

    setLocalStorage(data);

    removePersonalDictionaryContent();

    checkDictionary();
  })
  .catch(error => console.log('error', error));
}

function removePriorContent() {
 // remove content from prior word search 
  let result = document.getElementById('result');
  while (result.firstChild) {
    result.removeChild(result.firstChild)
  };
}

function appendPicture(data) {
  let result = document.getElementById('result');
  result.appendChild(document.createElement('img'));
  document.querySelector('img').src = data.definitions[0].image_url;
}

function appendTextContent (data) {
  let result = document.getElementById('result');
  for (let i = 0; i < data.definitions.length; i++) {
    result.appendChild(document.createElement('h3')).className=`type type-${i}`;
    document.querySelector(`.type-${i}`).innerText = data.definitions[i].type;

    result.appendChild(document.createElement('p')).className=`def def-${i}`;
    document.querySelector(`.def-${i}`).innerText = data.definitions[i].definition;

    result.appendChild(document.createElement('p')).className=`ex ex-${i}`;
    document.querySelector(`.ex-${i}`).innerText = data.definitions[i].example;
  
  }
}

function setLocalStorage(data) {
  if (!localStorage.getItem('dictionary')) {
    localStorage.setItem('dictionary', data.word);
  } else { 
    let dictionary = localStorage.getItem('dictionary') + ' ; ' + data.word;
    localStorage.setItem('dictionary', dictionary)
  }
}

function removePersonalDictionaryContent() {
  let myDictionary = document.getElementById('myDictionary');
  while (myDictionary.firstChild) {
    myDictionary.removeChild(myDictionary.firstChild)
  };
}