import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';


const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btnSubmit = document.querySelector('button');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
// const photoCard = document.querySelector('.photo-card');

form.addEventListener('submit', (event) => {
    const inputValue = input.value;

    event.preventDefault();
    const getImages = async () => {
        try {
            const response = await axios.get(`https://pixabay.com/api/?key=35632992-e10a39a36f128534b3670000b&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`);
              if (response.data.hits.length === 0) {
               Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
            console.log(response.data);
            listImages(response.data.hits);
            
         }
        catch (error) {
            console.log(error);
          
        }
    }
    getImages();
    form.reset();
});


btnLoadMore.disabled = true;

    function listImages(image) {
        const markup = image.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card">
     <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360px" />
    <div class="info">
       <p class="info-item">
         <b>Likes: ${likes}</b>
       </p>
       <p class="info-item">
         <b>Views: ${views}</b>
        </p>
       <p class="info-item">
         <b>Comments: ${comments}</b>
       </p>
       <p class="info-item">
         <b>Downloads: ${downloads}</b>
       </p>
     </div>
   </div>`
        }).join('');
        return gallery.insertAdjacentHTML('beforeend', markup);
    }


