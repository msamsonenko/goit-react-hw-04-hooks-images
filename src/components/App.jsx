import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import { fetchImages } from 'services/images-api';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (userInput === '') {
      return;
    }
    setShowLoader(true);
    fetchImages(userInput, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return Promise.reject(
            new Error(
              `There are no pictures with name <<${userInput.toUpperCase()}>>`
            )
          );
        }
        setPictures(state => [...state, ...hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
        setUserInput('');
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, [userInput, page]);

  const loadBtnHandler = () => {
    setPage(state => state + 1);
  };

  const handleSubmitForm = pic => {
    setUserInput(pic);
    setPage(1);
    setPictures([]);
  };

  const onImageClick = e => {
    const largeImg = pictures.find(picture => {
      return picture.id === parseInt(e.currentTarget.id);
    });
    setModalContent(largeImg);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };
  return (
    <div className="App">
      <SearchBar onSubmit={handleSubmitForm} />
      {status === 'rejected' && <div>{error}</div>}
      {status === 'resolved' && (
        <div>
          <ImageGallery pictures={pictures} onImageClick={onImageClick} />
          {showLoader && <Loader />}
          <Button btnText="Load more" onSubmit={loadBtnHandler} />
          {showModal && (
            <Modal
              onClose={toggleModal}
              child={
                <img
                  src={modalContent.largeImageURL}
                  alt={modalContent.tags}
                  style={{ width: '80vw', height: 'auto' }}
                />
              }
            ></Modal>
          )}
        </div>
      )}
    </div>
  );
}
