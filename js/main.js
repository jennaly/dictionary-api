//checks local storage onload 
checkDictionary(); 

//fetches data onclick
document.querySelector('button').addEventListener('click', getData);
document.querySelector('input').addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    document.querySelector('button').click();
  }
});

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
  let word = event.currentTarget.outerText;
  let pastSearch = document.querySelector('input');
  clearSearchBar(pastSearch);

  let url = `https://lexilearn-api.herokuapp.com/api/dictionary/${word}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    let result = document.getElementById('result');
    while (result.firstChild) {
      result.removeChild(result.firstChild)
    };
    appendWordTitle(data);
    addScroll(data)
    changeDataStyle();
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

  let word = document.querySelector('input');
  let url = `https://lexilearn-api.herokuapp.com/api/dictionary/${word.value}`

  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    removePriorContent();
    changeDataStyle();
    if (!data.definitions) {
      console.log('no def');
      return wordNotFound();
    }
    if (data.definitions[0].image_url) {
      appendPicture(data);
    } 
    addScroll(data);
    appendWordTitle(data);
    appendTextContent(data);
    setLocalStorage(data);
    removePersonalDictionaryContent();
    checkDictionary();
    clearSearchBar(word);
  })
  .catch(error => console.log('error', error));
}

function wordNotFound() {
  document.querySelector('h2').innerText = "This is awkward";
  document.querySelector('.wordPic').style.display = "inline-block"; 
  document.querySelector('.wordPic').src = "/img/wordNotFound.jpg";
  let result = document.getElementById('result');
  result.appendChild(document.createElement('h3'));
  document.querySelector('h3').innerText = "We don\'t have the word you\'re searching for. Please revise your search or enter another word, thank you!";
}

function addScroll(data) {
  if (data.definitions.length !== 1) {
    document.getElementById('result').style.overflow = 'scroll';
  }
}


function changeDataStyle() {
  document.getElementById('result').style.height = '200px';
  document.querySelector('.data').style.display = 'block';
  document.querySelector('.wordPic').style.display = "none"; 
}

function removePriorContent() {
 // remove content from prior word search 
  let result = document.getElementById('result');
  while (result.firstChild) {
    result.removeChild(result.firstChild)
  };
}

function appendWordTitle(data) {
  document.querySelector('h2').innerText = data.word;
}

function appendPicture(data) {
  document.querySelector('.wordPic').style.display = "inline-block"; 
  document.querySelector('.wordPic').src = data.definitions[0].image_url;
}

function appendTextContent (data) {
  let result = document.getElementById('result');
  for (let i = 0; i < data.definitions.length; i++) {
    result.appendChild(document.createElement('h3')).className=`type type-${i}`;
    document.querySelector(`.type-${i}`).innerText = data.definitions[i].type.toUpperCase();

    result.appendChild(document.createElement('p')).className=`def def-${i}`;
    document.querySelector(`.def-${i}`).innerText = data.definitions[i].definition;

    if (data.definitions[i].example !== null) {
      result.appendChild(document.createElement('p')).className=`ex ex-${i}`;
      document.querySelector(`.ex-${i}`).innerText = `\"${data.definitions[i].example}\"`;
    }
    
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

function clearSearchBar(elem) {
  elem.value = '';
}
