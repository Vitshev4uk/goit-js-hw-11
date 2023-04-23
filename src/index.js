import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';


const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const btnSubmit = document.querySelector('button');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
// const photoCard = document.querySelector('.photo-card');

let page = 1;
const limit = 40;
  

form.addEventListener('submit', (event) => {
    event.preventDefault();
    getImages();
    form.reset();
});


const getImages = async () => {
  try {
    const inputValue = input.value;
    const response = await axios.get(`https://pixabay.com/api/?key=35632992-e10a39a36f128534b3670000b&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`);
    // if (response.data.hits.length = true) {
    //   Notiflix.Notify.success('We have some images!!!');
    // }
       if (response.data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };
    console.log(response.data);

    const totalHits = response.data.totalHits;
    const totalPages = totalHits / limit;
    if (page > totalPages) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
          
    listImages(response.data.hits);
  }
  catch (error) {
    console.log(error);
          
  }
};

// btnLoadMore.disabled = true;

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

btnLoadMore.addEventListener('click', () => {
  page += 1;
  console.log(page);
  getImages();
  



      
 })




