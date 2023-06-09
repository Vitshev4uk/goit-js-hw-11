import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btnSubmit = document.querySelector('button');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
// const photoCard = document.querySelector('.photo-card');

let page = 1;
const limit = 40;
btnLoadMore.classList.add('hidden');

input.addEventListener('click', () => {
  form.reset();
});
btnSubmit.addEventListener('click', () => {
  gallery.innerHTML = '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  getImages();
});

const getImages = async () => {
  try {
    const inputValue = input.value;
    const response = await axios.get(`https://pixabay.com/api/?key=35632992-e10a39a36f128534b3670000b&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`);

    const totalHits = response.data.totalHits;
    const totalPages = totalHits / limit;

    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      btnLoadMore.classList.add('hidden');
    } else if (response.data.hits.length !== 0) {
      btnLoadMore.classList.remove('hidden');
    }
      else if (page > totalPages) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      btnLoadMore.classList.add('hidden');
    };   
    listImages(response.data.hits);
    lightbox.refresh();
  }
  catch (error) {
    console.log(error);      
  }
};


    function listImages(image) {
        const markup = image.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card">
       <a href="${largeImageURL}">
     <img src="${webformatURL}"  alt="${tags}" loading="lazy" />
       </a>
    <div class="info">
       <p class="info-item">
         <b>Likes:</b>${likes}
       </p>
       <p class="info-item">
         <b>Views: </b>${views}
        </p>
       <p class="info-item">
         <b>Comments: </b>${comments}
       </p>
       <p class="info-item">
         <b>Downloads: </b>${downloads}
       </p>
     </div>
   </div>`
        }).join('');
        return gallery.insertAdjacentHTML('beforeend', markup);
    }

btnLoadMore.addEventListener('click', () => {
  page += 1;
  getImages();
  console.log(page);
});

const lightbox = new SimpleLightbox('a', {
    captionsDelay: 250
});






