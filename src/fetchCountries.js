
export function fetchCountries(name, fetchCountriesError) {
    return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`).then(response => {
         if (!response.ok) {
            fetchCountriesError()
         }
         return response.json()})
}

