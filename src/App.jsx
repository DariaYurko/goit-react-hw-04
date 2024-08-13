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
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);
  const [imageProps, setImageProps] = useState({
    url: '',
    alt: '',
  });
  const [loading, setLoading] = useState(false);
  // const [pictures, setPictures] = useState([]);
  const [pictures, setPictures] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPutSearh, setIsPutSearh] = useState(false);
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
  // ---------- /functions for work with modal --------/
  //
  // -------------------------------------------------/
  function onSearch() {
    setIsPutSearh(true);
    setIsPutLoadMore(false);

    console.log(pictures);
  }

  function onLoadMore() {
    setIsPutLoadMore(true);
    setIsPutSearh(false);
  }
  // --------------------------------------------------/
  //
  //
  useEffect(() => {
    if (query === null) return;

    async function fetchPictures(queryValue) {
      setLoading(true);

      try {
        const response = await getPictures(queryValue, currentPage);

        if (isPutSearh) {
          setPictures(response.data.results);
          console.log(pictures);
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
        pictures={pictures}
      />

      {/* <section className="gallery">
        {pictures.length !== 0 && (
          <ImageGallery
            pictures={pictures}
            onOpenModal={onOpenModal}
            setImageProps={setImageProps}
          />
        )}
      </section> */}
      <section className="gallery">
        {pictures !== null && (
          <ImageGallery
            pictures={pictures}
            onOpenModal={onOpenModal}
            setImageProps={setImageProps}
          />
        )}
      </section>

      {isLoadMoreBtnShown && (
        <LoadMoreBtn
          onLoadMore={onLoadMore}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {loading && <Loader />}

      {error !== null && <ErrorMessage error={error} />}

      <Toaster position="top-right" reverseOrder={false} />

      <section className="section-modal">
        {isModalOpen && (
          <ImageModal onCloseModal={onCloseModal} imageProps={imageProps} />
        )}
      </section>
    </>
  );
}

export default App;
