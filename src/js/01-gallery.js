// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const galleryItemsConteiner = document.querySelector('.gallery');
const itetemsGallaryMarkup = createGalleryItemsMarkup(galleryItems);

galleryItemsConteiner.insertAdjacentHTML('beforeend', itetemsGallaryMarkup);
galleryItemsConteiner.addEventListener('click', onGalleryItemClick);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>`
    )
    .join('');
}

function onGalleryItemClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

gallery.on('show.simplelightbox');
