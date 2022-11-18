import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;



const refs = {
    input: document.querySelector('#search-box'),
    listCountri: document.querySelector('.country-list'),
    infoCountri: document.querySelector('.country-info')
}


refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))



function onInput() {
    const inputValue = refs.input.value.trim();
    if(!inputValue) {
        refs.infoCountri.innerHTML = "";
        refs.listCountri.innerHTML = "";
        return
    }
    fetchCountries(inputValue).then(totalValueInputMax).catch(fetchCountriesError);
}

refs.listCountri.addEventListener('click', onSearch);

function onSearch(evt) {
    refs.input.value = evt.target.textContent
    onInput()
    console.log(refs.input.value)
}



function totalValueInputMax(countries) {
    if(countries.length > 10) {
        setTimeout(() => {
        Notify.info('Too many matches found. Please enter a more specific name.')
    }, 500)
        refs.listCountri.innerHTML = "";
    }
    if(countries.length >= 2 && countries.length <= 10) {
        refs.infoCountri.innerHTML = "";
        createMurkUpList(countries);     
    }

    if(countries.length === 1) { 
    refs.listCountri.innerHTML = "";
    createMurkUpInfo(countries);  
}}

 


function fetchCountriesError() {
        Notify.failure('Oops, there is no country with that name')
        refs.infoCountri.innerHTML = "";
        refs.listCountri.innerHTML = "";
}



function createMurkUpList(countries) {
    const createMurkUpList = countries.map(({name:{common: nameCommon}, flags:{svg: flagsIcon}}) => {
        return `<li><button><img src="${flagsIcon}" width="16" height="auto" alt="flagIcon"><p>${nameCommon}</p></button></li>`
    }).join('');
    return refs.listCountri.innerHTML = createMurkUpList;

}

function createMurkUpInfo (countries) {
    const createMurkUpInfo = countries.map(({name:{official: nameOfficial}, capital, population, flags:{svg: flagsIcon}, languages}) => {
        return `<div class="wrap-title">
        <img src="${flagsIcon}" width="30" height="auto">
        <h1>${nameOfficial}</h1>
        </div>
      <ul class="info-list">
        <li><b>Capital:</b> ${capital}</li>
        <li><b>Population:</b> ${population}</li>
        <li><b>Languages:</b> ${Object.values(languages).join(", ")}</li>
      </ul>`
    }).join('');

    return refs.infoCountri.innerHTML = createMurkUpInfo;
}




        

