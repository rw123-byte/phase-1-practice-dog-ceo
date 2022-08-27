console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
    upLoadingImage()
    upLoadBreedOptions()
});

function upLoadingImage() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(response => response.json())
        .then(imgResult => imgResult.message.forEach(dog => addingImg(dog)))
}

function addingImg(dogImage) {
    let card = document.querySelector('#dog-image-container')
    let imageCard = document.createElement('img')
    imageCard.src = dogImage
    card.appendChild(imageCard)
}

function upLoadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(response => response.json())
        .then(breedResult => {
            breeds = Object.keys(breedResult.message)
            breedList(breeds)
            breedEventListener()
        })
}

function breedList(breeds) {
    let ul = document.querySelector('#dog-breeds')
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed))
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectingBy(letter) {
    breedList(breeds.filter(breed => breed.startsWith(letter)))
}

function breedEventListener() {
    let selection = document.querySelector('#breed-dropdown')
    selection.addEventListener('change', (event) => { selectingBy(event.target.value) })
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.innerText = breed
    li.style.cursor = 'pointer'
    ul.appendChild(li)
    li.addEventListener('click', updateColor)
}

function updateColor(event) {
    event.target.style.color = 'green';
}