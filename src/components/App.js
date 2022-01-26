import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar';
import fetchImagesAPI from '../services/searchApi';
import Button from './Button/Button';
import Loader from './Loader';

function App() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!keyword) {
      return;
    }

    fetchImages(keyword, page);
    setStatus('pending');
  }, [keyword, page]);

  const fetchImages = (keyword, page) => {
    fetchImagesAPI(keyword, page)
      .then(({ hits }) => {
        const result = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });
        if (result.length === 0) {
          setError(`Картинки по запросу ${keyword} не найдены`);
          setStatus('rejected');
        } else {
          setImages((images) => [...images, ...result]);
          setStatus('resolved');
        }
      })
      .catch((error) => setError(error), setStatus('rejected'))
      .finally(() => {
        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  };

  const formSubmitHandler = (keyword) => {
    setKeyword(keyword);
    setPage(1);
    setError(null);
    setImages([]);
  };

  const handlerLoadMoreBtn = () => {
    setPage((page) => page + 1);
    setStatus('pending');
  };

  const handlerOpenModal = (URLImageLarge) => {
    setLargeImageURL(URLImageLarge);
  };

  const handlerCloseModal = () => {
    setLargeImageURL('');
  };
  return (
    <div>
      <Searchbar onSubmit={formSubmitHandler} />
      {images.length > 0 && (
        <div>
          <ImageGallery images={images} onOpenModal={handlerOpenModal} />
          {status === 'resolved' && <Button onClick={handlerLoadMoreBtn} />}
        </div>
      )}
      {status === 'pending' && <Loader />}
      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          alt=""
          onCloseModal={handlerCloseModal}
        />
      )}
      {status === 'rejected' && <p>{error}</p>}
    </div>
  );
}

export default App;
