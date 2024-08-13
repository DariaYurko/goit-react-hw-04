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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isPutSearh, setIsPutSearh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPutLoadMore, setIsPutLoadMore] = useState(false);
  const [isLoadMoreBtnShown, setIsLoadMoreBtnShown] = useState(false);
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
  function onSearch() {
    setIsPutSearh(true);
    setIsPutLoadMore(false);
  }

  function onLoadMore() {
    setIsPutLoadMore(true);
    setIsPutSearh(false);
  }
  // --------------------------------------------------/
  //
  //
  // --------------------------------------------------/
  useEffect(() => {
    if (query === null) return;

    async function fetchPictures(queryValue) {
      setLoading(true);

      try {
        const response = await getPictures(queryValue, currentPage);

        if (isPutSearh) {
          setPictures(response.data.results);
        }

        if (isPutLoadMore) {
          setPictures(prevPictures => {
            return [...prevPictures, ...response.data.results];
          });
        }

        setTotalPages(response.data.total_pages);
        setError(null);

      } catch (err) {
        setError(err.message);
        setPictures(null);

      } finally {
        setLoading(false);
      }
    }

    fetchPictures(query);
  }, [query, currentPage]);
  // --------------------------------------------------/
  //
  //
  // --------------------------------------------------/
  useEffect(() => {
    if (pictures === null) return;

    if (pictures.length > 0) {
      setIsLoadMoreBtnShown(true);

      if (currentPage === totalPages) {
        setIsLoadMoreBtnShown(false);
        sendNotifyEndOfData();
      }
    } else {
      sendNotifyNotFound();
      setIsLoadMoreBtnShown(false);
    }
  }, [pictures]);
  // ----------------------------------------------------/
  //
  //
  // ----------------------------------------------------/
  return (
    <>
      <SearchBar
        setCurrentPage={setCurrentPage}
        setQuery={setQuery}
        onSearch={onSearch}
      />

      {pictures !== null && (
        <ImageGallery
          pictures={pictures}
          onOpenModal={onOpenModal}
          setImageProps={setImageProps}
        />
      )}

      {error !== null && <ErrorMessage error={error} />}

      {isLoadMoreBtnShown && (
        <LoadMoreBtn
          onLoadMore={onLoadMore}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {loading && <Loader />}

      <Toaster position="top-right" reverseOrder={false} />

      {isModalOpen && (
        <ImageModal onCloseModal={onCloseModal} imageProps={imageProps} />
      )}
    </>
  );
}

export default App;
