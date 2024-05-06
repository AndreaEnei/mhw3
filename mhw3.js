function aggiungiBordoBianco(event){ 
    event.target.classList.add('bordo-bianco');
}
function rimuoviBordoBianco(event){
    event.target.classList.remove('bordo-bianco');
}
function aggiungiBordoArancione(){ 
    const searchAll = document.querySelector('#nav-search-all');
    searchAll.classList.add('bordo-arancione');
    const overlay = document.querySelector('#page-overlay');
    overlay.classList.remove('hidden');
}
function rimuoviBordoArancione(){
    const searchAll = document.querySelector('#nav-search-all');
    searchAll.classList.remove('bordo-arancione');
    const overlay = document.querySelector('#page-overlay');
    overlay.classList.add('hidden');
}
function aggiornaVisibilitaElementi(){
    const items = document.querySelectorAll('#nav-bottom .nav-center a');
    let larghezzaTotale = 80;
    const larghezzaView = window.innerWidth;
    let elementiDaNascondere = []; 

    for(const item of items){
        const itemWidth = item.offsetWidth; //include così anche padding e bordi
        larghezzaTotale += itemWidth;

        if(larghezzaTotale > larghezzaView){
            elementiDaNascondere.push(item);  
        }
    }
    for(const item of items){
        if(elementiDaNascondere.includes(item)){
            if(!item.classList.contains('hidden')){
                item.classList.add('hidden');
            }
        }
        else{
            if(item.classList.contains('hidden')){
                item.classList.remove('hidden');
            }
        }
    }
}
function mostraMenuTutte(event){
    event.preventDefault();
    const overlayMenu = document.querySelector('#dropdown-menu');
    overlayMenu.classList.remove('hidden');
}
function nascondiMenuTutte(){
    const overlayMenu = document.querySelector('#dropdown-menu');
    overlayMenu.classList.add('hidden');
}
function cambioDropdownHidden(event){
    event.preventDefault();
    
    const button = event.target.closest('.dropdown-button');
    const hiddenSection = button.previousElementSibling;

    const mostraMeno = button.querySelector('.mostra-meno');
    const mostraTutto = button.querySelector('.mostra-tutto');

    if(hiddenSection.classList.contains('hidden')){
        hiddenSection.classList.remove('hidden');
        mostraMeno.classList.remove('hidden');
        const img = button.querySelector('.dropdown-sprite-2');
        img.classList.add('flip-img');
        mostraTutto.classList.add('hidden');
    }else{
        hiddenSection.classList.add('hidden');
        mostraMeno.classList.add('hidden');
        const img = button.querySelector('.dropdown-sprite-2');
        img.classList.add('flip-img');
        mostraTutto.classList.remove('hidden');
    }
}

function mostraHiddenPrime(){
    const hiddenLayer = document.querySelector('#prime-flyout-container');
    if(hiddenLayer.classList.contains('hidden')){
    hiddenLayer.classList.remove('hidden');
    }
    isMouseOverPrime=true;
}
function esciPrime(){
    isMouseOverPrime=false;

    setTimeout(nascondiHiddenPrime, 10);
}
function entraHiddenPrime(){
    isMouseOverHiddenPrime=true;
}
function nascondiHiddenPrime(){
    const hiddenLayer = document.querySelector('#prime-flyout-container');
    isMouseOverHiddenPrime=false;

    if(!isMouseOverHiddenPrime && !isMouseOverPrime){
        if(!hiddenLayer.classList.contains('hidden')){
            hiddenLayer.classList.add('hidden');
        }
    }
}


let statoSfondo;



function cambioSfondoSnx(){
    const sfondo = document.querySelector('#sfondo');
    if(statoSfondo==1){
        sfondo.src = backgroundImages[2].link;
        statoSfondo=3;
    } else if(statoSfondo==3){
        sfondo.src = backgroundImages[1].link;
        statoSfondo=2;
    } else if(statoSfondo==2){
        sfondo.src = backgroundImages[0].link;
        statoSfondo=1;
    }
}
function cambioSfondoDx(){
    const sfondo = document.querySelector('#sfondo');
    if(statoSfondo==1){
        sfondo.src = backgroundImages[1].link;
        statoSfondo=2;
    } else if(statoSfondo==2){
        sfondo.src = backgroundImages[2].link;
        statoSfondo=3;
    } else if(statoSfondo==3){
        sfondo.src = backgroundImages[0].link;
        statoSfondo=1;
    }
}

/*---------------*/ 


function onTokenResponse(response){
    console.log('Risposta Token');
    return response.json();
}
function getToken(json){
    console.log('Risposta Arrivata');
    console.log(json);
    token = json.access_token;
    console.log(token);
    getFromImgur();
}
function getFromImgur(){
    fetch('https://api.imgur.com/3/account/AndreaEnei/images/0',{
        headers: { 'Authorization': 'Bearer ' + token}
    }).then(onImgurResponse).then(onJsonImg);
}
function onImgurResponse(response){
    console.log(token);
    console.log('Risposta Imgur');
    return response.json();
    
}
let backgroundImages;

function onJsonImg(json){
    console.log('Risposta Json');
    console.log(json);

    const sfondo = document.querySelector('#sfondo');
    sfondo.src = json.data[0].link;

    backgroundImages=json.data;
    statoSfondo=1;
}



function onJson(json){
    const libri = json.docs; 
    displayResults(libri);
}

function displayResults(libri) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; 
    let num_results = libri.length;

    if(num_results > 10)
    num_results = 10;

    if (libri.length === 0) {
        resultsContainer.textContent = 'Nessun libro trovato.';
        return;
    }

    for(let i=0; i<num_results; i++){
        const libro = libri[i];
        const listItem = document.createElement('div');
        listItem.textContent = libro.title + (libro.author_name ? ' by ' + libro.author_name.join(', ') : '');
        resultsContainer.appendChild(listItem);
    }

}


function onResponse(response){
    return response.json();
}

function search(event){
    const hiddenLayer = document.getElementById('search-results');
    hiddenLayer.classList.remove('hidden');
    const ricerca_input = document.getElementById('nav-search-box').value;
    const ricerca_value = encodeURIComponent(ricerca_input);

    const url = 'https://openlibrary.org/search.json?q=' + ricerca_value;

    fetch(url).then(onResponse).then(onJson).catch(error => {
        console.error('Error fetching the data:', error);
        alert('Errore nella ricerca dei libri.');
    });
}

function nascondiSearch(){
    const hiddenLayer = document.getElementById('search-results');
    if(!hiddenLayer.classList.contains('hidden')){
        hiddenLayer.classList.add('hidden');
    }
}






aggiornaVisibilitaElementi();

const sfondoSnx = document.querySelector('#banner-freccia-snx');
sfondoSnx.addEventListener('click', cambioSfondoSnx);
const sfondoDx = document.querySelector('#banner-freccia-dx');
sfondoDx.addEventListener('click', cambioSfondoDx);
window.addEventListener('resize', aggiornaVisibilitaElementi);

const boxes = document.querySelectorAll('.nav-center a, .nav-left a, .nav-right a');
for(const box of boxes){
    box.addEventListener('mouseenter',aggiungiBordoBianco);
    box.addEventListener('mouseleave',rimuoviBordoBianco);
}

const searchBox = document.querySelector('#nav-search-box');
searchBox.addEventListener('focus', aggiungiBordoArancione);
searchBox.addEventListener('blur', rimuoviBordoArancione);

const tutte = document.querySelector('#nav-tutte');
tutte.addEventListener('click', mostraMenuTutte);
const esciTutte = document.querySelector('#page-overlay-menu');
esciTutte.addEventListener('click', nascondiMenuTutte);

const dropdownButtons = document.querySelectorAll('.dropdown-button');
for(const button of dropdownButtons){
    button.addEventListener('click', cambioDropdownHidden);
}

let isMouseOverPrime = false;
let isMouseOverHiddenPrime = false;
const prime = document.querySelector('#prime-hidden-layer');
prime.addEventListener('mouseenter', mostraHiddenPrime);
prime.addEventListener('mouseleave', esciPrime);

/*-------------------*/


const client_id = 'b3c7d8d60a38af7';
const client_secret = 'e12cfcef4ada61df4a2b8cd79a131c18b4e383fa';

const access_token = '39c6c19a1418213c370c3c3a3852fc894b1a364d';
const refresh_token = '2a33f6bfba5e7974a563f1bb9b0e87341075fc9c';

const form1 = new FormData;
form1.append('refresh_token', refresh_token);
form1.append('client_id', client_id);
form1.append('client_secret', client_secret);
form1.append('grant_type', 'refresh_token');

let token;

fetch('https://api.imgur.com/oauth2/token', {
    method: 'POST',
    body: form1
}).then(onTokenResponse).then(getToken);


const searchButton = document.getElementById('nav-search-button');
searchButton.addEventListener('click', search);

const page = document.getElementById('page-content');
page.addEventListener('click', nascondiSearch); 