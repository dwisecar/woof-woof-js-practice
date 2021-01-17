function fetchDogs(filter=false){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => {
        clearSpan();
        json.forEach(dog => {
            if (filter == true){
                if(dog.isGoodDog){
                    renderDog(dog)
                }
            } else {
                renderDog(dog) 
            }
        })
    })
}

function renderDog(dog){
    const dogBar = document.getElementById('dog-bar')
    dogSpan = document.createElement('span');
    dogSpan.textContent=dog.name;
    dogSpan.setAttribute('id', dog.id);
    dogSpan.addEventListener('click', fetchPupInfo)
    dogBar.appendChild(dogSpan);
}

function fetchPupInfo(e){
    clearDogInfo();
    const dogInfoDiv = document.getElementById('dog-info');
    fetch(`http://localhost:3000/pups/${e.target.id}`)
    .then(res => res.json())
    .then(dog => {
        let dogImg = document.createElement('img');
        let dogName = document.createElement('h2');
        let dogBtn = document.createElement('button');
        dogImg.src = dog.image;
        dogName.textContent = dog.name;
        dogBtn.innerText = 'Good Dog!';
        dogBtn.setAttribute('id', `btn-id-${e.target.id}`)
        dogBtn.addEventListener('click', toggleGood)
        dogInfoDiv.append(dogImg, dogName, dogBtn);
    })
}

function toggleGood(e){
    let newValue = true;
    if(e.target.innerText == "Good Dog!") { 
        newValue = false; 
        e.target.innerText = "Bad Dog!"
    } else {
        e.target.innerText = "Good Dog!"
    }
    let btnId = parseInt(e.target.id.split("btn-id-")[1]);
    fetch(`http://localhost:3000/pups/${btnId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'isGoodDog': newValue
        })
    })
}

function addFilterListener() {
    const filterBtn = document.getElementById('good-dog-filter');
    filterBtn.addEventListener('click', handleFilterClick);
}

function handleFilterClick(e){
    if(e.target.innerText == "Filter good dogs: OFF"){
        e.target.innerText = "Filter good dogs: ON";
        fetchDogs(true);
    } else {
        e.target.innerText = "Filter good dogs: OFF";
        fetchDogs(false);
    }
}

function clearSpan() {
    const dogBar = document.getElementById('dog-bar');
    while (dogBar.firstElementChild) {
        dogBar.firstElementChild.remove();
    }
}

function clearDogInfo(){
    const dogInfoDiv = document.getElementById('dog-info');
    while (dogInfoDiv.firstElementChild) {
        dogInfoDiv.firstElementChild.remove();
    }
}

fetchDogs();
addFilterListener();