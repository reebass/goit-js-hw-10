
export function fetchCountries(name) {
    return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`).then(response => {
         if (response.status === 404) {
               throw new Error(response.status);
         }
         return response.json()})
}

