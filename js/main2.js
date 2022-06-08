document.querySelector('button').addEventListener('click', fetchData);

function fetchData(url) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 203b856643c07ec9c95183122553a5a6bcfb975b");
    
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    
    fetch(url,requestOptions) 
    .then (response => response.json())
    .then (data => {
        console.log(data);

        removePriorContent()

        if (data.definitions.length == 1) {
            if (data.definitions[0].image_url) {
                appendPicture(data);
            }
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

//removes content from prior word search
function removePriorContent() {
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
