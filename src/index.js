import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')

input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(event) {
    event.preventDefault();
    const inputValue = event.target.value.trim();
    if (!inputValue) {
        countryList.innerHTML = '';
    } if (!inputValue) {
        countryInfo.innerHTML = '';
    };

    fetchCountries(inputValue).then(country => {
    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length >= 2 && country.length <= 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        listCountry(country);
    } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        countryCard(country);
    };
}).catch((error) => {
    Notiflix.Notify.failure('Oops, there is no country with that name');
})
};

function listCountry(country) {
    const markupCountryList = country.map(({ name, flags }) => {
        return `<li class="list-country">
    <img class="img-flag" src="${flags.svg}" alt="flag" width="50px">
    <h2 class="country-name">${name.official}</h2>
    </li>`
    }).join('');
    return countryList.insertAdjacentHTML('beforeend', markupCountryList);   
};

function countryCard(country) {
    const markupCardCounyty = country.map(({ name, capital, population, flags, languages }) => {
        const lang = Object.values(languages);
        return `<div class="country-card">
        <div class="county-main-info">
           <img class="img-flag" src="${flags.svg}" alt="flag" width="50px">
           <h2 class="country-name">${name.official}</h2>
        </div>
        <ul class="list-country-info">
           <li class="item-country-info">${capital}</li>
           <li class="item-country-info">${population}</li>
           <li class="item-country-info">${lang}</li>
        </ul>
        </div>`
        
    }).join('');
    return countryInfo.insertAdjacentHTML('beforeend', markupCardCounyty);
};

