// --- Library
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

//
// --- Variables
import { getPictures } from './api';
import { sendNotifyEndOfData, sendNotifyNotFound } from './toster';
//
// --- Components
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
//
// --- Style
import './App.css';
//
//
//  --------------------------------------------------------------------
function App() {
  const [imageProps, setImageProps] = useState({
    url: '',
    alt: '',
  });
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // --------------------------------------------------/
  //
  //
  // ----------- functions for work with modal --------/
  function onOpenModal() {
    setIsModalOpen(true);
  }

  function onCloseModal() {
    setIsModalOpen(false);
  }
  // -------------------------------------------------/
  //
  //
  // ------- functions for work with buttons ---------/
  function onSearch(queryValue) {
    setQuery(queryValue);
    setCurrentPage(1);
    setPictures(null);
  }

  function onLoadMore() {
    setCurrentPage(currentPage + 1);
  }
  // --------------------------------------------------/
  //
  //
  // --------------------------------------------------/
  useEffect(() => {
    if (query === null) return;

    async function fetchPictures() {
      setLoading(true);

      try {
        const response = await getPictures(query, currentPage);

        if (pictures === null) {
          setPictures(response.data.results);
        } else {
          setPictures(prevPictures => {
            return [...prevPictures, ...response.data.results];
          });
        }
  
        setTotalPages(response.data.total_pages);
        setError(null);

        if (response.data.results.length === 0) {
          sendNotifyNotFound();
        }

        if (currentPage === response.data.total_pages) {
          sendNotifyEndOfData();
        }

      } catch (err) {
        setError(err.message);
        setPictures(null);

      } finally {
        setLoading(false);
      }
    }

    fetchPictures();
  }, [query, currentPage]);
  // --------------------------------------------------/
  //
  //
  //
  // --------------------------------------------------/
  return (
    <>
      <SearchBar onSearch={onSearch} />

      {pictures !== null && (
        <ImageGallery
          pictures={pictures}
          onOpenModal={onOpenModal}
          setImageProps={setImageProps}
        />
      )}

      {totalPages > currentPage && <LoadMoreBtn onLoadMore={onLoadMore} />}

      {loading === true && <Loader />}

      {error !== null && <ErrorMessage error={error} />}

      {isModalOpen === true && (
        <ImageModal onCloseModal={onCloseModal} imageProps={imageProps} />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
