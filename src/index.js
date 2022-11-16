import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;



const refs = {
    input: document.querySelector('#search-box'),
    listCounry: document.querySelector('.country-list'),
    infoCounty: document.querySelector('.country-info')
}



// const createMurkUp = infoCountryCard.map(({name:{official: nameOfficial}, capital, population, flags:{svg: flagsIcon}, languages}) => {
//     return `<svg width="30" height="20">
//     <use href="${flagsIcon}"></use>
//   </svg>
//   <title class="country-name">${nameOfficial}</title>
//   <ul class="info-list">
//     <li><p class="info-subtitle">Capital:</p><p class="info-desc">${capital}</p></li>
//     <li><p class="info-subtitle">Population:</p><p class="info-desc">${population}</p></li>
//     <li><p class="info-subtitle">Languages:</p><p class="info-desc">${languages}</p></li>
//   </ul>`
// }).join('');


// refs.infoCounty.insertAdjacentHTML = createMurkUp;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput() {

    if(refs.input.value) {
    fetchCountries(refs.input.value).then(countys => {
        if(countys.length > 10) {
            setTimeout(() => {
            Notify.info('Too many matches found. Please enter a more specific name.')
        }, 100)
            refs.infoCounty.innerHTML = "";
            refs.listCounry.innerHTML = "";
        }
        if(countys.length >= 2 && countys.length <= 10) {
            const createMurkUpList = countys.map(({name:{common: nameCommon}, flags:{svg: flagsIcon}}) => {
                return `<li><img src="${flagsIcon}" width="16" height="auto" alt="flagIcon"><p>${nameCommon}</p></li>`
            }).join('')
            refs.infoCounty.innerHTML = ""
            return refs.listCounry.innerHTML = createMurkUpList;
        }

        console.log(countys)
        if(countys.length === 1) {
        const createMurkUpInfo = countys.map(({name:{official: nameOfficial}, capital, population, flags:{svg: flagsIcon}, languages}) => {
            return `<div class="wrap-title">
            <img src="${flagsIcon}" width="30" height="auto">
            <h1>${nameOfficial}</h1>
            </div>
          <ul class="info-list">
            <li><b>Capital:</b> ${capital}</li>
            <li><b>Population:</b> ${population}</li>
            <li><b>Languages:</b> ${toString(languages.name)}</li>
          </ul>`
        }).join('');
        // console.log(createMurkUpInfo)
        refs.listCounry.innerHTML = "";
        return refs.infoCounty.innerHTML = createMurkUpInfo;
    } })


    } else {
        refs.infoCounty.innerHTML = "";
        refs.listCounry.innerHTML = "";
    }

}
 



    function fetchCountries(name) {
      return  fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
           if (!response.ok) {
               setTimeout(() => {
               Notify.failure('Oops, there is no country with that name')
               throw new Error(response.status)}, 100) 
           }
           return response.json()})
}
        
    //     const createMurkUp = county.map(({name:{official: nameOfficial}, capital, population, flags:{svg: flagsIcon}, languages}) => {
    //         return `<svg width="30" height="20">
    //         <use href="${flagsIcon}"></use>
    //       </svg>
    //       <title class="country-name">${nameOfficial}</title>
    //       <ul class="info-list">
    //         <li><p class="info-subtitle">Capital:</p><p class="info-desc">${capital}</p></li>
    //         <li><p class="info-subtitle">Population:</p><p class="info-desc">${population}</p></li>
    //         <li><p class="info-subtitle">Languages:</p><p class="info-desc">${languages}</p></li>
    //       </ul>`
    //     }).join('');
        
        
    //    return refs.infoCounty.insertAdjacentHTML = createMurkUp;

        // .catch(error => {
        //     console.log(error)
        //     if() {
        //     Notify.failure('Oops, there is no country with that name')}});


// fetchCountries('peru')


    // .then(filter => {console.log(filter)
    //     // fetch(`https://restcountries.com/v2/all?fields=name,capital,currencies`).then(responeF => {
    //     //     return responeF.json()
    //     // }).then(countryFilter => {console.log(countryFilter)})
    // })

